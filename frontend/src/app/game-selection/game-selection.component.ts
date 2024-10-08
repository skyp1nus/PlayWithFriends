import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-game-selection',
  standalone: true,
  templateUrl: './game-selection.component.html',
  styleUrls: ['./game-selection.component.scss']
})

export class GameSelectionComponent {
  @Input() game: { name: string, description: string } | undefined;

  constructor(private router: Router) {}

  selectGame() {
    // Переходимо до сторінки лобі гри
    this.router.navigate(['/game-lobby'], { state: { game: this.game } });
  }
}
