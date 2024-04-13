"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Device = void 0;
var Device = /** @class */ (function () {
    function Device(deviceId, deviceName) {
        this._deviceId = deviceId;
        this._deviceName = deviceName;
    }
    Object.defineProperty(Device.prototype, "deviceId", {
        get: function () {
            return this._deviceId;
        },
        set: function (value) {
            this._deviceId = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Device.prototype, "deviceName", {
        get: function () {
            return this._deviceName;
        },
        set: function (value) {
            this._deviceName = value;
        },
        enumerable: false,
        configurable: true
    });
    return Device;
}());
exports.Device = Device;
