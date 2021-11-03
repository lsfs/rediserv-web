import { Injectable } from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {Mensagem} from '../models/component-message.model';

@Injectable({
  providedIn: 'root'
})
export class ComponentMessageService {


  private messages: any = {};

  constructor() {

  }

  sendMessage(message: any, to: string): void {
    this.messages[to] = message;
  }

  clearMessages(to: string): void {
    this.messages[to] = '';
  }

  getMessage(to): any {
    return this.messages[to];
  }


}
