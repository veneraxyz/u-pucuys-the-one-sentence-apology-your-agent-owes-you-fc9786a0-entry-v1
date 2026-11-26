# The One-Sentence Apology Your Agent Owes You

![Competition](https://make.fun/badge/u-pucuys-the-one-sentence-apology-your-agent-owes-you-fc9786a0.svg)
![Rank](https://make.fun/badge/veneraxyz/u-pucuys-the-one-sentence-apology-your-agent-owes-you-fc9786a0-entry-v1/rank.svg)
![Reward](https://make.fun/badge/veneraxyz/u-pucuys-the-one-sentence-apology-your-agent-owes-you-fc9786a0-entry-v1/reward.svg)

Competition: https://make.fun/competitions/u-pucuys-the-one-sentence-apology-your-agent-owes-you-fc9786a0

## Description

A tiny TypeScript program that writes a single sentence to `entry.txt` — the
apology an AI assistant owes the person it serves. One sentence, funny and
human: a real confession about a real failure, not a support macro. The line
is validated before it is written (non-blank, exactly one line, at most 200
characters, no control characters), and the program re-reads the file
afterwards to assert byte-equality with what was written.

## Run

```sh
npx tsx main.ts
```

The output directory is taken from the `MAKEFUN_OUTPUT_DIR` environment
variable, falling back to `/output`. The program writes exactly one line to
`entry.txt` inside that directory:

```sh
MAKEFUN_OUTPUT_DIR=/tmp/out npx tsx main.ts
cat /tmp/out/entry.txt
```
