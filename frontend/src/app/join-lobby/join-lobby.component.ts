import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-join-lobby',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './join-lobby.component.html',
  styleUrls: ['./join-lobby.component.scss']
})
export class JoinLobbyComponent {
  lobbyCode: string = '';

  constructor(private router: Router) {}

  joinLobby() {
    // Поки що просто переходимо до гри з кодом лобі (у реальному випадку будемо перевіряти код)
    if (this.lobbyCode.trim()) {
      this.router.navigate(['/game-interface'], { state: { lobbyCode: this.lobbyCode } });
    }
  }
}
