import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecepyListComponent } from './recepy-list.component';

describe('RecepyListComponent', () => {
  let component: RecepyListComponent;
  let fixture: ComponentFixture<RecepyListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecepyListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecepyListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
