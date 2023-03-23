import { Tasks } from "../Entities/Tasks";


export interface ITasksRepository{
    findTaks(name: string): Promise<Tasks>

    save(user: Tasks): Promise<void>;
}