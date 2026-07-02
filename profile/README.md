# WBC-Mjlab

**One shared MDP for whole-body motion tracking on [mjlab](https://github.com/mujocolab/mjlab).**

Built on mjlab's sim + RL stack. Recent humanoid WBC work ([ZEST](https://arxiv.org/abs/2602.00401), [BeyondMimic](https://beyondmimic.github.io/), [SONIC](https://arxiv.org/abs/2511.07820), …) tends to ship as separate codebases — **wbc-mjlab** unifies that line on **one training surface**: paper-specific choices as **`--task` switches** (RSI, observations, rewards, DR). On deploy: **one policy, many motion clips** — swap at runtime, no checkpoint change.

<a href="https://youtu.be/qTVkqvrJZM0">
<img width="1762" height="1050" alt="wbc_mjlab_screen" src="https://github.com/user-attachments/assets/220a7577-de8a-4183-b963-8e3365d3e8db" />
</a>

## Repos

| Repo | Role |
|------|------|
| [**wbc-mjlab**](https://github.com/wbc-mjlab/wbc-mjlab) | Training — shared MDP, presets, G1 tasks, GMR PKL + batch NPZ conversion, ONNX export ([PyPI](https://pypi.org/project/wbc-mjlab/)) |
| [**wbc-g1-deploy**](https://github.com/wbc-mjlab/wbc-g1-deploy) | Reference G1 runtime — one ONNX policy, clip library via `manifest.yaml` |
| [**wbc-demo**](https://github.com/wbc-mjlab/wbc-demo) | In-browser live demo — MuJoCo WASM + ONNX, deploy-aligned clip UX |

Upstream: [mujocolab/mjlab](https://github.com/mujocolab/mjlab) (extension, not a fork).

## One policy, many skills

The bundled deploy policy already covers **walk, jog, run, crawl, fight, get up from the floor, lie down, and flips** — selected from a clip library with the joystick.

<table>
  <tr>
    <td colspan="3" align="center">
      <b>Live demo (browser)</b><br>
      <a href="https://wbc-mjlab.github.io/wbc-demo/">
        <img src="assets/demo_screen.png" width="720" alt="wbc-demo — live MuJoCo + ONNX in the browser" />
      </a>
      <br>
      <sub>MuJoCo + ONNX in the browser — idle, walk, fight, get up, lie down, … (<a href="https://wbc-mjlab.github.io/wbc-demo/">wbc-demo</a>)</sub>
    </td>
  </tr>
  <tr>
    <td align="center" width="33%">
      <b>Walk</b><br>
      <video src="https://github.com/user-attachments/assets/0fb0dccc-fb4e-4c88-a8c0-50087bc46c9b" width="100%" controls></video>
    </td>
    <td align="center" width="33%">
      <b>Fight</b><br>
      <video src="https://github.com/user-attachments/assets/9384a32a-a8a2-42f9-9ff0-02bd03decf50" width="100%" controls></video>
    </td>
    <td align="center" width="33%">
      <b>Jog</b><br>
      <video src="https://github.com/user-attachments/assets/ac153760-fe59-4da2-8466-0ddd0a84bb89" width="100%" controls></video>
    </td>
  </tr>
  <tr>
    <td colspan="3" align="center">
      <b>Get up</b><br>
      <video src="assets/get_up.mp4" width="33%" controls muted></video>
    </td>
  </tr>
</table>

More demos coming (side flips, backflips, …). See [wbc-demo](https://wbc-mjlab.github.io/wbc-demo/) and [wbc-g1-deploy](https://github.com/wbc-mjlab/wbc-g1-deploy).

## Tasks, not forks

Paper knobs are **presets stacked on one MDP**, not separate codebases:

| Layer | Where | Role |
|-------|--------|------|
| **Shared MDP** | [`env/`](https://github.com/wbc-mjlab/wbc-mjlab/tree/main/src/wbc_mjlab/env) | Rewards, terminations, motion command, RSI, playback |
| **Presets** | [`presets/`](https://github.com/wbc-mjlab/wbc-mjlab/tree/main/src/wbc_mjlab/presets) | Paper recipes as functions — `apply_zest`, `apply_wbc`, `apply_binary_failure`, `apply_se_actor` |
| **Robot tasks** | [`robots/g1/tasks.py`](https://github.com/wbc-mjlab/wbc-mjlab/tree/main/src/wbc_mjlab/robots/g1/tasks.py) | Preset stacks + registered `--task` ids (`Wbc-G1`, `Wbc-G1-Zest`, …) |

**Add a paper setup:** new preset in `presets/`, wire it in `robots/<id>/tasks.py`, register a `WbcTaskConfig` — same CLI, same log layout, comparable runs. Details: [docs/TASKS.md](https://github.com/wbc-mjlab/wbc-mjlab/blob/main/docs/TASKS.md) · [CONTRIBUTING.md](https://github.com/wbc-mjlab/wbc-mjlab/blob/main/CONTRIBUTING.md).

Already wired: ZEST-style rewards + reward-aligned RSI, BeyondMimic binary-failure sampling, multi-clip motion libraries, deploy-style obs export, Viser play overlays (motion context + adaptive RSI bins).

## Sim → real (G1)

1. Train / export in **wbc-mjlab** (`params/policy.onnx` + `params/config.yaml`)
2. Copy into **wbc-g1-deploy** `config/policy/`
3. Build and run `wbc_g1_ctrl` — [deploy README](https://github.com/wbc-mjlab/wbc-g1-deploy)

## What's next

Tech report, Sphinx docs site, SONIC-style task, multi-robot registration API, and external preset modules as separate repos.

## Status & community

Public on PyPI; APIs and tasks still evolving. Feedback, issues, and PRs welcome on any repo.
