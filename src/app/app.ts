import { Component, inject } from '@angular/core';
import { AppState } from './core/app-state';
import { Home } from './views/home';
import { List } from './views/list';
import { Chat } from './views/chat';
import { Chatbot } from './chatbot/chatbot';
import { Particles } from './background/particles';
import { Roots } from './background/roots';

@Component({
  selector: 'app-root',
  imports: [Home, List, Chat, Chatbot, Particles, Roots],
  templateUrl: './app.html',
})
export class App {
  protected readonly state = inject(AppState);
}
