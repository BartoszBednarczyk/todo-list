import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop'
import { MatDialog } from '@angular/material/dialog'
import { Task } from './task'
import { DialogTaskFormComponent } from '../dialog-task-form/dialog-task-form.component';
import { DialogEdittaskFormComponent } from '../dialog-edittask-form/dialog-edittask-form.component';



@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.sass']
})
export class BoardComponent implements OnInit {

  storage: Storage = window.localStorage;
  todo: Task[] = []
  inProgress: Task[] = []
  done: Task[] = []

  constructor(public dialog: MatDialog) { 
  }


  openAddingTaskDialog(): void {
    const dialogRef = this.dialog.open(DialogTaskFormComponent, {
      width: '400px',
      data: this.todo
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  openEditTaskDialog(item: Task): void {
    const dialogRef = this.dialog.open(DialogEdittaskFormComponent, {
      width: '400px',
      data: item
    });

    dialogRef.afterClosed().subscribe(result => {
      //Filter tasks without names to remove them
      this.todo = this.todo.filter(item => item.name)
      this.inProgress = this.inProgress.filter(item => item.name)
      this.done = this.done.filter(item => item.name)

      this.saveDataToLocalStorage();
    });
  }

  saveDataToLocalStorage(): void {
    this.storage.setItem('todo', JSON.stringify(this.todo))
    this.storage.setItem('inProgress', JSON.stringify(this.inProgress))
    this.storage.setItem('done', JSON.stringify(this.done))
  }

  drop(event: CdkDragDrop<Task[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
      }
      this.saveDataToLocalStorage();
  }

  ngOnInit(): void {
    //At start get all tasks from LocalStorage
    if (this.storage.getItem('todo')) {
      this.todo = JSON.parse(<string>this.storage.getItem('todo')) as Task[];
    }
    if (this.storage.getItem('inProgress')) {
      this.inProgress = JSON.parse(<string>this.storage.getItem('inProgress')) as Task[];
    }
    if (this.storage.getItem('done')) {
      this.done = JSON.parse(<string>this.storage.getItem('done')) as Task[];
    }
  }

}
