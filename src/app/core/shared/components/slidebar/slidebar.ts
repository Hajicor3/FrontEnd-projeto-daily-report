import { Component, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  imports: [MatIconModule, CommonModule],
  selector: 'app-slidebar',
  styleUrl: './slidebar.scss',
  templateUrl: './slidebar.html',
})
export class Slidebar {
  isOpen = signal(false);

  toggleSidebar() {
    this.isOpen.update((value) => !value);
  }

  closeSidebar() {
    this.isOpen.set(false);
  }
}
