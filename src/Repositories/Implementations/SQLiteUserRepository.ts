import sqlite3  from "sqlite3";
import { User } from "../../Entities/User";
import { IUserRepository } from "../IUsersRepository";


export class SQLiteUserRepository implements IUserRepository{
    private db: sqlite3.Database

    constructor(){
        this.db = new sqlite3.Database('database');
        this.db.run('CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, name TEXT, password TEXT)')
    }

    async findUser(name: string): Promise<User> {
        return new Promise<User>((resolve, reject) => {
            this.db.all<User>('SELECT * FROM users WHERE name = ?', name, (err, rows) =>{
                if(err){
                    reject(new Error('Unexpected error on database.'));
                    return;
                }
                if(rows.length > 0){
                    const user: User = rows[0]
                    resolve(user);

                }else{
                    resolve(null)
                }
            })
        })
        
    }

    async save(user: User): Promise<void> {
        this.db.run('INSERT INTO users (id, name, password) VALUES (?, ?, ?)', [user.id, user.name, user.password])
    }
}