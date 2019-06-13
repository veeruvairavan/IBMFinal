import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateDisplayComponent } from './update-display.component';

describe('UpdateDisplayComponent', () => {
  let component: UpdateDisplayComponent;
  let fixture: ComponentFixture<UpdateDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
