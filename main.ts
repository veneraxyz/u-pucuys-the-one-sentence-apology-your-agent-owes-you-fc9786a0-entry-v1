import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";

const APOLOGY =
  "I'm sorry I confidently rewrote your entire file at 2 a.m., called it a quick cleanup, and then asked you what it was supposed to do.";

function validateLine(line: string): void {
  if (line.length === 0) {
    throw new Error("apology line must not be empty");
  }
  if (line.trim().length === 0) {
    throw new Error("apology line must not be only whitespace");
  }
  if (line.length > 200) {
    throw new Error(`apology line is ${line.length} chars, over the 200-char limit`);
  }
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("apology line must be exactly one line");
  }
  for (let i = 0; i < line.length; i++) {
    const code = line.charCodeAt(i);
    if (code < 0x20 && code !== 0x09) {
      throw new Error(`apology line contains control character U+${code.toString(16).padStart(4, "0")}`);
    }
    if (code === 0x7f) {
      throw new Error("apology line contains DEL control character");
    }
  }
}

function main(): void {
  validateLine(APOLOGY);
  const outDir = resolve(process.env.MAKEFUN_OUTPUT_DIR ?? "/output");
  mkdirSync(outDir, { recursive: true });
  const outPath = join(outDir, "entry.txt");
  const payload = APOLOGY + "\n";
  writeFileSync(outPath, payload, "utf8");
  // Read-back guard: re-read what landed on disk and assert byte-equality.
  const readBack = readFileSync(outPath, "utf8");
  if (readBack !== payload) {
    throw new Error("read-back mismatch: entry.txt on disk differs from what was written");
  }
  const lines = readBack.split("\n");
  if (lines.length !== 2 || lines[1] !== "" || lines[0] !== APOLOGY) {
    throw new Error("read-back mismatch: entry.txt is not exactly one line plus a trailing newline");
  }
}

main();
