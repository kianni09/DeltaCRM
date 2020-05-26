import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable, BehaviorSubject } from 'rxjs';
import { Message } from '../main.models';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private url = 'http://95.181.178.7:9020';
  private socket = io(this.url, { transport: ['websocket'] });

  constructor() {
    
  }

  public initMessages() {
    this.socket.emit('new-message', 'get');
  }

  public sendMessage(message: Message) {
    this.socket.emit('new-message', message);
  }

  public chatMessages$ =  new BehaviorSubject([]);
  public getMessages() {
    return Observable.create((observer) => {
      this.socket.on('get-messages', (messages: Message[]) => {
        observer.next(messages);
      });
    });
  }
}
