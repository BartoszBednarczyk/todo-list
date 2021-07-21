import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DialogCreateBoardComponent } from './components/dialog-create-board/dialog-create-board.component';
import { Board } from './components/board/board'

import { TodoService } from './services/todo.service'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  options: FormGroup;
  storage: Storage = window.localStorage;
  boards: Board[] = [];
  thrash: Task[] = [];
  todo: any;
  
  constructor(fb: FormBuilder,
    private todoService: TodoService,
    public dialog: MatDialog,) {
    this.options = fb.group({
      bottom: 0,
      fixed: false,
      top: 0
    });
  }

  openCreatingBoardDialog(): void {
    const dialogRef = this.dialog.open(DialogCreateBoardComponent, {
      width: '400px',
      data: ""
    });

    dialogRef.afterClosed().subscribe(result => {
      this.loadBoards()
    });
  }

  drop(event: CdkDragDrop<any>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
      if(window.location.href.endsWith(event.container.data[0].id)){
        window.open('/', "_self")
      }
      this.thrash = []
      }
      this.saveBoards()
  }

  ngOnInit() {
    this.loadBoards()
    //this.getTodos()
    this.createTodo()
  }

  getTodos(): void {
    this.todoService.getAll().subscribe(
      data => {
        this.todo = data;
        console.log('Data: ' + data)
      },
      error => {
        console.log(error)
      }
    )
  }

  createTodo(): void {
    this.todoService.create('').subscribe(
      response => {
        console.log(response);
      }
    )
  }

  loadBoards(): void {
    if (this.storage.getItem('boards')){
      this.boards = JSON.parse(<string>this.storage.getItem('boards'))
    }
    console.log(this.boards)
  }

  saveBoards(): void {
    this.storage.setItem('boards', JSON.stringify(this.boards))
  }
}
