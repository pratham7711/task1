import {User} from './User';

export class UserManager {

    private static instance: UserManager | null = null;
    private userMap = new Map<string, User>(); 
    
    private constructor() {
        
    }

    public createUser(userId: string, name: string, email: string):User{
        const u = new User(userId , name , email);
        this.userMap.set(userId , u);
        return u;
    }

    public deleteUser(userId: string)
    {   
        this.userMap.delete(userId);
    }

    static getInstance(): UserManager {
        // Check if an instance of the class already exists
        if (!UserManager.instance) {
            // If not, create a new instance
            UserManager.instance = new UserManager();
        }
        // Return the existing instance or the newly created instance
        return UserManager.instance;
    }

    // Add other methods and properties of the class here
    // For example:
}
