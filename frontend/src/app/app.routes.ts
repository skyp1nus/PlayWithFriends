import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MainMenuComponent } from './main-menu/main-menu.component';
import { GameLobbyComponent } from './game-lobby/game-lobby.component';
import { JoinLobbyComponent } from './join-lobby/join-lobby.component';
import {ChessComponent} from './games/chess/chess.component';
import {CheckersComponent} from './games/checkers/checkers.component';
import {TicTacToeComponent} from './games/tic-tac-toe/tic-tac-toe.component';

export const appRoutes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'main-menu', component: MainMenuComponent },
  { path: 'game-lobby', component: GameLobbyComponent },
  { path: 'join-lobby', component: JoinLobbyComponent },
  { path: 'tic-tac-toe', component: TicTacToeComponent },
  { path: 'checkers', component: CheckersComponent },
  { path: 'chess', component: ChessComponent },
];
