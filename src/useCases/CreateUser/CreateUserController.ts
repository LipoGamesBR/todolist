import { Request, Response } from "express";
import { MySession } from "../../types/SessionTypes";
import { CreateUserCase } from "./CreateUserCase";

export class CreateUserController{
    constructor(
        private createUserCase: CreateUserCase
    ){}

    async handle(request: Request, response: Response): Promise<Response>{
        const {name, password} = request.body;
        const session = request.session as MySession
        if(session.name)throw new Error('You already logged')

        try{
            await this.createUserCase.execute({
                name,
                password
            })

            
            session.name = name
            
            response.redirect('/')
            return response.status(201)

        }catch(err){
            if(err.message == "User already exists"){
                const data = {
                    message: "Usuário já está em uso"
                }
                response.render('register', data)
                response.end()
            }else{
                return response.status(400).json({
                    message: err.message || 'Unexpected error.'
                })
            }
        }
    }
}