import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { SignalrService } from '../../services/signalr.service';

@Component({
  selector: 'app-join-lobby',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './join-lobby.component.html',
  styleUrls: ['./join-lobby.component.scss']
})

export class JoinLobbyComponent {
  lobbyCode: string = '';

  constructor(private signalrService: SignalrService, private router: Router) {}

  joinLobby() {
    if (this.lobbyCode.trim()) {
      this.signalrService.startConnection(() => {
        this.signalrService.joinLobby(this.lobbyCode, (gameName: string) => {

          // Визначаємо маршрут для гри залежно від обраної гри
          const gameRoutes: { [key: string]: string } = {
            'Хрестики-Нолики': '/tic-tac-toe',
            'Шашки': '/checkers',
            'Шахмати': '/chess',
          };

          const gameRoute = gameRoutes[gameName];

          if (gameRoute) {
            this.router.navigate([gameRoute], { state: { lobbyCode: this.lobbyCode } });
          } else {
            console.error(`Маршрут для гри "${gameName}" не знайдено.`);
          }
        });
      });
    }
  }
}
