import { Task } from './task';
import { IBoardContent } from './boardContent';

export class Board {
  boardName: string;
  _id?: string;
  boardContent: IBoardContent;

  constructor(boardName: string, id: string, boardContent: IBoardContent) {
    this.boardName = boardName;
    this._id = id;
    this.boardContent = boardContent;
  }
}
