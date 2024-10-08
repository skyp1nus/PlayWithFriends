import { Component } from '@angular/core';

@Component({
  selector: 'app-game-interface',
  standalone: true,
  templateUrl: './game-interface.component.html',
  styleUrls: ['./game-interface.component.scss']
})
export class GameInterfaceComponent {
  game = history.state.game;

  constructor() {}
}
