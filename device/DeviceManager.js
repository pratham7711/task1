"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeviceManager = void 0;
var SessionManager_1 = require("../session/SessionManager");
var Device_1 = require("./Device");
var DeviceManager = /** @class */ (function () {
    function DeviceManager() {
        this.sessionManagerInstance = SessionManager_1.SessionManager.getInstance();
        this.devices = new Map();
        this.deviceSessionList = new Map;
    }
    DeviceManager.getInstance = function () {
        if (!DeviceManager.instance) {
            DeviceManager.instance = new DeviceManager();
        }
        return DeviceManager.instance;
    };
    DeviceManager.prototype.createDevice = function (deviceid, deviceName) {
        var D = new Device_1.Device(deviceid, deviceName);
        this.devices.set(deviceid, D);
        return D;
    };
    DeviceManager.prototype.removeDevice = function (deviceId) {
    };
    DeviceManager.prototype.getlastseen = function (deviceid) {
        var _a, _b;
        var sessionid = ((_b = (_a = this.deviceSessionList) === null || _a === void 0 ? void 0 : _a.get(deviceid)) === null || _b === void 0 ? void 0 : _b.pop()) || "";
        var session = this.sessionManagerInstance.getSession(sessionid);
        return session.endTime === "" ? "online" : session.endTime;
    };
    DeviceManager.prototype.addSession = function (deviceid, sessionid) {
        var _a;
        (_a = this.deviceSessionList.get(deviceid)) === null || _a === void 0 ? void 0 : _a.push(sessionid);
    };
    DeviceManager.prototype.getdevicesessinList = function (deviceid) {
        return this.deviceSessionList.get(deviceid) || new Array;
    };
    DeviceManager.instance = null;
    return DeviceManager;
}());
exports.DeviceManager = DeviceManager;
