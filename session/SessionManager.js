"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SessionManager = void 0;
var Session_1 = require("./Session");
var SessionManager = /** @class */ (function () {
    function SessionManager() {
        this.sessionList = new Map();
    }
    SessionManager.prototype.getSession = function (sessionid) {
        return this.sessionList.get(sessionid) || this.createSession(sessionid);
    };
    SessionManager.prototype.createSession = function (sessionid) {
        var session = new Session_1.Session(sessionid);
        this.sessionList.set(sessionid, session);
        return session;
    };
    SessionManager.prototype.updateSession = function (sessionId) {
        var session = this.sessionList.get(sessionId);
        session === null || session === void 0 ? void 0 : session.endSession();
    };
    SessionManager.getInstance = function () {
        if (!SessionManager.instance) {
            SessionManager.instance = new SessionManager();
        }
        return SessionManager.instance;
    };
    SessionManager.instance = null;
    return SessionManager;
}());
exports.SessionManager = SessionManager;
