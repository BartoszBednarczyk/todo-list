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
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private route: ActivatedRoute,
    router: Router,
    private titleService: Title) { 
      router.events.subscribe((val) => {
        if(val instanceof NavigationEnd) {
          this.openCurrentBoard()
        }
      })
  }

  public setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }


  openAddingTaskDialog(): void {
    const dialogRef = this.dialog.open(DialogTaskFormComponent, {
      width: '400px',
      data: {
        data: this.todo,
        func: () => this.saveDataToLocalStorage()
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

      this.saveDataToLocalStorage();
    });
  }

  saveDataToLocalStorage(): void {
    let index = this.boards.findIndex((board: any) => board.id === this.id)
    this.boards[index].boardContent = {
      todo: this.todo,
      inProgress: this.inProgress,
      done: this.done
    }
    this.storage.setItem('boards', JSON.stringify(this.boards))
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

  openSnackBar(message: string, action: string, duration: number) {
    this._snackBar.open(message, action, {duration});
  }

  openCurrentBoard(): void {
    this.id = this.route.snapshot.params.id
    let temp = this.storage.getItem('boards')
    this.boards = JSON.parse(<string>temp);
    if (this.checkIfBoardExist()){
      this.board = this.boards!.filter((board: any) => board.id === this.id)[0]
      console.log(this.board)
      this.setTitle(this.board.boardName)
      this.boardContent = this.board.boardContent
      this.todo = this.boardContent.todo
      this.done = this.boardContent.done
      this.inProgress = this.boardContent.inProgress
    } else {
      window.open('/', '_self')
    }
    

  }

  checkIfBoardExist(): boolean {
    let filteredArray = this.boards!.filter((board: any) => board.id == this.id).length;
    if(!filteredArray) {
      return false
    } else {
      return true
    }
  }

  ngOnInit(): void {
    this.openCurrentBoard()
  }

}
