import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SignalrService } from '../../services/signalr.service';

@Component({
  selector: 'app-game-lobby',
  standalone: true,
  templateUrl: './game-lobby.component.html',
  styleUrls: ['./game-lobby.component.scss']
})
export class GameLobbyComponent implements OnInit {
  game = history.state.game;
  lobbyCode = Math.floor(100000 + Math.random() * 900000).toString();

  constructor(private signalrService: SignalrService, private router: Router) {}

  ngOnInit(): void {
    this.signalrService.startConnection(() => {
      // Викликаємо createLobby тільки після того, як з'єднання встановлено
      this.signalrService.createLobby(this.lobbyCode, this.game.name);
    });
  }

  startGame() {
    const gameRoutes: { [key: string]: string } = {
      'Хрестики-Нолики': '/tic-tac-toe',
      'Шашки': '/checkers',
      'Шахмати': '/chess',
    };

    const gameName = this.game.name;
    const gameRoute = gameRoutes[gameName];

    if (gameRoute) {
      this.router.navigate([gameRoute], { state: { lobbyCode: this.lobbyCode } });
    } else {
      console.error(`Маршрут для гри "${gameName}" не знайдено.`);
    }
  }
}
