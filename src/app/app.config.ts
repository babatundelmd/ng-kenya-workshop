import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
} from '@angular/core';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    // Every component here is OnPush (the default since v22) and every piece of
    // state is a signal, so
    // nothing depends on zone.js monkey-patching async APIs to trigger change
    // detection. Dropping it removes the polyfill bundle entirely.
    provideZonelessChangeDetection(),
  ],
};
