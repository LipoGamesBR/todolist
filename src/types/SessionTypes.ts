import { Session } from "express-session";

interface MySession extends Session{
    name?: string
    user?: string
}

export { MySession }