import { Component, inject } from '@angular/core';
import { AppState } from '../core/app-state';
import { CATEGORIES, SCENARIOS, colorsOfCat } from '../core/data';
import { ProgressService } from '../core/progress';
import { Icon } from './icon';

@Component({
  selector: 'app-home',
  imports: [Icon],
  templateUrl: './home.html',
})
export class Home {
  private readonly state = inject(AppState);
  private readonly progressSvc = inject(ProgressService);
  protected readonly categories = CATEGORIES;
  protected readonly colorsOf = colorsOfCat;
  protected readonly totalScenarios = SCENARIOS.length;

  get completedCount() {
    return this.progressSvc.completedCount();
  }

  get pct() {
    return Math.round((this.completedCount / this.totalScenarios) * 100) || 0;
  }

  open(catId: string) {
    this.state.navigate('list', { catId });
  }

  countOf(catId: string) {
    return SCENARIOS.filter(s => s.catId === catId).length;
  }

  completedOf(catId: string) {
    const ids = SCENARIOS.filter(s => s.catId === catId).map(s => s.id);
    return this.progressSvc.completedIn(ids);
  }
}
