"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
var User = /** @class */ (function () {
    function User(userId, name, email) {
        this._userId = userId;
        this._name = name;
        this._email = email;
        this._devices = new Array();
    }
    User.prototype.addDevice = function (device) {
        this._devices.push(device);
    };
    User.prototype.removeDevices = function (deviceid) {
        this._devices = this._devices.filter(function (x) { return x.deviceId !== deviceid; });
    };
    Object.defineProperty(User.prototype, "userId", {
        get: function () {
            return this._userId;
        },
        set: function (value) {
            this._userId = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(User.prototype, "name", {
        get: function () {
            return this._name;
        },
        set: function (value) {
            this._name = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(User.prototype, "email", {
        get: function () {
            return this._email;
        },
        set: function (value) {
            this._email = value;
        },
        enumerable: false,
        configurable: true
    });
    return User;
}());
exports.User = User;
