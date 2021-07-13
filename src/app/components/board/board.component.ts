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
  todo: Task[] = []

  inProgress: Task[] = []

  done: Task[] = []
  constructor(public dialog: MatDialog) { 
    this.todo.push(new Task("Make some more coffee","It could be useful to not fall asleep while doing next tasks.", true, "#9b59b6"))
    this.inProgress.push(new Task("Create ToDoApp","Three sideboards, drag&drop, adding new tasks, editing existing tasks.", true, "#f1c40f"))
    this.inProgress.push(new Task("Create ToDoApp","Three sideboards, drag&drop, adding new tasks, editing existing tasks.", true, "#e74c3c"))
    this.inProgress.push(new Task("Create ToDoApp","Three sideboards, drag&drop, adding new tasks, editing existing tasks.", true, "#e74c3c"))
    this.done.push(new Task("Make a coffee","Just the thing you do first thing firsts.", true, "#e74c3c"))

  }


  openDialog(): void {
    const dialogRef = this.dialog.open(DialogTaskFormComponent, {
      width: '400px',
      data: this.todo
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  openEditDialog(item: Task): void {
    const dialogRef = this.dialog.open(DialogEdittaskFormComponent, {
      width: '400px',
      data: item
    });

    dialogRef.afterClosed().subscribe(result => {
      this.todo = this.todo.filter(item => item.name)
      this.inProgress = this.inProgress.filter(item => item.name)
      this.done = this.done.filter(item => item.name)
    });
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
    console.log('Todo: ' + this.todo + " In progress: " + this.inProgress + " Done: " + this.done)
  }

  ngOnInit(): void {
  }

}
