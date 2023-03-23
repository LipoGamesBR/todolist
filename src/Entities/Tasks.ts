import { v4 as uuidv4 } from 'uuid';

export class Tasks{
    
    public readonly id: string;
    public readonly owner: string;

    public name: string;
    public description: string;
    public finished?: boolean

    constructor(props: Omit<Tasks, 'id'>, id?: string){
        Object.assign(this, props)

        this.finished = false;

        if(!id){
            this.id = uuidv4();
        }
    }
}