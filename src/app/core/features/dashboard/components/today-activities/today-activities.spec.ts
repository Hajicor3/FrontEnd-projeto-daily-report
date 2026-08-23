import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TodayActivities } from './today-activities';

describe('TodayActivities', () => {
  let component: TodayActivities;
  let fixture: ComponentFixture<TodayActivities>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodayActivities],
    }).compileComponents();

    fixture = TestBed.createComponent(TodayActivities);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
