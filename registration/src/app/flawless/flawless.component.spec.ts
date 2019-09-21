import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlawlessComponent } from './flawless.component';

describe('FlawlessComponent', () => {
  let component: FlawlessComponent;
  let fixture: ComponentFixture<FlawlessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlawlessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlawlessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
