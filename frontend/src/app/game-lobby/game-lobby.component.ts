import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-game-lobby',
  standalone: true,
  templateUrl: './game-lobby.component.html',
  styleUrls: ['./game-lobby.component.scss']
})

export class GameLobbyComponent {
  game = history.state.game;
  lobbyCode = Math.floor(100000 + Math.random() * 900000).toString(); // Генеруємо випадковий код лобі

  constructor(private router: Router) {}

  startGame() {
    this.router.navigate(['/game-interface'], { state: { game: this.game, lobbyCode: this.lobbyCode } });
  }
}
