import { Component } from '@angular/core';
import { SignalrService } from '../../../services/signalr.service';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-tic-tac-toe',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tic-tac-toe.component.html',
  styleUrls: ['./tic-tac-toe.component.scss']
})
export class TicTacToeComponent {
  board: string[] = Array(9).fill(null);
  currentPlayer: string = 'X';
  winner: string | null = null;
  lobbyCode: string;

  constructor(private signalrService: SignalrService) {
    this.lobbyCode = history.state.lobbyCode;

    this.signalrService.startConnection(() => {
      this.signalrService.joinLobby(this.lobbyCode, (gameName: string) => {
        console.log(`Приєднано до гри: ${gameName}`);
      });
    });

    this.signalrService.onReceiveMove((moveData: string) => {
      const move = JSON.parse(moveData);
      this.board[move.index] = move.player;
      this.checkWinner();
      this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
    });
  }

  makeMove(index: number) {
    if (!this.board[index] && !this.winner && this.currentPlayer === 'X') {
      this.board[index] = this.currentPlayer;

      // Відправляємо хід через SignalR іншим гравцям
      this.signalrService.sendMove(this.lobbyCode, JSON.stringify({ index, player: this.currentPlayer }));

      this.checkWinner();
      this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
    }
  }

  checkWinner() {
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];

    for (const combination of winningCombinations) {
      const [a, b, c] = combination;
      if (this.board[a] && this.board[a] === this.board[b] && this.board[a] === this.board[c]) {
        this.winner = this.board[a];
        break;
      }
    }
  }
}
