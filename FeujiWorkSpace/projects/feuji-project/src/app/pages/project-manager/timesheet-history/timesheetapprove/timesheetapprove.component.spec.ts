import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimesheetapproveComponent } from './timesheetapprove.component';

describe('TimesheetapproveComponent', () => {
  let component: TimesheetapproveComponent;
  let fixture: ComponentFixture<TimesheetapproveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TimesheetapproveComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TimesheetapproveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
