# Headless UI & Signal Composition

Workshop repo — **NG Kenya '26**, Thursday 20 August 2026, iHub Nairobi.
Angular 22.1.2, zoneless, no `zone.js`.

## The whole thing is three files

```
src/app/components/ui-toggle/ui-toggle.ts    53 lines   behaviour + state + a11y
src/app/components/ui-button/ui-button.ts    66 lines   behaviour + state + a11y
src/app/app.html  +  app.css                            everything you can see
```

Note what the two component directories **don't** contain: no `.html`, no `.css`. That is
the definition of headless, visible in `ls`. Every element and every colour on the page
comes from the consumer.

## Running it

Angular 22's CLI requires Node ≥ 22.22.3, pinned here in `.nvmrc`:

```bash
nvm use && npm install && npm run doctor
```

`npm run doctor` checks your Node version, dependencies and port, and prints the exact fix
for anything it finds. Then:

```bash
npm start
```

## The three sections

| # | What | Teaches |
|---|---|---|
| 1 | `[uiToggle]` | The minimum viable headless component. `model()`, `computed()`, `role="switch"`, one `data-state` styling hook. Rendered as a switch and as chips — one directive, two skins. |
| 2 | `[uiButton]` | Prefix icons, suffix icons and a loading state — done headlessly. The directive renders **nothing**; the consumer supplies every icon and reads the directive's state through `exportAs` to decide what "busy" looks like. 

### The line the workshop is built around

```html
<button uiButton #publish="uiButton" [loading]="publishing()" (action)="onPublish()">
  @if (publish.loading()) { <span class="spinner"></span> }
  @else { <svg class="icon">…</svg> }
</button>
```

Headless means the consumer renders — but it can only render what it can *see*. Before
signals, getting "am I busy" out of the directive and into someone else's template meant
an output, a subscription and a `markForCheck`, per relationship. That plumbing cost is
why headless UI never caught on in Angular. Now it's a read. That's the thesis.

### Two details worth knowing

**Busy is not disabled.** A loading button deliberately does *not* get the native
`disabled` attribute — that would drop it from the tab order and silently destroy focus
mid-interaction. It stays focusable, announces `aria-busy`, and refuses activation itself.

**A directive can't swallow the consumer's `(click)`.** Angular registers template
listeners before directive host listeners, so `stopImmediatePropagation` arrives too late.
`UiButton` therefore exposes a guarded `(action)` output rather than pretending. There's a
test for it.

## Measured

Production builds of this app, not estimates.

| Build | Raw | Transfer |
|---|---|---|
| Without `@angular/aria` | 120.09 kB | 35.85 kB |
| With `@angular/aria` | 155.56 kB | 44.72 kB |

**+8.9 kB over the wire** for twelve accessible interaction patterns you would otherwise
own and have to test.

## Tests

18 specs, run zoneless in real Chrome — no `zone.js/testing`.

```bash
npm test -- --watch=false --browsers=ChromeHeadless
```

They cover the things that are quiet to get wrong: keyboard activation, ARIA state, that a
loading button stays focusable, that activation is actually refused while busy, and that
neither directive contributes a single class or element of its own.
# ng-kenya-workshop
