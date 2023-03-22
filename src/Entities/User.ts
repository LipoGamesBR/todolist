const { v4: uuidv4 } =require('uuid')


export class User {
    public readonly id: string;

    public name: string;
    public password: string;

    constructor(props: Omit<User, 'id'>, id?: string){
        Object.assign(this, props);

        if(!id){
            this.id == uuidv4();
        }
    }
}