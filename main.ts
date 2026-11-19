// Entry for make.fun's "Post a GTA 6 meme on X" bounty (gta6-meme-x-01).
// Node 22, standard library only.
//
// The entry is the X post itself: an AI agent made a GTA 6 "WANTED" poster meme
// starring make.fun's ghost mascot, and it was posted on X from a public
// account with make.fun and the entrant's play code in the post's text.
// This program's only job is to hand the house the post's address: it copies
// POST.json from the repository root into the output directory, where the
// gate reads it and fetches the post from X (first picture, then text) for
// the judge.
//
// Run the way the grader does:
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts
//
// No network, no wall clock, no files outside the repository: the two runs
// of an entry write the same bytes. If the copy fails, exit 1 with an error.

import { copyFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';

const botDir = process.env.MAKEFUN_BOT_DIR ?? '/bot';
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

const source = join(botDir, 'POST.json');
const target = join(outputDir, 'POST.json');

mkdirSync(outputDir, { recursive: true });

try {
  copyFileSync(source, target);
} catch (error) {
  console.error(
    `Failed to copy POST.json from ${source} to ${target}: ${
      error instanceof Error ? error.message : String(error)
    }`,
  );
  process.exit(1);
}
