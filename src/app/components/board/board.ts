import { Task } from './task'
import { BoardContent } from './boardContent';

export class Board {
    boardName: string;
    _id?: string;
    boardContent: BoardContent;
    

    constructor(boardName: string, id: string, boardContent: BoardContent) {
        this.boardName = boardName;
        this._id = id;
        this.boardContent = boardContent;
    }
}

