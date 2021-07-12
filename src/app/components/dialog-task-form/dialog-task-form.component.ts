import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { DialogData } from './dialogData.interface';

@Component({
  selector: 'app-dialog-task-form',
  templateUrl: './dialog-task-form.component.html',
  styleUrls: ['./dialog-task-form.component.sass']
})
export class DialogTaskFormComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DialogTaskFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData ) { 
    
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
  }

}
