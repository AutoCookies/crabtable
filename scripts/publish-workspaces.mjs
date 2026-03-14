#!/usr/bin/env node
/**
 * Publish all workspaces that have publishConfig (replacement for pnpm publish -r).
 * Usage: node scripts/publish-workspaces.mjs [--access public] [--tag xxx]
 */
import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');

const workspaces = [
  'packages/core', 'packages/design', 'packages/docs', 'packages/docs-drawing', 'packages/docs-drawing-ui',
  'packages/docs-hyper-link', 'packages/docs-hyper-link-ui', 'packages/docs-mention-ui', 'packages/docs-quick-insert-ui',
  'packages/docs-thread-comment-ui', 'packages/docs-ui', 'packages/drawing', 'packages/drawing-ui', 'packages/engine-formula',
  'packages/engine-render', 'packages/find-replace', 'packages/network', 'packages/rpc', 'packages/rpc-node',
  'packages/sheets', 'packages/sheets-conditional-formatting', 'packages/sheets-conditional-formatting-ui',
  'packages/sheets-crosshair-highlight', 'packages/sheets-data-validation', 'packages/sheets-data-validation-ui',
  'packages/sheets-drawing', 'packages/sheets-drawing-ui', 'packages/sheets-filter', 'packages/sheets-filter-ui',
  'packages/sheets-find-replace', 'packages/sheets-formula', 'packages/sheets-formula-ui', 'packages/sheets-graphics',
  'packages/sheets-hyper-link', 'packages/sheets-hyper-link-ui', 'packages/sheets-note', 'packages/sheets-note-ui',
  'packages/sheets-numfmt', 'packages/sheets-numfmt-ui', 'packages/sheets-sort', 'packages/sheets-sort-ui',
  'packages/sheets-table', 'packages/sheets-table-ui', 'packages/sheets-thread-comment', 'packages/sheets-thread-comment-ui',
  'packages/sheets-ui', 'packages/sheets-zen-editor', 'packages/slides', 'packages/slides-ui', 'packages/telemetry',
  'packages/themes', 'packages/thread-comment', 'packages/thread-comment-ui', 'packages/ui', 'packages/ui-adapter-vue3',
  'packages/ui-adapter-web-component', 'packages/uniscript', 'packages/watermark', 'packages/data-validation',
  'packages/action-recorder',
];

const args = process.argv.slice(2);
const publishArgs = ['publish', '--no-git-checks', ...args].join(' ');

for (const ws of workspaces) {
  const dir = path.join(root, ws);
  const pkgPath = path.join(dir, 'package.json');
  if (!fs.existsSync(pkgPath)) continue;
  const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
  if (pkg.private || !pkg.publishConfig) continue;
  try {
    execSync(`npm ${publishArgs}`, { cwd: dir, stdio: 'inherit' });
  } catch (_err) {
    process.exitCode = 1;
  }
}
