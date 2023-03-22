import { SQLiteUserRepository } from "../../Repositories/Implementations/SQLiteUserRepository";
import { CreateUserCase } from "./CreateUserCase";
import { CreateUserController } from "./CreateUserController";

const sqliterepository = new SQLiteUserRepository()


const createUserCase = new CreateUserCase(
    sqliterepository
)

const createUserController = new CreateUserController(
    createUserCase
)

export {createUserCase, createUserController}