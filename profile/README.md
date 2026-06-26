# WBC-Mjlab

**One shared MDP for whole-body motion tracking on [mjlab](https://github.com/mujocolab/mjlab).**

Built on mjlab's sim + RL stack. Recent humanoid WBC work ([ZEST](https://arxiv.org/abs/2602.00401), [BeyondMimic](https://beyondmimic.github.io/), [SONIC](https://arxiv.org/abs/2511.07820), …) tends to ship as separate codebases — **wbc-mjlab** unifies that line on **one training surface**: paper-specific choices as **`--task` switches** (RSI, observations, rewards, DR). On deploy: **one policy, many motion clips** — swap at runtime, no checkpoint change.
<a href="https://youtu.be/qTVkqvrJZM0">
<img width="1762" height="1050" alt="wbc_mjlab_screen" src="https://github.com/user-attachments/assets/220a7577-de8a-4183-b963-8e3365d3e8db" />
</a>
## Repos

| Repo | Role |
|------|------|
| [**wbc-mjlab**](https://github.com/wbc-mjlab/wbc-mjlab) | Training — shared MDP, G1 tasks, GMR PKL + batch NPZ conversion, ONNX export |
| [**wbc-g1-deploy**](https://github.com/wbc-mjlab/wbc-g1-deploy) | Reference G1 runtime — one ONNX policy, clip library via `manifest.yaml` |

Upstream: [mujocolab/mjlab](https://github.com/mujocolab/mjlab) (extension, not a fork).

## One policy, many skills

The bundled deploy policy already covers **walk, jog, run, crawl, fight, get up from the floor, lie down, and flips** — selected from a clip library with the joystick.

<table>
  <tr>
    <td colspan="3" align="center">
      <b>Sim (loopback)</b><br>
      <a href="https://www.youtube.com/watch?v=CSyczObERIc">
        <img src="https://img.youtube.com/vi/CSyczObERIc/maxresdefault.jpg" width="720" />
      </a>
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
</table>

More demos coming (side flips, backflips, …). See [wbc-g1-deploy](https://github.com/wbc-mjlab/wbc-g1-deploy).

## Tasks, not forks

Each paper's knobs live in a small env builder — e.g. [G1 configs](https://github.com/wbc-mjlab/wbc-mjlab/tree/main/src/wbc_mjlab/robots/g1/configs) (`zest.py`, `binary_failure.py`, `wbc.py`). Add a module, register a `WbcTaskConfig`, same CLI and comparable runs.

Already wired from recent papers: ZEST-style rewards + RSI, BeyondMimic binary-failure sampling, EMA similarity metrics, multi-clip motion libraries, deploy-style obs export.

## Sim → real (G1)

1. Train / export in **wbc-mjlab** (`params/policy.onnx` + `params/config.yaml`)
2. Copy into **wbc-g1-deploy** `config/policy/`
3. Build and run `wbc_g1_ctrl` — [deploy README](https://github.com/wbc-mjlab/wbc-g1-deploy)

## What's next

Tech report, proper docs, SONIC-style task, CI/PyPI, and a **pluggable structure** for robots & papers as external modules/repos.

## Status & community

Early public demo — APIs and tasks will evolve. Feedback, issues, and PRs welcome on either repo.
