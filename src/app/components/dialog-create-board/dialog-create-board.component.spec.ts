import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogCreateBoardComponent } from './dialog-create-board.component';

describe('DialogCreateBoardComponent', () => {
  let component: DialogCreateBoardComponent;
  let fixture: ComponentFixture<DialogCreateBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogCreateBoardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogCreateBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
