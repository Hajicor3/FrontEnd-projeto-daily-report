import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Dashboard } from "./core/features/dashboard/dashboard";
import { Slidebar } from "./core/shared/components/slidebar/slidebar";

@Component({
  imports: [RouterOutlet, Dashboard, Slidebar],
  selector: 'app-root',
  styleUrl: './app.scss',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('daily-report');
}
