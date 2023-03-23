import { TaskRepository } from "../../Repositories/Implementations/TaskRepository";
import { CreateTaskCase } from "./CreateTaskCase";
import { CreateTaskController } from "./CreateTaskController";

const taskRepository = new TaskRepository

const createTaskCase = new CreateTaskCase(
    taskRepository
)

const createTaskController = new CreateTaskController(
    createTaskCase
)

export { createTaskCase, createTaskController }