import { Component, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { v4 as uuidv4 } from 'uuid'
import { Task } from '../board/task';

@Component({
  selector: 'app-dialog-create-board',
  templateUrl: './dialog-create-board.component.html',
  styleUrls: ['./dialog-create-board.component.sass']
})
export class DialogCreateBoardComponent {
  storage: Storage = window.localStorage;
  

  name: FormControl = new FormControl('', [Validators.required])
  nameInvalid: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<DialogCreateBoardComponent>,
    private _snackBar: MatSnackBar) { 
  }

  getErrorMessage(): string {
      return 'You must enter a value';
  }

  createBoard(): void {
    if (this.name.valid) {
      let tempBoards: string | null = this.storage.getItem('boards')
      let boards: Object[];
      if (!tempBoards) {
        this.storage.setItem('boards', JSON.stringify([]));
        boards = []
      }
      boards = JSON.parse(<string>this.storage.getItem('boards'));
      boards.push({boardName: this.name.value, id: uuidv4(), boardContent: {todo: [], inProgress: [], done: []}})
      this.storage.setItem('boards', JSON.stringify(boards));
      console.log(boards)
      this.dialogRef.close();
    } else {
      this.openSnackBar("You have to choose board name", "Close", 3000);
      document.getElementById('name')?.focus()
    }
    
    
  }

  openSnackBar(message: string, action: string, duration: number) {
    this._snackBar.open(message, action, {duration});
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
