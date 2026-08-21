import { Component, computed, signal } from '@angular/core';
import { UiToggle } from './components/ui-toggle/ui-toggle';
import { UiButton } from './components/ui-button/ui-button';

@Component({
  selector: 'app-root',
  imports: [UiToggle, UiButton],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class AppComponent {
  // --- 1. Toggle -------------------------------------------------------------
  protected readonly darkMode = signal(true);
  protected readonly notifications = signal(false);
  protected readonly analytics = signal(false);

  /**
   * Signal composition: derived from three sources, never assigned. Flip any
   * toggle and this is already correct — no subscription, no sync code.
   */
  protected readonly enabledCount = computed(
    () => [this.darkMode(), this.notifications(), this.analytics()].filter(Boolean).length,
  );

  // --- 2. Button -------------------------------------------------------------
  protected readonly publishing = signal(false);
  protected readonly published = signal(0);

  protected onClicked(): void {
    console.log('clicked');
  }

  protected onPublish(): void {
    this.publishing.set(true);
    setTimeout(() => {
      this.publishing.set(false);
      this.published.update((n) => n + 1);
    }, 1600);
  }

  protected readonly alignment = signal<string[]>(['left']);
}
