import sqlite3  from "sqlite3";
import { Tasks } from "../../Entities/Tasks";
import { ITasksRepository } from "../ITasksRepository";

export class TaskRepository implements ITasksRepository{
    private db: sqlite3.Database

    constructor(){
        this.db = new sqlite3.Database('database');
        this.db.run('CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, owner INTEGER, name TEXT, description TEXT, finished INTEGER)')
    }
    findTaks(name: string): Promise<Tasks> {
        return new Promise<Tasks>((resolve, reject) => {
            this.db.all<Tasks>('SELECT * FROM tasks WHERE name = ?', name, (err, rows) =>{
                if(err){
                    reject(new Error('Unexpected error on database.'));
                    return;
                }
                if(rows.length > 0){
                    const task: Tasks = rows[0]
                    resolve(task);

                }else{
                    resolve(null)
                }
            })
        })
    }
    async save(task: Tasks): Promise<void> {
        this.db.run('INSERT INTO tasks (id, owner, name, description, finished) VALUES (?, ?, ?, ?, ?)', [task.id, task.owner, task.name, task.description, task.finished])
    }

}