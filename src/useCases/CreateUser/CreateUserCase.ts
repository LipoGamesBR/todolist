import bcrypt from "bcrypt"
import { User } from "../../Entities/User";
import { IUserRepository } from "../../Repositories/IUsersRepository";
import { ICreateUserDTO } from "./CreateUserDTO";

export class CreateUserCase{
    constructor(
        private usersRepository: IUserRepository,
    ){}
    async execute(data: ICreateUserDTO){
        const userAlreadyExists = await this.usersRepository.findUser(data.name)

        if( userAlreadyExists ){
            throw new Error('User already exists')
        }

        const user = new User(data)

        const hash = await bcrypt.genSalt(10)

        user.password = await bcrypt.hash(user.password, hash)

        await this.usersRepository.save(user);
    }
}