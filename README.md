# AI Capabilities and Enablement (AICE) Team
This repository contains documentation for the Defra AI Capabilities and Enablement (AICE) Team.

[![Page Deploy](https://github.com/DEFRA/aice-team/actions/workflows/deploy.yml/badge.svg?event=deployment_status)](https://github.com/DEFRA/aice-team/actions/workflows/deploy.yml)

## Viewing the Documentation

The guide is best viewed in GitHub pages at [https://defra.github.io/aice-team/](https://defra.github.io/aice-team/).

## Updating the Documentation

This documentation is written in markdown and is built using [Jekyll](https://jekyllrb.com/).

## Updating the Documentation Locally
To update the documentation locally, you will need to ensure the following pre-requisites are met and then follow the steps to build and serve the documentation.

### Pre-requisites
- [Ruby](https://www.ruby-lang.org/en/documentation/installation/) (version 2.7 or later) - We recommend using a version manager like [rbenv](https://github.com/rbenv/rbenv) and [ruby-build](https://github.com/rbenv/ruby-build) to install Ruby.
- [Bundler](https://bundler.io/) - Install it with `gem install bundler`.

### Building the Documentation
To build and update the documentation, follow these steps:

Clone the repository:
```bash
git clone https://github.com/DEFRA/aice-team
```

Navigate to the repository directory:
```bash
cd aice-team/documentation
```

Install the required gems:
```bash
bundle install
```

Build the site:
```bash
bundle exec jekyll build
```

Serve the site locally to preview changes:
```bash
bundle exec jekyll serve
```

Open your web browser and navigate to `http://localhost:4000/aice-team` to view the documentation.

### Running the Tech Radar
The Tech Radar vizualisation is generated as part of the Deployment GitHub Action workflow. However, to generate it locally, you can follow the steps below:

Navigate to the tech-radar directory:
```bash
cd aice-team/tech-radar
```

Install the required dependencies:
```bash
npm install
```

Generate the tech radar:
```bash
npm run generate
```

This will create PNG and SVG versions of the tech radar in the `dist/` directory. The generated files can be copied into the `documentation/tech-radar/attachments/` directory for inclusion in the documentation.

## Licence

THIS INFORMATION IS LICENSED UNDER THE CONDITIONS OF THE OPEN GOVERNMENT LICENCE found at:

<http://www.nationalarchives.gov.uk/doc/open-government-licence/version/3>

The following attribution statement MUST be cited in your products and applications when using this information.

> Contains public sector information licensed under the Open Government license v3

### About the licence

The Open Government Licence (OGL) was developed by the Controller of Her Majesty's Stationery Office (HMSO) to enable information providers in the public sector to license the use and re-use of their information under a common open licence.

It is designed to encourage use and re-use of information freely and flexibly, with only a few conditions.
