import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

// Works around https://github.com/vercel/next.js/issues/85374
//
// `next build` with `output: "export"` writes RSC segment payloads into
// nested directories (e.g. `__next.docs/$oc$slug/__PAGE__.txt`) while the
// client router requests flat, dot-separated names
// (e.g. `__next.docs.$oc$slug.__PAGE__.txt`). This script renames the
// exported files to the shape the client expects. It is a no-op when the
// export already produced flat names (e.g. on some platforms/versions).

const OUT_DIR = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
  "out",
);

async function* walkFiles(dir) {
  for (const entry of await fs.readdir(dir, { withFileTypes: true })) {
    const resolved = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      yield* walkFiles(resolved);
    } else {
      yield resolved;
    }
  }
}

async function removeEmptyDirs(dir) {
  for (const entry of await fs.readdir(dir, { withFileTypes: true })) {
    if (entry.isDirectory()) {
      await removeEmptyDirs(path.join(dir, entry.name));
    }
  }
  const remaining = await fs.readdir(dir);
  if (remaining.length === 0) {
    await fs.rmdir(dir);
  }
}

let fixed = 0;

for await (const file of walkFiles(OUT_DIR)) {
  const segments = path.relative(OUT_DIR, file).split(path.sep);
  const idx = segments.findIndex(
    (segment, position) =>
      segment.startsWith("__next.") && position < segments.length - 1,
  );
  if (idx === -1) {
    continue;
  }

  const target = path.join(
    OUT_DIR,
    ...segments.slice(0, idx),
    segments.slice(idx).join("."),
  );

  try {
    await fs.access(target);
    console.log(`already exists, skipping: ${path.relative(OUT_DIR, target)}`);
    continue;
  } catch {
    // target does not exist yet - safe to rename
  }

  await fs.mkdir(path.dirname(target), { recursive: true });
  await fs.rename(file, target);
  fixed += 1;
}

if (fixed > 0) {
  await removeEmptyDirs(OUT_DIR).catch(() => {});
}

console.log(`fix-rsc-paths: flattened ${fixed} file(s)`);
