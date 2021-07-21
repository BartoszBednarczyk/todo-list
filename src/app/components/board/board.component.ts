import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop'
import { MatDialog } from '@angular/material/dialog'
import { Task } from './task'
import { Board } from './board'
import { BoardContent } from './boardContent';
import { DialogTaskFormComponent } from '../dialog-task-form/dialog-task-form.component';
import { DialogEdittaskFormComponent } from '../dialog-edittask-form/dialog-edittask-form.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { TodoService } from 'src/app/services/todo.service';



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
  thrash: Task[] = []
  id: string = ''
  boards: Board[] = []
  board?: Board
  boardContent?: BoardContent;

  constructor(
    private todoService: TodoService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private route: ActivatedRoute,
    router: Router,
    private titleService: Title) {
    router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        this.openCurrentBoard()
      }
    })
  }

  ngOnInit(): void {
    this.openCurrentBoard()
  }

  // API Requests
  updateBoard(data: Board): void {
    this.todoService.update(this.id, data).subscribe(
      data => {
        this.boards = data;
      },
      error => {
        console.log(error)
      }
    )
  }

  getBoard(): void {
    this.todoService.get(this.route.snapshot.params.id).subscribe(
      data => {
        if (data) {
          this.board = <Board>data
          this.todo = this.board.boardContent.todo
          this.inProgress = this.board.boardContent.inProgress
          this.done = this.board.boardContent.done
          this.setTitle(this.board.boardName)
        } else {

        }
      },
      error => {
        console.log(error)
        window.open('/', '_self')
      }
    )
  }

  updateBoards(): void {
    this.board!.boardContent.todo = this.todo
    this.board!.boardContent.inProgress = this.inProgress
    this.board!.boardContent.done = this.done
    console.log(this.board)
    this.updateBoard(this.board!)
  }

  public setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }


  openAddingTaskDialog(): void {
    const dialogRef = this.dialog.open(DialogTaskFormComponent, {
      width: '400px',
      data: {
        data: this.todo,
        func: () => this.updateBoards()
      }
    });

    dialogRef.afterClosed().subscribe(result => {
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

      this.updateBoards();
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
    this.updateBoards();
  }

  openSnackBar(message: string, action: string, duration: number) {
    this._snackBar.open(message, action, { duration });
  }

  openCurrentBoard(): void {
    this.id = this.route.snapshot.params.id
    this.getBoard()
  }

}
