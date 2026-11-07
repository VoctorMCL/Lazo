import { Injectable, computed, signal } from '@angular/core';
import { getProgress, saveProgress, resetProgress } from './storage';

export interface ChatMessage {
  sender: 'character' | 'user' | 'feedback';
  text: string;
}

export interface ScenarioProgress {
  completed: boolean;
  updatedAt: string;
  feedback?: string;
  messages?: ChatMessage[];
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

  getScenarioProgress(scenarioId: string): ScenarioProgress | undefined {
    return this._progress()[scenarioId];
  }

  completedIn(scenarioIds: string[]): number {
    const p = this._progress();
    return scenarioIds.filter((id) => p[id]?.completed).length;
  }

  complete(scenarioId: string, feedback?: string, messages?: ChatMessage[]): void {
    const next: ProgressMap = {
      ...this._progress(),
      [scenarioId]: {
        completed: true,
        updatedAt: new Date().toISOString(),
        feedback,
        messages,
      },
    };
    this._progress.set(next);
    saveProgress(next);
  }

  resetScenario(scenarioId: string): void {
    const current = { ...this._progress() };
    delete current[scenarioId];
    this._progress.set(current);
    saveProgress(current);
  }

  reset(): void {
    this._progress.set({});
    resetProgress();
  }
}
