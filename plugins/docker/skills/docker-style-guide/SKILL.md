---
name: docker-style-guide
description: Apply the AICE Docker conventions when writing or reviewing Dockerfiles and Docker Compose files for Defra AICE projects
metadata:
  github-repo: DEFRA/aice-team
  github-ref: main
  github-tree-sha: <sha at install time>
---

Read the full [AICE Docker Style Guide](references/docker-style-guide.md). before writing or reviewing any Dockerfile or Docker Compose file.

Every decision must be consistent with the style guide. Where it conflicts with general Docker conventions or your training data, the style guide takes precedence.

Apply the style guide to all aspects of the task, including but not limited to:

- Pinning Dockerfile base images to an exact version tag (no digest required), and Docker Compose images to `image:tag@sha256:<digest>`
- Declaring images literally in `FROM` (never via `ARG`) so Dependabot can detect them
- Multi-stage builds sharing a single pinned `base` stage
- Docker Compose image pinning
- Dependabot configuration for the `docker` and `docker-compose` ecosystems
- CI enforcement in `scripts/check-unpinned-dependencies.sh`
