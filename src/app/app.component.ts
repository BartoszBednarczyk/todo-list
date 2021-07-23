import {
  Component,
  OnInit,
  OnDestroy,
  HostListener,
  ElementRef,
} from '@angular/core';
import { Router } from '@angular/router';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';

import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { DialogCreateBoardComponent } from './components/dialog-create-board/dialog-create-board.component';
import { Board } from './components/board/board';
import { TodoService } from './services/todo.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
})
export class AppComponent implements OnInit, OnDestroy {
  options: FormGroup;
  boards: Board[] = [];
  thrash: Board[] = [];
  isDataLoaded: boolean = false;
  isProgressbarActive: boolean = false;

  constructor(
    fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private elementRef: ElementRef,
    private _router: Router,
    private todoService: TodoService,
    public dialog: MatDialog
  ) {
    this.options = fb.group({
      bottom: 0,
      fixed: false,
      top: 0,
    });
  }

  ngOnInit() {
    this.getBoards();
    console.log('AGAIN');
  }

  @HostListener('unloaded')
  ngOnDestroy() {
    this.elementRef.nativeElement.remove();
  }

  // API requestes
  deleteBoard(id: string): void {
    this.changeProgressbarStatus();
    this.todoService.delete(id).subscribe(
      (data) => {
        console.log('Data: ' + data);
        this.changeProgressbarStatus();
      },
      (error) => {
        this.changeProgressbarStatus();
        this.openSnackBar(
          'Something went wrong while deleting board. Try again later',
          'Close',
          3000
        );
      }
    );
  }

  getBoards(): void {
    this.todoService.getAll().subscribe(
      (data) => {
        this.boards = data;
        this.changeDataLoadedStatus();
        console.log('Changed!');
      },
      (error) => {
        console.log(error);
        this.openErrorPage();
        this.changeDataLoadedStatus();
      }
    );
  }

  openSnackBar(message: string, action: string, duration: number) {
    this._snackBar.open(message, action, { duration });
  }

  openErrorPage(): void {
    this._router.navigate(['/error']);
  }

  changeProgressbarStatus(): void {
    this.isProgressbarActive = !this.isProgressbarActive;
  }

  changeDataLoadedStatus(): void {
    this.isDataLoaded = true;
    console.log('DATA: ' + this.isDataLoaded);
  }

  openCreatingBoardDialog(): void {
    const dialogRef = this.dialog.open(DialogCreateBoardComponent, {
      width: '400px',
      data: () => this.changeProgressbarStatus(),
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.getBoards();
    });
  }

  drop(event: CdkDragDrop<any>) {
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
      console.log(event.container.data);
      if (window.location.href.endsWith(event.container.data[0]._id)) {
        window.open('/', '_self');
      }
      this.thrash && this.deleteBoard(event.container.data[0]._id);
      this.thrash = [];
    }
  }
}
