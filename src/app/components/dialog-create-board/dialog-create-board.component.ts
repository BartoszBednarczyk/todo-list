import { Component, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TodoService } from 'src/app/services/todo.service';
import { v4 as uuidv4 } from 'uuid'
import { Board } from '../board/board';
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
    private _snackBar: MatSnackBar,
    private todoService: TodoService) { 
  }

  getErrorMessage(): string {
      return 'You must enter a value';
  }

  addBoard(data: Board): void {
    this.todoService.create(data).subscribe(
      response => {
        console.log(response);
      },
      error => {
        console.error(error)
      }
    )
  }

  createBoard(): void {
    if (this.name.valid) {
      this.addBoard({boardName: this.name.value, boardContent: {todo: [], inProgress: [], done: []}})
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
