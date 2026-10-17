import { Injectable, computed, signal } from '@angular/core';
import { getProgress, saveProgress, resetProgress } from './storage';

export interface ScenarioProgress {
  completed: boolean;
  updatedAt: string;
}

export type ProgressMap = Record<string, ScenarioProgress>;

@Injectable({ providedIn: 'root' })
export class ProgressService {
  private readonly _progress = signal<ProgressMap>(getProgress());

  readonly progress = this._progress.asReadonly();
  readonly completedCount = computed(
    () => Object.values(this._progress()).filter((p) => p?.completed).length
  );

  isCompleted(scenarioId: string): boolean {
    return !!this._progress()[scenarioId]?.completed;
  }

  completedIn(scenarioIds: string[]): number {
    const p = this._progress();
    return scenarioIds.filter((id) => p[id]?.completed).length;
  }

  complete(scenarioId: string): void {
    if (this._progress()[scenarioId]?.completed) return;
    const next: ProgressMap = {
      ...this._progress(),
      [scenarioId]: { completed: true, updatedAt: new Date().toISOString() },
    };
    this._progress.set(next);
    saveProgress(next);
  }

  reset(): void {
    this._progress.set({});
    resetProgress();
  }
}
