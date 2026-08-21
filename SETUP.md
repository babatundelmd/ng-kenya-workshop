# Setup — do this BEFORE the workshop

**Zero-Bloat Angular: Headless UI & Signal Composition**
NG Kenya '26 · Thursday 20 August · iHub Nairobi

Please complete this **before you arrive**. It takes about ten minutes on a good
connection, and it will not be fun to do on conference wifi with 40 other people.

---

## 1. Node 22.22.3 or newer

This is the one that catches people. Angular 22's CLI **refuses to run** on older
Node — including Node 22.18, which is recent enough to look fine.

Check what you have:

```bash
node -v
```

If it is below **v22.22.3** (or you are on v20, or v24 below 24.15), install a newer one.

Using [nvm](https://github.com/nvm-sh/nvm) — recommended, lets you keep your other versions:

```bash
nvm install 22.23.2
```

Otherwise, install Node 22 LTS from [nodejs.org](https://nodejs.org).

## 2. Clone and install

```bash
git clone <REPO-URL> zero-bloat-angular
cd zero-bloat-angular
nvm use          # if you use nvm — picks up the version from .nvmrc
npm install
```

## 3. Verify — this is the important step

```bash
npm run doctor
```

You should see four green `PASS` lines. If anything says `FAIL`, the exact fix is
printed underneath it. **Do not skip this.** If it passes on your machine at home,
your morning is going to go well.

Then confirm the app actually runs:

```bash
npm start
```

Open http://localhost:4200 — you should see a dark page titled
*Headless UI & Signal Composition* with three sections. Stop it with `Ctrl+C`.

---

## If you get stuck

Bring your laptop anyway and arrive 15 minutes early — we will sort it out before
we start. Please do not silently skip setup and hope; you will spend the workshop
watching instead of building, which is the one thing I would like to avoid.

If `npm run doctor` fails in a way the printed fix does not solve, send me the full
output beforehand and we will fix it over chat.

## What to bring

- Laptop + charger
- Your own editor, set up how you like it
- Headphones are fine; this is hands-on, not lecture

## Assumed knowledge

You should be comfortable with Angular components and templates. You do **not**
need prior experience with signals, `@angular/aria`, or Signal Forms — that is
what we are here for. If you have never written an Angular component, this
workshop will move too fast to enjoy.
