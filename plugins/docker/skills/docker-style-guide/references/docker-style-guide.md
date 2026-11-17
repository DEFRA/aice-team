---
layout: default
title: Docker Style Guide
---

# Docker Style Guide

This page outlines the style guide / conventions for Dockerfiles and Docker Compose files within the Defra AICE team.

## Table of Contents

- [1 Docker Project Rules](#1-docker-project-rules)
  - [1.1 Base Images](#11-base-images)
    - [1.1.1 Pin Base Images to an Exact Tag](#111-pin-base-images-to-an-exact-tag)
    - [1.1.2 Declare Images Directly in `FROM`](#112-declare-images-directly-in-from)
    - [1.1.3 Multi-stage Builds](#113-multi-stage-builds)
  - [1.2 Docker Compose](#12-docker-compose)
  - [1.3 Finding a Digest](#13-finding-a-digest)
  - [1.4 Dependabot](#14-dependabot)
  - [1.5 Enforcing the Rules in CI](#15-enforcing-the-rules-in-ci)
- [Contributions](#contributions)

## 1 Docker Project Rules

### 1.1 Base Images

#### 1.1.1 Pin Base Images to an Exact Tag

Every base image in a `Dockerfile` must be pinned to an exact version tag. Do not use `latest`, or a tag that floats across versions (such as `python:3` or `node:24`).

We do **not** require a `sha256` digest on `Dockerfile` base images. Our base images are the Defra-owned `defradigital/*` images, which are published from protected pipelines (OIDC) and are treated as trusted, so the extra protection a digest gives is small compared with the noise it adds. Docker Compose images are different: they are third-party images, so they are pinned by digest ([1.2](#12-docker-compose)).

Do this:

```dockerfile
FROM defradigital/python-development:2.10.0-python3.14.10 AS base
```

Not this:

```dockerfile
# No tag — floats to whatever is latest
FROM defradigital/python-development

# Floating tag — changes under you
FROM defradigital/python-development:2
```

A digest may still be added (`image:tag@sha256:<digest>`) where a project wants it, for example for a non-Defra base image. Dependabot updates the tag and digest together in that form.

#### 1.1.2 Declare Images Directly in `FROM`

The image reference must appear literally on the `FROM` line. Do not pass the image, tag or digest in through a build argument (`ARG`).

Dependabot parses `FROM` lines to find base images. It does not resolve `ARG` substitution, so an image that is built up from `${BASE_IMAGE}` or `${BASE_VERSION}` is invisible to it and will never receive update pull requests. Using an `ARG` also hides what the image is from anyone reading the file, and from scanners.

Do this:

```dockerfile
FROM defradigital/node-development:2.9.0-node24.11.0 AS base
```

Not this:

```dockerfile
ARG BASE_VERSION=2.9.0-node24.11.0
FROM defradigital/node-development:${BASE_VERSION} AS base
```

`ARG` remains fine for values that are not image references, such as `PORT` and `PORT_DEBUG`.

#### 1.1.3 Multi-stage Builds

Where a `Dockerfile` has several stages (for example `development` and `production`) that start from the same external image, reference that image once in a shared `base` stage and build the other stages from it. This gives a single reference to maintain and a single line for Dependabot to update, so the stages cannot drift apart.

```dockerfile
FROM defradigital/python-development:2.10.0-python3.14.10 AS base

FROM base AS development
# ...

FROM base AS production
# ...
```

### 1.2 Docker Compose

Every image in `compose.yml` (and any override files) must be pinned to an exact version tag **and** its `sha256` digest, in the form `image:tag@sha256:<digest>`. Compose is where we pull third-party images (databases, caches, local AWS emulators), and tags are mutable: whoever controls a repository can repoint `7.0.28` at different content at any time. A digest identifies exactly one image, so a compromised or accidentally republished tag cannot reach us unnoticed.

Keep the tag in the reference alongside the digest. Docker uses only the digest when pulling, but Dependabot reads the tag to work out what the newest version is, and a human reading the file can see which version it is.

```yaml
services:
  mongodb:
    image: mongo:7.0.28@sha256:<digest>
  redis:
    image: redis:7.2.3-alpine3.18@sha256:<digest>
```

Avoid digest-only references with the version in a trailing comment (`image@sha256:<digest> # 7.0.28`). The comment is not understood by Dependabot, so it cannot tell which version you are on.

Services that are built locally (`build:`) take their base image from the `Dockerfile` and are covered by [1.1](#11-base-images).

### 1.3 Finding a Digest

Use the digest of the multi-architecture manifest list (the one the tag points at), not of a single platform's image, so the pin works on both developer machines (arm64) and CI/CDP (amd64):

```sh
docker buildx imagetools inspect mongo:7.0.28
```

The `Digest:` at the top of the output is the value to use. Once the first pin is in place, Dependabot proposes later bumps itself, so this is only needed when adding a new Compose image.

### 1.4 Dependabot

Dependabot has separate ecosystems for Dockerfiles and Compose files, and both must be configured in `.github/dependabot.yml`. Dependabot updates the tag and digest of a Compose image together when the reference is in the `image:tag@sha256:<digest>` form.

```yaml
version: 2

updates:
  # Update Dockerfile base images
  - package-ecosystem: docker
    directory: /

    # Wait 7 days after release before raising an update
    cooldown:
      default-days: 7

    # Group all base image updates into one PR per run
    groups:
      docker:
        patterns:
          - '*'

    # Schedule run every Monday, local time
    schedule:
      interval: weekly
      time: '10:30'
      timezone: 'Europe/London'

  # Update Docker Compose images
  - package-ecosystem: docker-compose
    directory: /

    cooldown:
      default-days: 7

    groups:
      docker-compose:
        patterns:
          - '*'

    schedule:
      interval: weekly
      time: '10:30'
      timezone: 'Europe/London'
```

> [!NOTE]
> **Use PR groups for every ecosystem entry.** Each `groups` entry bundles all routine updates into a single PR per Dependabot run, so you get one pull request instead of one per dependency. Grouping keeps multiple dependency upgrades to a single PR and a single image rebuild.

The `cooldown` mirrors the rule we apply to language dependencies in the [Python](./python.md#141-dependency-updates) and [JavaScript](./javascript.md#141-dependency-updates) style guides: do not take a release until it has been public for at least a week.

If a project keeps Dockerfiles or Compose files outside the repository root, list each location with `directories` instead of `directory`. After setting this up, confirm Dependabot actually opens (or lists as up to date) each file under **Insights → Dependency graph → Dependabot**; an unparsed file fails silently.

See [Python](./python.md#141-dependency-updates), [JavaScript](./javascript.md#141-dependency-updates) and [GitHub Actions](./github-actions.md#13-third-party-actions) for the `uv`, `npm` and `github-actions` ecosystem entries that sit alongside these in the same file.

### 1.5 Enforcing the Rules in CI

Add checks to the existing `scripts/check-unpinned-dependencies.sh` (see the [GitHub Actions style guide](./github-actions.md#143-unpinned-dependency-check)) so the rules above are enforced rather than relying on review. As a minimum it should fail when:

- a `FROM` line (other than `FROM scratch` or `FROM <earlier stage>`) has no tag, or uses `latest`;
- a `FROM` line contains `${`, i.e. the image is built from an `ARG`;
- an `image:` line in a Compose file has no `@sha256:` digest.

## Contributions

If you would like to contribute to this style guide, please open a pull request on the [Defra AICE Team GitHub](https://github.com/DEFRA/aice-team) repository.
