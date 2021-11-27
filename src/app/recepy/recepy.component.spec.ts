import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecepyComponent } from './recepy.component';

describe('RecepyComponent', () => {
  let component: RecepyComponent;
  let fixture: ComponentFixture<RecepyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecepyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecepyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
