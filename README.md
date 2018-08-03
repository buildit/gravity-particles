# Buildit Gravity Particles

This is the "single source of truth" for design tokens and assets used throughout Buildit's Gravity design system.


## Intro

This project is still a work in progress. We are using [Amazon's Style Dictionary](https://amzn.github.io/style-dictionary/) to export our design tokens into various formats. Currently, it is only configured to export them as SASS variables (so that they can then be consumed by the  [`gravity-ui-sass`](https://github.com/buildit/gravity-ui-sass) library). However, in future we intend to also export them as JS modules, Adobe swatch files, Mac OS X swatch files and whatever else we might need.


## Setup

1. Clone this repo to your machine
1. Run `npm install` to install the dependencies

Congrats, you're all set!


## Build

```sh
npm run build
```

This will create a `dist/` directory containing the exported tokens.
