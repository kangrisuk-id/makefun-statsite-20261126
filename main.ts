// Entry program for "Indonesia in Numbers", a static national statistics site.
//
// The site itself lives in app/ as plain files (HTML, CSS and ES modules, no
// build step, nothing loaded over the network). This program is the hand-in:
// it copies app/ and screenshots/ from beside itself into the output folder
// and writes dossier.json there with buildDossier from the vendored make.fun
// library, exactly the summary the judge reads.
//
// vendor/makefun-frontend.ts is the kit's library, kept byte for byte: the
// scorer rebuilds the dossier with its own copy and compares the two.
//
// Run it the way the grader does, with MAKEFUN_OUTPUT_DIR naming /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { cpSync, existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildDossier } from './vendor/makefun-frontend.ts';

const repoRoot = fileURLToPath(new URL('.', import.meta.url));
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

mkdirSync(outputDir, { recursive: true });
cpSync(join(repoRoot, 'app'), join(outputDir, 'app'), { recursive: true });

const shotsDir = join(outputDir, 'screenshots');
mkdirSync(shotsDir, { recursive: true });
const localShots = join(repoRoot, 'screenshots');
if (existsSync(localShots)) {
  cpSync(localShots, shotsDir, { recursive: true });
}

// The caps below are the scorer's own (see the kit's gate): the dossier text
// is capped, screenshots are at most 4 files of 256 KiB, and app/ is at most
// 993 entries and 16 MiB. buildDossier refuses anything past them.
const dossier = buildDossier(outputDir, {
  text_max_bytes: 163840,
  screenshots: { max: 4, max_bytes: 262144 },
  app_max_files: 993,
  app_max_bytes: 16777216,
});
writeFileSync(join(outputDir, 'dossier.json'), dossier);
