import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop'
import { MatDialog } from '@angular/material/dialog'
import { Task } from './task'
import { DialogTaskFormComponent } from '../dialog-task-form/dialog-task-form.component';
import { DialogEdittaskFormComponent } from '../dialog-edittask-form/dialog-edittask-form.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';



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
  boards: any = []
  board: any = []
  boardContent: any = []

  currentIcon: string = "add"

  constructor(
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private route: ActivatedRoute,
    router: Router) { 
      router.events.subscribe((val) => {
        if(val instanceof NavigationEnd) {
          this.openCurrentBoard()
        }
      })
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

  saveDataToLocalStorageCallback = (args: any): void => {
    this.saveDataToLocalStorage()
  }

  saveDataToLocalStorage(): void {
    let index = this.boards.findIndex((board: any) => board.id === this.id)
    this.boards[index].boardContent.todo = this.todo
    this.boards[index].boardContent.inProgress = this.inProgress
    this.boards[index].boardContent.done = this.done
    this.storage.setItem('boards', JSON.stringify(this.boards))
    //this.storage.setItem('todo', JSON.stringify(this.todo))
    //this.storage.setItem('inProgress', JSON.stringify(this.inProgress))
    //this.storage.setItem('done', JSON.stringify(this.done))
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
    this.checkIfBoardExist()
    this.board = this.boards!.filter((board: any) => board.id === this.id)
    console.log(this.board)
    this.boardContent = this.board[0].boardContent
    this.todo = this.boardContent.todo
    this.done = this.boardContent.done
    this.inProgress = this.boardContent.inProgress

  }

  checkIfBoardExist(): void {
    if(!this.boards!.filter((board: any) => board.id == this.id).length) {
      window.open('/',"_self")
    } else {
      console.log('exist')
      console.log(this.boards!.filter((board: any) => board.id === this.id))
    }
  }

  ngOnInit(): void {

    this.openCurrentBoard()
    
    //At start get all tasks from LocalStorage
    // if (this.storage.getItem('todo')) {
    //   this.todo = JSON.parse(<string>this.storage.getItem('todo')) as Task[];
    // }
    // if (this.storage.getItem('inProgress')) {
    //   this.inProgress = JSON.parse(<string>this.storage.getItem('inProgress')) as Task[];
    // }
    // if (this.storage.getItem('done')) {
    //   this.done = JSON.parse(<string>this.storage.getItem('done')) as Task[];
    // }
  }

}
