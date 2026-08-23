import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChartHours } from './chart-hours';

describe('ChartHours', () => {
  let component: ChartHours;
  let fixture: ComponentFixture<ChartHours>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChartHours],
    }).compileComponents();

    fixture = TestBed.createComponent(ChartHours);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
