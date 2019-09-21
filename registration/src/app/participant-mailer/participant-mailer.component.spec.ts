import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParticipantMailerComponent } from './participant-mailer.component';

describe('ParticipantMailerComponent', () => {
  let component: ParticipantMailerComponent;
  let fixture: ComponentFixture<ParticipantMailerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParticipantMailerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParticipantMailerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
