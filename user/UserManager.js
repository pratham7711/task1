"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserManager = void 0;
var User_1 = require("./User");
var UserManager = /** @class */ (function () {
    function UserManager() {
        this.userMap = new Map();
    }
    UserManager.prototype.createUser = function (userId, name, email) {
        var u = new User_1.User(userId, name, email);
        this.userMap.set(userId, u);
        return u;
    };
    UserManager.prototype.deleteUser = function (userId) {
        this.userMap.delete(userId);
    };
    UserManager.getInstance = function () {
        // Check if an instance of the class already exists
        if (!UserManager.instance) {
            // If not, create a new instance
            UserManager.instance = new UserManager();
        }
        // Return the existing instance or the newly created instance
        return UserManager.instance;
    };
    UserManager.instance = null;
    return UserManager;
}());
exports.UserManager = UserManager;
