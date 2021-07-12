import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop'
import { MatDialog } from '@angular/material/dialog'
import { Task } from './task'
import { DialogTaskFormComponent } from '../dialog-task-form/dialog-task-form.component';
@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.sass']
})
export class BoardComponent implements OnInit {
  todo: Task[] = [
    {name: "Test1", description: "Test", isDescriptionVisible: true}
  ]

  inProgress: Task[] = [
    {name: "Test1", description: "Test", isDescriptionVisible: true}
  ]

  done: Task[] = [
    {name: "Test1", description: "Test", isDescriptionVisible: true},
  ]
  constructor(public dialog: MatDialog) { 
    let temp = new Task("Test", "Test", false)
    this.todo.push(temp)
    temp = new Task("Nowe", "Nowe", false)
    this.todo.push(temp)
    console.log(temp)
  }


  openDialog(): void {
    const dialogRef = this.dialog.open(DialogTaskFormComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
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
