import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChipsCompleteComponent } from './chips-complete.component';

describe('ChipsCompleteComponent', () => {
  let component: ChipsCompleteComponent;
  let fixture: ComponentFixture<ChipsCompleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChipsCompleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChipsCompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
