import { SessionManager } from "../session/SessionManager";
import { Device } from "./Device";

export class DeviceManager {
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
