import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CryptoquestComponent } from './cryptoquest.component';

describe('CryptoquestComponent', () => {
  let component: CryptoquestComponent;
  let fixture: ComponentFixture<CryptoquestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CryptoquestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CryptoquestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
