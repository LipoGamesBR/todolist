import { SQLiteUserRepository } from "../../Repositories/Implementations/SQLiteUserRepository";
import { LoginUserCase } from "./LoginUserCase";
import { LoginUserController } from "./LoginUserController";


const sqliteUserRepository = new SQLiteUserRepository()

const loginUserCase = new LoginUserCase(
    sqliteUserRepository
)

const loginUserController = new LoginUserController(
    loginUserCase
)

export { loginUserCase, loginUserController }