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
  thrash: Board[] = [];
  isDataLoaded: boolean = false;

  constructor(fb: FormBuilder,
    private todoService: TodoService,
    public dialog: MatDialog,) {
    this.options = fb.group({
      bottom: 0,
      fixed: false,
      top: 0
    });
  }

  ngOnInit() {
    this.getBoards()
  }

  // API requestes
  deleteBoard(id: string): void {
    this.todoService.delete(id).subscribe(
      data => {
        console.log('Data: ' + data)
      },
      error => {
        console.log(error)
      }
    )
  }

  getBoards(): void {
    this.todoService.getAll().subscribe(
      data => {
        this.boards = data;
        this.changeDataLoadedStatus();
        console.log("Changed!")
      },
      error => {
        console.log(error)
      }
    )
  }

  changeDataLoadedStatus(): void {
    this.isDataLoaded = true;
    console.log("DATA: " + this.isDataLoaded)
  }

  openCreatingBoardDialog(): void {
    const dialogRef = this.dialog.open(DialogCreateBoardComponent, {
      width: '400px',
      data: ""
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getBoards()
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
      console.log(event.container.data)
      if (window.location.href.endsWith(event.container.data[0]._id)) {
        window.open('/', "_self")
      }
      this.thrash && this.deleteBoard(event.container.data[0]._id)
      this.thrash = []
    }

  }
}
