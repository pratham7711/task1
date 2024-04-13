"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Application = void 0;
var DeviceManager_1 = require("./device/DeviceManager");
var SessionManager_1 = require("./session/SessionManager");
var Application = /** @class */ (function () {
    function Application() {
        this.sessionManagerInstance = SessionManager_1.SessionManager.getInstance();
        this.deviceManagerInstance = DeviceManager_1.DeviceManager.getInstance();
        this.userDeviceSession = new Map();
        this.monthlyloggedIncount = 0;
        this.currectLoggedIn = new Set();
    }
    Application.getInstance = function () {
        if (!Application.instance) {
            Application.instance = new Application();
        }
        return Application.instance;
    };
    Application.prototype.login = function (userid, deviceId) {
        var _a, _b;
        if ((_b = (_a = this.userDeviceSession) === null || _a === void 0 ? void 0 : _a.get(userid)) === null || _b === void 0 ? void 0 : _b.has(deviceId)) {
            console.log("user already logged in ");
            var sessionList = this.deviceManagerInstance.getdevicesessinList(deviceId);
            var lastsessionid = sessionList.pop() || "";
            console.log("Session started at ".concat(this.sessionManagerInstance.getSession(lastsessionid).startTime));
        }
        else {
            var session = this.sessionManagerInstance.createSession("301");
            if (!this.userDeviceSession.has(userid)) {
                this.userDeviceSession.set(userid, new Map());
            }
            var deviceSessionMap = this.userDeviceSession.get(userid);
            if (deviceSessionMap) {
                deviceSessionMap.set(deviceId, session.sessionId);
            }
            if (!this.currectLoggedIn.has(userid)) {
                this.currectLoggedIn.add(userid);
            }
            this.monthlyloggedIncount++;
            console.log("successfully logged in");
        }
    };
    Application.prototype.logout = function (userid, deviceId) {
        var _a, _b, _c, _d, _e, _f;
        if ((_b = (_a = this.userDeviceSession) === null || _a === void 0 ? void 0 : _a.get(userid)) === null || _b === void 0 ? void 0 : _b.has(deviceId)) {
            console.log("user already logged in ");
            var sessionList = this.deviceManagerInstance.getdevicesessinList(deviceId);
            var lastsessionid = sessionList.pop() || "";
            console.log("Session started at ".concat(this.sessionManagerInstance.getSession(lastsessionid).startTime));
            this.sessionManagerInstance.updateSession(lastsessionid);
            (_d = (_c = this.userDeviceSession) === null || _c === void 0 ? void 0 : _c.get(userid)) === null || _d === void 0 ? void 0 : _d.delete(deviceId);
            if (((_f = (_e = this.userDeviceSession) === null || _e === void 0 ? void 0 : _e.get(userid)) === null || _f === void 0 ? void 0 : _f.size) === 0) {
                this.currectLoggedIn.delete(userid);
            }
        }
        else {
            console.log("user is not logged in with this device");
        }
    };
    Application.prototype.getcurrectLoggedinCount = function () {
        return this.currectLoggedIn.size;
    };
    Application.prototype.getmonthlyLoggedinCount = function () {
        return this.monthlyloggedIncount;
    };
    return Application;
}());
exports.Application = Application;
