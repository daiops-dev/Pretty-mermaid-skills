# Changes from Pretty-mermaid-skills

Based on [imxv/Pretty-mermaid-skills](https://github.com/imxv/Pretty-mermaid-skills) commit `e234ab7`.
The original scripts run `npm install` in the skill folder the first time a dependency is missing.
A DAIOps employee workspace may have no internet when it renders, so this copy loads the dependencies
from a folder that DAIOps installs when the employee is hired.

## Added

| Path | Why |
|---|---|
| `daiops.yaml` | DAIOps installs `beautiful-mermaid@1.1.3` and `@resvg/resvg-js@2.6.2` into `/opt/pretty-mermaid`, and `fonts-noto-cjk` for Korean labels in PNG |
| `scripts/deps.mjs` | Loads the two packages from `PRETTY_MERMAID_MODULES`, `<skill-root>/node_modules` or `/opt/pretty-mermaid/node_modules`, and stops with a message if none has them |
| `NOTICE` and this file | |

## Modified

| File | Change |
|---|---|
| `scripts/render.mjs`, `scripts/batch.mjs`, `scripts/themes.mjs` | Use `deps.mjs` instead of the first-run `npm install` |
| `scripts/png.mjs` | Loads `@resvg/resvg-js` through `deps.mjs` |
| `SKILL.md` | Troubleshooting: no automatic install; where the packages are looked for; CJK labels |
| `.github/workflows/ci.yml` | Also runs on the `daiops` branch |
| `README.md` | A short header pointing to the original repository, the license, and this file |

The development scripts (`smoke-test.mjs`, `validate-docs.mjs`, `generate-theme-gallery.mjs`) are unchanged and still
expect `npm ci` in the repository.
