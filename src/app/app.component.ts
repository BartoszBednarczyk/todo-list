import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DialogCreateBoardComponent } from './components/dialog-create-board/dialog-create-board.component';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  options: FormGroup;
  storage: Storage = window.localStorage;
  boards: any = [];
  
  constructor(fb: FormBuilder,
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

  ngOnInit() {
    this.loadBoards()
  }

  loadBoards(): void {
    if (this.storage.getItem('boards')){
      this.boards = JSON.parse(<string>this.storage.getItem('boards'))
    }
    console.log(this.boards)
  }
}
