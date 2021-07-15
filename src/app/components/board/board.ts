import { Task } from './task'
import { BoardContent } from './boardContent';

export class Board {
    boardName: string;
    id: string;
    boardContent: BoardContent;
    

    constructor(boardName: string, id: string, boardContent: BoardContent) {
        this.boardName = boardName;
        this.id = id;
        this.boardContent = boardContent;
    }
}

