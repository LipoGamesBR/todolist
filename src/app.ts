import express from "express"
import path from "path"
import { router } from "./router"
import bodyParser from "body-parser"
import session from "express-session"
import dotenv from "dotenv"

dotenv.config()

const app = express()


app.use(
    session({
        secret: process.env.SecretKey,
        resave: false,
        saveUninitialized: false,
    })
)


app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.use(express.static(__dirname + '/frontend/styles'))
app.use(express.static(__dirname + '/frontend/scripts'))

app.set('views', path.join(__dirname, '/frontend/views'))
app.set('view engine', 'ejs')

app.use(router)

app.listen('8000')