import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';

@Injectable({
  providedIn: 'root'
})
export class SignalrService {
  private hubConnection: signalR.HubConnection;

  constructor() {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('http://localhost:5000/lobbyHub') // URL для хабу
      .build();
  }

  startConnection(callback?: () => void) {
    if (this.hubConnection.state === signalR.HubConnectionState.Disconnected) {
      this.hubConnection
        .start()
        .then(() => {
          console.log('SignalR Connected');
          if (callback) {
            callback();
          }
        })
        .catch(err => console.error('Error while starting connection: ', err));
    } else {
      console.warn('З\'єднання вже встановлено або знаходиться в стані:', this.hubConnection.state);
      if (callback) {
        callback();
      }
    }
  }

  createLobby(lobbyId: string, gameName: string) {
    this.hubConnection.invoke('CreateLobby', lobbyId, gameName)
      .catch(err => console.error(err));
  }

  joinLobby(lobbyId: string, callback: (gameName: string) => void) {
    this.hubConnection.invoke('JoinLobby', lobbyId)
      .catch(err => console.error(err));

    this.hubConnection.on('PlayerJoined', (_, gameName) => {
      callback(gameName);
    });

    this.hubConnection.on('LobbyNotFound', (lobbyId) => {
      console.error(`Лобі з кодом "${lobbyId}" не знайдено.`);
    });
  }

  sendMove(lobbyId: string, moveData: string) {
    this.hubConnection.invoke('SendMove', lobbyId, moveData)
      .catch(err => console.error(err));
  }

  onReceiveMove(callback: (moveData: string) => void) {
    this.hubConnection.on('ReceiveMove', callback);
  }
}
