import { Session } from "express-session";

interface MySession extends Session{
    name?: String
}

export { MySession }