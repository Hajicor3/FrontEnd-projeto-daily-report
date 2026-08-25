import { LoadingService } from './core/services/loading.service';
import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Slidebar } from "./core/shared/components/slidebar/slidebar";
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { CommonModule,AsyncPipe } from '@angular/common';

@Component({
  imports: [RouterOutlet, Slidebar, MatProgressSpinner, AsyncPipe, CommonModule],
  selector: 'app-root',
  styleUrl: './app.scss',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('daily-report');
  loadingService: LoadingService;

  constructor(loadingService: LoadingService){
    this.loadingService = loadingService;
  }

  get isLoading$(){
    return this.loadingService.isLoading$;
  }
}
