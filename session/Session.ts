export class Session{
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