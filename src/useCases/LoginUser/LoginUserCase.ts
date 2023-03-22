import bcrypt from 'bcrypt'

import { IUserRepository } from "../../Repositories/IUsersRepository";
import { ILoginUserDTO } from "./LoginUserDTO";

export class LoginUserCase{
    constructor(
        private userRepository: IUserRepository
    ){}

    async execute(data: ILoginUserDTO){
        const user = await this.userRepository.findUser(data.name)

        if(user){
            if(await bcrypt.compare(data.password, user.password)){
                console.log('Logged')
            }else throw new Error('Password incorrect')
        }else throw new Error('User dont exists')
    }
}