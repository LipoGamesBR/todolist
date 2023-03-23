import { Request, Response } from "express";
import { MySession } from "../../types/SessionTypes";

import { LoginUserCase } from "./LoginUserCase";

export class LoginUserController{
    constructor(
        private LoginUserCase: LoginUserCase
    ){}
    async handle (request: Request, response: Response): Promise<Response>{
        const {name, password} = request.body
        const session = request.session as MySession
        if(session.name)throw new Error('You already logged')

        try{
            session.user = await this.LoginUserCase.execute({
                name,
                password
            })
            session.name = name

            response.redirect('/')
            return response.status(201)
        }catch(err){
            if(err.message == "Password incorrect" || err.message == "User dont exists"){
                const data = {
                    message: "Usuário ou senha incorreta"
                }
                response.render("login", data);
                return response.status(400);
            }else{
                return response.status(400).json({
                    message: err.message || 'Unexpected error.'
                })
            }
        }
    }
}