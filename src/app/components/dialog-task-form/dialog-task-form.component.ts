import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Task } from '../board/task';

@Component({
  selector: 'app-dialog-task-form',
  templateUrl: './dialog-task-form.component.html',
  styleUrls: ['./dialog-task-form.component.sass'],
})
export class DialogTaskFormComponent implements OnInit {
  storage: Storage = window.localStorage;
  name: FormControl = new FormControl('', [Validators.required]);
  description: string = '';
  isDescriptionVisible: boolean = true;
  color: string = '#ecf0f1';
  nameInvalid: boolean = false;
  isItEditDialog: boolean = false;
  colors: any = {
    clouds: '#ecf0f1',
    emerald: '#2ecc71',
    peterRiver: '#3498db',
    amethyst: '#9b59b6',
    wetAsphalt: '#34495e',
    sunFlower: '#f1c40f',
    carrot: '#e67e22',
    alizarin: '#e74c3c',
  };

  constructor(
    public dialogRef: MatDialogRef<DialogTaskFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _snackBar: MatSnackBar
  ) {
    console.log(this.data.data);
  }

  ngOnInit() {
    console.log(this.data);
    if (this.data.item) {
      this.isItEditDialog = true;
      this.name.patchValue(this.data.item.name);
      this.description = this.data.item.description;
      console.log(this.data.item.description);
      this.color = this.data.item.color;
      this.isDescriptionVisible = this.data.item.isDescriptionVisible;
    }
  }

  getErrorMessage(): string {
    return 'You must enter a value';
  }

  addTask(): void {
    if (this.name.valid) {
      let temp = new Task(
        this.name.value,
        this.description,
        this.isDescriptionVisible,
        this.color
      );
      this.data.todo.push(temp);
      //this.storage.setItem('todo', JSON.stringify(this.data.data))
      this.data.func();
      this.openSnackBar('Added new task', 'Close', 3000);
      this.clearForm();
      document.getElementById('name')?.focus();
    } else {
      this.showInvalidNameInfo();
    }
  }

  editTask(): void {
    if (this.name.valid) {
      this.data.item.name = this.name.value;
      this.data.item.description = this.description;
      this.data.item.isDescriptionVisible = this.isDescriptionVisible;
      this.data.item.color = this.color;
      this.openSnackBar('Edited task', 'Close', 3000);
      this.dialogRef.close();
    } else {
      this.showInvalidNameInfo();
    }
  }

  showInvalidNameInfo(): void {
    this.openSnackBar('You have to choose task name', 'Close', 3000);
    document.getElementById('name')?.focus();
  }

  deleteTask(): void {
    this.data.item.name = '';
    this.openSnackBar('Deleted task', 'Close', 3000);
    this.dialogRef.close();
  }

  clearForm(): void {
    this.name.reset();
    this.description = '';
    this.isDescriptionVisible = true;
    this.color = '#ecf0f1';
  }

  openSnackBar(message: string, action: string, duration: number) {
    this._snackBar.open(message, action, { duration });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
