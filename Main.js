"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var UserManager_1 = require("./user/UserManager");
var DeviceManager_1 = require("./device/DeviceManager");
var Application_1 = require("./Application");
function main() {
    var userManagerInstance = UserManager_1.UserManager.getInstance();
    var deviceManagerInstance = DeviceManager_1.DeviceManager.getInstance();
    var applicationInstance = Application_1.Application.getInstance();
    var user = userManagerInstance.createUser("101", "pratham", "pratham@gmail.com");
    var d1 = deviceManagerInstance.createDevice("201", "samsung");
    var d2 = deviceManagerInstance.createDevice("202", "apple");
    applicationInstance.login(user.userId, d1.deviceId);
    // applicationInstance.login(user.userId,d2.deviceId);
    // applicationInstance.login(user.userId,d1.deviceId);
}
main();
