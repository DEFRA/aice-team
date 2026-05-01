# AICE Copilot CLI Plugins

Copilot CLI plugins for the Defra AI Capabilities and Enablement (AICE) team. Plugins are grouped by language and provide skills (coding conventions) and agents (specialised assistants).

## Marketplace

This repository is a Copilot CLI plugin marketplace. Register it once:

```sh
copilot plugin marketplace add DEFRA/aice-team
```

Then install individual plugins as needed:

```sh
# Python: style guide skill + python-writer and python-reviewer agents
copilot plugin install aice-python@defra-aice

# JavaScript: style guide skill
copilot plugin install aice-javascript@defra-aice

# GitHub Actions: style guide skill
copilot plugin install aice-github-actions@defra-aice
```

## Plugins

| Plugin | Skills | Agents |
|--------|--------|--------|
| [`python/`](python/) | `python-style-guide` | `python-writer`, `python-reviewer` |
| [`javascript/`](javascript/) | `javascript-style-guide` | — |
| [`github-actions/`](github-actions/) | `github-actions-style-guide` | — |

## Structure

Each plugin follows the standard Copilot CLI plugin layout:

```
plugins/<language>/
├── plugin.json                    # Plugin manifest
├── agents/                        # Agent definitions (*.agent.md)
├── skills/
│   └── <skill-name>/
│       └── SKILL.md               # Skill instructions
└── resources/                     # Supporting files referenced by agents
```

## Keeping style guides in sync

The style guide source of truth lives in [`style-guides/`](../style-guides/). Each plugin carries a **copy** under `plugins/<language>/resources/` so that the plugin works correctly when installed remotely (where the rest of the repo is unavailable).

Sync is automated:

- **On merge to `main`**: the [`sync-style-guides`](../.github/workflows/sync-style-guides.yml) workflow copies each style guide into its plugin resources folder and commits the result.
- **On pull request**: the [`check-style-guide-sync`](../.github/workflows/check-style-guide-sync.yml) workflow fails if `plugins/<language>/resources/` is out of date with `style-guides/`.

To update a style guide, edit the file in `style-guides/` — the plugin resources will be updated automatically on merge. Do **not** edit the copies in `plugins/*/resources/` directly.

> **Why not symlinks?** Symlinks work locally but break when a plugin is installed from a remote repository (`copilot plugin install OWNER/REPO:path`), because the symlink target does not exist in the installed copy.



To add a new plugin or update an existing one:

1. Create or update the plugin directory under `plugins/`
2. Update `.github/plugin/marketplace.json` to include/update the plugin entry
3. Follow the [Copilot CLI plugin reference](https://docs.github.com/en/copilot/reference/cli-plugin-reference) for manifest fields

To update a skill after a style guide change, edit the corresponding `SKILL.md` to reflect the new rules, keeping it consistent with the source style guide in `style-guides/`.
