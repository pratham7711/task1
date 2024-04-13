import { Session } from './Session';

export class SessionManager {
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

