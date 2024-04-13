"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Session = void 0;
var Session = /** @class */ (function () {
    function Session(sessionId) {
        this._startTime = new Date().toISOString();
        this._endTime = "";
        this._sessionId = sessionId;
    }
    Object.defineProperty(Session.prototype, "sessionId", {
        get: function () {
            return this._sessionId;
        },
        set: function (value) {
            this._sessionId = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Session.prototype, "startTime", {
        get: function () {
            return this._startTime;
        },
        set: function (value) {
            this._startTime = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Session.prototype, "endTime", {
        get: function () {
            return this._endTime;
        },
        set: function (value) {
            this._endTime = value;
        },
        enumerable: false,
        configurable: true
    });
    Session.prototype.endSession = function () {
        this._endTime = new Date().toISOString();
    };
    return Session;
}());
exports.Session = Session;
