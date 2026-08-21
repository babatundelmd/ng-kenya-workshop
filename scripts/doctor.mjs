// Deliberately plain ES2020 with no dependencies: this script must run even on
// the old Node versions it exists to diagnose.
import { existsSync, readFileSync } from 'node:fs';
import { createServer } from 'node:net';

const MIN = [
  [22, 22, 3],
  [24, 15, 0],
  [26, 0, 0],
];

const g = (s) => `\x1b[32m${s}\x1b[0m`;
const r = (s) => `\x1b[31m${s}\x1b[0m`;
const y = (s) => `\x1b[33m${s}\x1b[0m`;
const dim = (s) => `\x1b[90m${s}\x1b[0m`;

let failed = 0;
const ok = (label, detail) => console.log(`  ${g('PASS')}  ${label}${detail ? dim('  ' + detail) : ''}`);
const bad = (label, detail, fix) => {
  failed++;
  console.log(`  ${r('FAIL')}  ${label}${detail ? dim('  ' + detail) : ''}`);
  if (fix) fix.split('\n').forEach((l) => console.log(`         ${y(l)}`));
};

console.log('\n  Zero-Bloat Angular workshop — environment check\n');

// --- Node ---
const cur = process.versions.node.split('.').map(Number);
const satisfied = MIN.some(([mj, mn, pt]) => {
  if (cur[0] !== mj) return false;
  return cur[1] > mn || (cur[1] === mn && cur[2] >= pt);
}) || cur[0] > 26;

if (satisfied) {
  ok('Node', `v${process.versions.node}`);
} else {
  bad(
    'Node',
    `v${process.versions.node} — Angular 22 needs v22.22.3+, v24.15+, or v26+`,
    'If you use nvm (recommended):\n  nvm install 22.23.2 && nvm use\nOtherwise install Node 22 LTS from https://nodejs.org',
  );
}

// --- dependencies ---
if (existsSync('node_modules/@angular/core/package.json')) {
  const v = JSON.parse(readFileSync('node_modules/@angular/core/package.json', 'utf8')).version;
  ok('Angular', `v${v}`);
} else {
  bad('Dependencies', 'node_modules is missing or incomplete', 'npm install');
}

if (existsSync('node_modules/@angular/aria/package.json')) {
  ok('@angular/aria', 'installed');
} else {
  bad('@angular/aria', 'not installed', 'npm install');
}

// --- port ---
const port = 4200;
await new Promise((resolve) => {
  const srv = createServer();
  srv.once('error', () => {
    bad(
      `Port ${port}`,
      'already in use',
      `Free it, or serve elsewhere:\n  npm start -- --port 4300`,
    );
    resolve();
  });
  srv.once('listening', () => srv.close(() => { ok(`Port ${port}`, 'free'); resolve(); }));
  srv.listen(port, '127.0.0.1');
});

console.log('');
if (failed === 0) {
  console.log(`  ${g('You are ready.')} Run:  npm start\n`);
} else {
  console.log(`  ${r(`${failed} problem${failed > 1 ? 's' : ''} to fix.`)} Apply the steps above, then re-run:  npm run doctor\n`);
  process.exitCode = 1;
}
