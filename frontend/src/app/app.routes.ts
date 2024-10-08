import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MainMenuComponent } from './main-menu/main-menu.component';
import { GameLobbyComponent } from './game-lobby/game-lobby.component';
import { GameInterfaceComponent } from './game-interface/game-interface.component';
import { JoinLobbyComponent } from './join-lobby/join-lobby.component';

export const appRoutes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'main-menu', component: MainMenuComponent },
  { path: 'game-lobby', component: GameLobbyComponent },
  { path: 'join-lobby', component: JoinLobbyComponent },
  { path: 'game-interface', component: GameInterfaceComponent },
];
