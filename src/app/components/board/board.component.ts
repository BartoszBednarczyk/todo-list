import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop'
import { Task } from './task'
@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.sass']
})
export class BoardComponent implements OnInit {
  todo: Task[] = [
    {name: "Test1", description: "Test"}
  ]

  inProgress: Task[] = [
    {name: "Test1", description: "Test"}
  ]

  done: Task[] = [
    {name: "Test1", description: "Test"},
    {name: "Test1", description: "Test"},
    {name: "Test1", description: "Test"},
    {name: "Test1", description: "Test"},
    {name: "Test1", description: "Test"},
    {name: "Test1", description: "Test"},
    {name: "Test1", description: "Test"},
    {name: "Test1", description: "Test"},
    {name: "Test1", description: "Test"},
    {name: "Test1", description: "Test"},
    {name: "Test1", description: "Test"},
    {name: "Test1", description: "Test"},
    {name: "Test1", description: "Test"},
    {name: "Test1", description: "Test"},
    {name: "Test1", description: "Test"},
  ]
  constructor() { 
    let temp = new Task("Test", "Test")
    this.todo.push(temp)
    temp = new Task("Nowe", "Nowe")
    this.todo.push(temp)
    console.log(temp)
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
