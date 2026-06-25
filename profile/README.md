# WBC-Mjlab

**One shared MDP for whole-body motion tracking on [mjlab](https://github.com/mujocolab/mjlab).**

Recent humanoid WBC work ([ZEST](https://arxiv.org/abs/2602.00401), [BeyondMimic](https://beyondmimic.github.io/), [SONIC](https://arxiv.org/abs/2511.07820), …) ships as separate stacks. **wbc-mjlab** unifies that line on one training surface: paper-specific choices as **`--task` switches** (RSI, observations, rewards, DR). Export ONNX + `config.yaml` for optional G1 deploy.

## Repos

| Repo | Role |
|------|------|
| [**wbc-mjlab**](https://github.com/wbc-mjlab/wbc-mjlab) | Training library — shared MDP, G1 tasks, motion conversion, export |
| [**wbc-g1-deploy**](https://github.com/wbc-mjlab/wbc-g1-deploy) | Reference G1 runtime — one ONNX policy, swap motion clips at runtime |

Simulation stack: [mujocolab/mjlab](https://github.com/mujocolab/mjlab) (extension, not a fork).

## Quick start (sim)

```bash
git clone https://github.com/wbc-mjlab/wbc-mjlab.git && cd wbc-mjlab
uv run wbc-mjlab-data-to-npz --robot g1 --dataset samples
uv run wbc-mjlab-train --task Wbc-G1 --dataset samples
```

Bundled [sample clips](https://github.com/wbc-mjlab/wbc-mjlab/blob/main/data/g1/samples/README.md) (13 CSVs) — no full dataset download required.

## Sim → real (G1)

1. Train and export in **wbc-mjlab** (`params/policy.onnx` + `params/config.yaml`)
2. Copy into **wbc-g1-deploy** `config/policy/`
3. Build and run `wbc_g1_ctrl` — see [deploy README](https://github.com/wbc-mjlab/wbc-g1-deploy)

## Status

Early public demo / reference implementation. APIs and tasks will evolve — see each repo’s [roadmap](https://github.com/wbc-mjlab/wbc-mjlab/blob/main/docs/ROADMAP.md) and issues.
