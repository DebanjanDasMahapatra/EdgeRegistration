import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminRegisterDialogComponent } from './admin-register-dialog.component';

describe('AdminRegisterDialogComponent', () => {
  let component: AdminRegisterDialogComponent;
  let fixture: ComponentFixture<AdminRegisterDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminRegisterDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminRegisterDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
