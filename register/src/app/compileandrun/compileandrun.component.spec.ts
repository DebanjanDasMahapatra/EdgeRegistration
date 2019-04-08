import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompileandrunComponent } from './compileandrun.component';

describe('CompileandrunComponent', () => {
  let component: CompileandrunComponent;
  let fixture: ComponentFixture<CompileandrunComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompileandrunComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompileandrunComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
