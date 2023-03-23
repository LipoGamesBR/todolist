import { Tasks } from "../../Entities/Tasks";
import { ITasksRepository } from "../../Repositories/ITasksRepository";
import { ICreateTaskDTO } from "./CreateTaskDTO";

export class CreateTaskCase{
    constructor(
        private taskRepository: ITasksRepository
    ){}

    async execute(data: ICreateTaskDTO){
        const userAlreadyExists = await this.taskRepository.findTaks(data.name)

        if( userAlreadyExists ){
            throw new Error('User already exists')
        }

        const task = new Tasks(data)
        await this.taskRepository.save(task);
    }
}