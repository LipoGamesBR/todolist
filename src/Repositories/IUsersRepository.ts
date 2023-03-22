import { User } from "../Entities/User";

export interface IUserRepository{
    findUser(name: string): Promise<User>
    save(user: User): Promise<void>;
}