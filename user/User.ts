import { Device } from "../device/Device";

export class User {
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

