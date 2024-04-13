export class Device{
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