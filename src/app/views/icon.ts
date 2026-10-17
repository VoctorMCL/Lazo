import { Component, input } from '@angular/core';

@Component({
  selector: 'app-icon',
  template: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"
      stroke-linecap="round" stroke-linejoin="round" [class]="extraClass()">@switch (name()) {
      @case ('origen') {
        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z" /><circle cx="12" cy="10" r="3" />
      }
      @case ('equipo') {
        <path d="M16 19v-1a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v1" /><circle cx="9" cy="8" r="3.5" />
        <path d="M22 19v-1a4 4 0 0 0-3-3.87" /><path d="M15 4.13a4 4 0 0 1 0 7.75" />
      }
      @case ('espacio') {
        <circle cx="12" cy="12" r="8.5" /><circle cx="12" cy="12" r="5" />
        <circle cx="12" cy="12" r="1.4" fill="currentColor" stroke="none" />
      }
      @case ('consentimiento') {
        <path d="M12 3l7 3v5.3c0 4.8-3 8.4-7 9.7-4-1.3-7-4.9-7-9.7V6l7-3z" />
      }
      @case ('opinion') {
        <rect x="3" y="5" width="18" height="12" rx="3" /><path d="M8 17l-2 3v-3" />
      }
      @case ('exclusion') {
        <circle cx="9" cy="8" r="3.5" /><path d="M2 19v-1a4 4 0 0 1 4-4h2a4 4 0 0 1 3.6 2.3" />
        <path d="M17 8l4 4M21 8l-4 4" />
      }
      @case ('ira') {
        <path
          d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
      }
      @case ('justicia') {
        <path d="M12 3v18" /><path d="M5 7h14" />
        <path d="M5 7l-3 6.3a3.4 3.4 0 0 0 6.8 0L5 7z" /><path d="M19 7l-3 6.3a3.4 3.4 0 0 0 6.8 0L19 7z" />
      }
      @case ('familiar') {
        <path d="M4 11l8-7 8 7" /><path d="M6 9.5V20h12V9.5" /><path d="M10 20v-5h4v5" />
      }
      @default {
        <path
          d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
      }
    }</svg>`,
})
export class Icon {
  readonly name = input('');
  readonly extraClass = input('');
}
