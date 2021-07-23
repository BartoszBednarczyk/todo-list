import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-error-page',
  template: `<h1>Oops...</h1>
    <h2>Something went wrong. Please go back and try again!</h2>
    <button mat-raised-button color="accent" [routerLink]="['/']">
      Return
    </button>`,
  styleUrls: ['./error-page.component.sass'],
})
export class ErrorPageComponent implements OnInit, OnDestroy {
  constructor() {}

  ngOnDestroy(): void {
    window.location.reload();
  }

  ngOnInit(): void {}
}
