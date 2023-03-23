import { Request, Response } from "express";
import { MySession } from "../../types/SessionTypes";
import { CreateTaskCase } from "./CreateTaskCase";

export class CreateTaskController{
    constructor(
        private createTaskCase: CreateTaskCase
    ){}

    async handle(request: Request, response: Response): Promise<Response>{
        const {name, description} = request.body;
        const session = request.session as MySession
        if(!session.name)throw new Error("You don't have permission")

        try{
            await this.createTaskCase.execute({
                owner: session.user,
                name,
                description
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