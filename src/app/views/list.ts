import { Component, inject } from '@angular/core';
import { AppState } from '../core/app-state';
import { catOf, SCENARIOS, colorsOf } from '../core/data';
import { ProgressService } from '../core/progress';
import { Icon } from './icon';

@Component({
  selector: 'app-list',
  imports: [Icon],
  templateUrl: './list.html',
})
export class List {
  private readonly state = inject(AppState);
  private readonly progressSvc = inject(ProgressService);

  get cat() {
    return catOf(this.state.selectedCatId());
  }

  get colors() {
    return colorsOf(this.state.selectedCatId());
  }

  get scenarios() {
    return SCENARIOS.filter(s => s.catId === this.state.selectedCatId());
  }

  backHome() {
    this.state.navigate('home');
  }

  startChat(scenarioId: string) {
    this.state.navigate('chat', { scenarioId });
  }

  completed(scId: string) {
    return this.progressSvc.isCompleted(scId);
  }

  repeatScenario(scId: string) {
    const confirmed = window.confirm(
      '¿Deseas repetir esta situación? Se reiniciará el diálogo y la retroalimentación de esta situación para que puedas practicar de nuevo.'
    );
    if (!confirmed) return;
    this.progressSvc.resetScenario(scId);
    this.state.navigate('chat', { scenarioId: scId });
  }
}
