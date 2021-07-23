import { Board } from './../board';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-board-containter',
  templateUrl: './board-containter.component.html',
  styleUrls: ['../board.component.sass'],
})
export class BoardContainterComponent implements OnInit {
  @Input() tasksArray: any[] = [];

  @Output() clickEvent: EventEmitter<any> = new EventEmitter();

  editTask(item: any): void {
    this.clickEvent.emit(item);
  }
  constructor() {}

  ngOnInit(): void {}
}
