import { UserManager } from "./user/UserManager";
import { DeviceManager } from './device/DeviceManager';
import { Application} from './Application';


function main(){
    const userManagerInstance = UserManager.getInstance();
    const deviceManagerInstance = DeviceManager.getInstance();
    const applicationInstance = Application.getInstance();
    
    const user = userManagerInstance.createUser("101" , "pratham" , "pratham@gmail.com");
    const d1 = deviceManagerInstance.createDevice("201" , "samsung");
    const d2 = deviceManagerInstance.createDevice("202" , "apple");
    applicationInstance.login(user.userId,d1.deviceId);
    // applicationInstance.login(user.userId,d2.deviceId);
    // applicationInstance.login(user.userId,d1.deviceId);
    
}

main();