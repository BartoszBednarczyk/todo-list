import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { Task } from './task';
import { Board } from './board';
import { DialogTaskFormComponent } from '../dialog-task-form/dialog-task-form.component';
import { DialogEdittaskFormComponent } from '../dialog-edittask-form/dialog-edittask-form.component';
import { TodoService } from 'src/app/services/todo.service';
import { IBoardContent } from './boardContent';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.sass'],
})
export class BoardComponent implements OnInit {
  storage: Storage = window.localStorage;
  thrash: Task[] = [];
  id: string = '';
  boardContent: IBoardContent = { todo: [], inProgress: [], done: [] };
  board: Board = new Board('', '', this.boardContent);

  constructor(
    private todoService: TodoService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private route: ActivatedRoute,
    router: Router,
    private titleService: Title
  ) {
    router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        this.openCurrentBoard();
      }
    });
  }

  onClick(data: any) {
    console.log(data);
  }

  ngOnInit(): void {
    this.openCurrentBoard();
  }

  openCurrentBoard(): void {
    this.id = this.route.snapshot.params.id;
    this.getBoard();
  }

  // API Requests
  updateBoard(): void {
    this.todoService.update(this.id, this.board).subscribe(
      (data) => {
        console.log('updated');
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getBoard(): void {
    this.todoService.get(this.route.snapshot.params.id).subscribe(
      (data: Board) => {
        if (data) {
          this.board = data;
          this.setTitle(this.board.boardName);
        } else {
        }
      },
      (error) => {
        console.log(error);
        window.open('/', '_self');
      }
    );
  }

  public setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }

  openAddingTaskDialog(item?: Task): void {
    const dialogRef = this.dialog.open(DialogTaskFormComponent, {
      width: '400px',
      data: {
        todo: this.board.boardContent.todo,
        func: () => this.updateBoard(),
        item: item,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.board.boardContent.todo = this.board.boardContent.todo.filter(
        (item) => !!item.name
      );
      this.board.boardContent.inProgress =
        this.board.boardContent.inProgress.filter((item) => !!item.name);
      this.board.boardContent.done = this.board.boardContent.done.filter(
        (item) => !!item.name
      );

      this.updateBoard();
    });
  }

  openEditTaskDialog(item: Task): void {
    const dialogRef = this.dialog.open(DialogEdittaskFormComponent, {
      width: '400px',
      data: item,
    });

    dialogRef.afterClosed().subscribe((result) => {
      //Filter tasks without names to remove them
      this.board.boardContent.todo = this.board.boardContent.todo.filter(
        (item) => !!item.name
      );
      this.board.boardContent.inProgress =
        this.board.boardContent.inProgress.filter((item) => !!item.name);
      this.board.boardContent.done = this.board.boardContent.done.filter(
        (item) => !!item.name
      );

      this.updateBoard();
    });
  }

  drop(event: CdkDragDrop<Task[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
    this.updateBoard();
  }

  openSnackBar(message: string, action: string, duration: number) {
    this._snackBar.open(message, action, { duration });
  }
}
