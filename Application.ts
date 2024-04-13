import { DeviceManager } from './device/DeviceManager';
import { SessionManager } from './session/SessionManager';

export class Application {
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
            console.log("user already logged in ");
            const sessionList = this.deviceManagerInstance.getdevicesessinList(deviceId);
            const lastsessionid = sessionList.pop() ||"";
            console.log(`Session started at ${this.sessionManagerInstance.getSession(lastsessionid).startTime}`);
            this.sessionManagerInstance.updateSession(lastsessionid);
            this.userDeviceSession?.get(userid)?.delete(deviceId);
            if(this.userDeviceSession?.get(userid)?.size === 0)
            {
                this.currectLoggedIn.delete(userid);
            }
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
