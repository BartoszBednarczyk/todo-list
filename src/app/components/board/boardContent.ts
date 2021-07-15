import { Task } from './task'

export class BoardContent {
    todo: Task[];
    inProgress: Task[];
    done: Task[];
    

    constructor(todo: Task[], inProgress: Task[], done: Task[]) {
        this.todo = todo;
        this.inProgress = inProgress;
        this.done = done;
    }
}

