import { Router } from "express";
import { MySession } from "./types/SessionTypes";
import { createUserController } from "./useCases/CreateUser";
import { loginUserController } from "./useCases/LoginUser";

const router = Router();


//method post

router.get('/', (request, response) => {
    const session = request.session as MySession
    if(session.name)return response.render('index')
    return response.render('login')
})

router.get('/login', (request, response) => {
    const session = request.session as MySession
    if(session.name)return response.render('index')
    return response.render('login')
})

router.get('/register', (request, response) => {
    const session = request.session as MySession
    if(session.name)return response.render('index')
    return response.render('register')
})


//method post

router.post('/register', (request, response) => {
    return createUserController.handle(request, response);
})

router.post('/login', (request, response) => {
    return loginUserController.handle(request, response);
})


export {router}