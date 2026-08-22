import { Component } from '@angular/core';
import { StatsCard } from "./components/stats-card/stats-card";
import { TodayActivities } from "./components/today-activities/today-activities";

@Component({
  imports: [StatsCard, TodayActivities],
  selector: 'app-dashboard',
  styleUrl: './dashboard.scss',
  templateUrl: './dashboard.html',
})
export class Dashboard {}
