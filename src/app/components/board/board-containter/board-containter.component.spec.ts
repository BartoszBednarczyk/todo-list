import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardContainterComponent } from './board-containter.component';

describe('BoardContainterComponent', () => {
  let component: BoardContainterComponent;
  let fixture: ComponentFixture<BoardContainterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoardContainterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardContainterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
