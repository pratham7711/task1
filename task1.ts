class Application {
    private static instance : Application; 
    private deviceManagerInstance: DeviceManager;
    private sessionManagerInstance: SessionManager;
    private userDeviceSession: Map<string, Map<string, string>>;
    private currectLoggedIn : Set<string>;
    private monthlyloggedIncount : number;

    private constructor() {
        this.sessionManagerInstance = SessionManager.getInstance();
        this.deviceManagerInstance = DeviceManager.getInstance();
        this.userDeviceSession = new Map<string, Map<string, string>>();
        this.monthlyloggedIncount = 0;
        this.currectLoggedIn = new Set<string>();
    }

    
    static getInstance(): Application {
        if (!Application.instance) {
            Application.instance = new Application();
        }
        return Application.instance;
    }

    public login(userid: string, deviceId: string): void {
        if(this.userDeviceSession?.get(userid)?.has(deviceId))
        {
            console.log("user already logged in ");
            const sessionList = this.deviceManagerInstance.getdevicesessinList(deviceId);
            const lastsessionid = sessionList.pop() ||"";
            console.log(`Session started at ${this.sessionManagerInstance.getSession(lastsessionid).startTime}`);
            
        }

        else{
            
            const session = this.sessionManagerInstance.createSession("301");

            if (!this.userDeviceSession.has(userid)) {
    
                this.userDeviceSession.set(userid, new Map<string, string>());
            }
            
            const deviceSessionMap = this.userDeviceSession.get(userid);
            if (deviceSessionMap) {
                deviceSessionMap.set(deviceId, session.sessionId);
            }
    
            if(!this.currectLoggedIn.has(userid))
            {
                this.currectLoggedIn.add(userid);
            }
            
            this.monthlyloggedIncount++;
            console.log("successfully logged in");
            
        }
    }


    public logout(userid:string , deviceId : string){
        if(this.userDeviceSession?.get(userid)?.has(deviceId))
        {
            const sessionList = this.deviceManagerInstance.getdevicesessinList(deviceId);
            const lastsessionid = sessionList.pop() ||"";
            this.sessionManagerInstance.updateSession(lastsessionid);
            this.userDeviceSession?.get(userid)?.delete(deviceId);
            if(this.userDeviceSession?.get(userid)?.size === 0)
            {
                this.currectLoggedIn.delete(userid);
            }

            console.log("logged out successfully");
        }
        else{
            console.log("user is not logged in with this device");
        }
    }

    public getcurrectLoggedinCount():number{
        return this.currectLoggedIn.size;
    }

    public getmonthlyLoggedinCount():number{
        return this.monthlyloggedIncount;
    }
}
class UserManager {

    private static instance: UserManager | null = null;
    private userMap = new Map<string, User>(); 
    
    private constructor() {
        
    }

    public createUser(userId: string, name: string, email: string):User{
        const u = new User(userId , name , email);
        this.userMap.set(userId , u);
        return u;
    }

    public deleteUser(userId: string)
    {   
        this.userMap.delete(userId);
    }

    static getInstance(): UserManager {
        // Check if an instance of the class already exists
        if (!UserManager.instance) {
            // If not, create a new instance
            UserManager.instance = new UserManager();
        }
        // Return the existing instance or the newly created instance
        return UserManager.instance;
    }

    // Add other methods and properties of the class here
    // For example:
}
class User {
    private _userId: string;
    private _name: string;
    private _email: string;
    private _devices: Array<Device>;
    public addDevice(device:Device){
        this._devices.push(device);
    }
    public removeDevices(deviceid:string){
        this._devices = this._devices.filter(x=>x.deviceId !== deviceid);
    }


    public get userId(): string {
        return this._userId;
    }
    public set userId(value: string) {
        this._userId = value;
    }
    public get name(): string {
        return this._name;
    }
    public set name(value: string) {
        this._name = value;
    }
    public get email(): string {
        return this._email;
    }
    public set email(value: string) {
        this._email = value;
    }

    constructor(userId: string, name: string, email: string) {
        this._userId = userId;
        this._name = name;
        this._email = email;
        this._devices = new Array<Device>();
    }

}

class SessionManager {
    private static instance: SessionManager | null = null;
    private sessionList: Map<string , Session>;

    public getSession(sessionid: string):Session
    {
        return this.sessionList.get(sessionid) || this.createSession(sessionid);
    }

    public createSession(sessionid : string):Session{
        const session = new Session(sessionid);
        this.sessionList.set(sessionid,session);
        return session;
    }

    public updateSession(sessionId : string){
        const session = this.sessionList.get(sessionId);
        session?.endSession();
    }

    private constructor() {
     this.sessionList = new Map<string,Session>();
    }

    static getInstance(): SessionManager {
        if (!SessionManager.instance) {
            SessionManager.instance = new SessionManager();
        }
        return SessionManager.instance;
    }

}

 class Session{
    private _startTime: string;
    private _sessionId: string;
    private _endTime: string;

    public get sessionId(): string {
        return this._sessionId;
    }
    public set sessionId(value: string) {
        this._sessionId = value;
    }
    public set startTime(value: string) {
        this._startTime = value;
    }
    
    public get startTime(): string {
        return this._startTime;
    }
    public get endTime(): string {
        return this._endTime;
    }


    public endSession(){
        this._endTime = new Date().toISOString();
    }
    public set endTime(value: string) {
        this._endTime = value;
    }
    constructor(sessionId : string){
        this._startTime = new Date().toISOString();
        this._endTime = "";
        this._sessionId = sessionId;
    }

}
class DeviceManager {
    private static instance: DeviceManager | null = null;
    private sessionManagerInstance: SessionManager;
    private devices: Map<string,Device>; 
    private deviceSessionList: Map<string,Array<string>>;

    
    private constructor() {
        this.sessionManagerInstance = SessionManager.getInstance();
        this.devices = new Map<string,Device>();
        this.deviceSessionList = new Map<string,Array<string>>;
    }

    
    static getInstance(): DeviceManager {
        if (!DeviceManager.instance) {
            DeviceManager.instance = new DeviceManager();
        }
        return DeviceManager.instance;
    }

    
    public createDevice(deviceid:string , deviceName:string): Device{
        const D = new Device(deviceid , deviceName);
        this.devices.set(deviceid , D);
        return D;
    }

    
    public removeDevice(deviceId: string): void {
    }

    
    public getlastseen(deviceid:string):string{
        const sessionid = this.deviceSessionList?.get(deviceid)?.pop() || "";
        const session = this.sessionManagerInstance.getSession(sessionid);
        return session.endTime === "" ? "online" : session.endTime;

    }
    public addSession(deviceid : string , sessionid : string){
        this.deviceSessionList.get(deviceid)?.push(sessionid);
    }

    public getdevicesessinList(deviceid:string):Array<string>
    {
        return this.deviceSessionList.get(deviceid) || new Array<string>;
    }
}
 class Device{
    private _deviceId: string;
    private _deviceName: string;
    


    public get deviceId(): string {
        return this._deviceId;
    }
    public set deviceId(value: string) {
        this._deviceId = value;
    }
    public get deviceName(): string {
        return this._deviceName;
    }
    public set deviceName(value: string) {
        this._deviceName = value;
    }

    constructor(deviceId:string , deviceName : string){
        this._deviceId = deviceId;
        this._deviceName = deviceName;
        
    }
}




function main(){
    const userManagerInstance = UserManager.getInstance();
    const deviceManagerInstance = DeviceManager.getInstance();
    const applicationInstance = Application.getInstance();
    
    const user = userManagerInstance.createUser("101" , "pratham" , "pratham@gmail.com");
    const d1 = deviceManagerInstance.createDevice("201" , "samsung");
    const d2 = deviceManagerInstance.createDevice("202" , "apple");
    applicationInstance.login(user.userId,d1.deviceId);
    applicationInstance.login(user.userId,d2.deviceId);
    applicationInstance.login(user.userId,d1.deviceId);
    applicationInstance.logout(user.userId , d2.deviceId);
    applicationInstance.logout(user.userId , d1.deviceId);
    console.log(applicationInstance.getmonthlyLoggedinCount());
    console.log(applicationInstance.getcurrectLoggedinCount());
}

main();
