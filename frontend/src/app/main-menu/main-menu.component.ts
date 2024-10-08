import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { GameSelectionComponent } from '../game-selection/game-selection.component';

@Component({
  selector: 'app-main-menu',
  standalone: true,
  imports: [CommonModule, GameSelectionComponent],
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.scss']
})
export class MainMenuComponent {
  username: string = localStorage.getItem('username') || '';
  games = [
    { name: 'Хрестики-Нолики', description: 'Гра на двох, де потрібно скласти три в ряд' },
    { name: 'Шашки', description: 'Класична гра шашки на двох' },
    { name: 'Шахмати', description: 'Класична стратегічна гра' }
  ];

  constructor(private router: Router) {}

  navigateToJoinLobby() {
    this.router.navigate(['/join-lobby']);
  }
}
