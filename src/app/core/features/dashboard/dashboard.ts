import { Component } from '@angular/core';
import { StatsCard } from "./components/stats-card/stats-card";

@Component({
  imports: [StatsCard],
  selector: 'app-dashboard',
  styleUrl: './dashboard.scss',
  templateUrl: './dashboard.html',
})
export class Dashboard {}
