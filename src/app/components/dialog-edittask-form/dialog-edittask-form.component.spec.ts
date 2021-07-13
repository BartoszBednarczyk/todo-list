import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEdittaskFormComponent } from './dialog-edittask-form.component';

describe('DialogEdittaskFormComponent', () => {
  let component: DialogEdittaskFormComponent;
  let fixture: ComponentFixture<DialogEdittaskFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogEdittaskFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogEdittaskFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
