import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoveElementsComponent } from './move-elements.component';

describe('MoveElementsComponent', () => {
  let component: MoveElementsComponent;
  let fixture: ComponentFixture<MoveElementsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MoveElementsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MoveElementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
