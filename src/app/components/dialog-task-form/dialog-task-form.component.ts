import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Task } from '../board/task';

@Component({
  selector: 'app-dialog-task-form',
  templateUrl: './dialog-task-form.component.html',
  styleUrls: ['./dialog-task-form.component.sass']
})
export class DialogTaskFormComponent implements OnInit {

  name: string = "";
  description: string = "";
  isDescriptionVisible: boolean = true;

  constructor(
    public dialogRef: MatDialogRef<DialogTaskFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Task[],
    private _snackBar: MatSnackBar) { 
      console.log(this.data)
      
  }

  addTask(): void {
    let temp = new Task(this.name, this.description, this.isDescriptionVisible)
    this.data.push(temp)
    this.openSnackBar('Added new task', 'Close')
    this.clearForm()
    
  }

  clearForm(): void {
    this.name, this.description = ""
    this.isDescriptionVisible = true
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
  }

}
