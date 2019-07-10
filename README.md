# Buildit Gravity Particles
This is the "single source of truth" for design tokens and assets used throughout Buildit's Gravity design system.


## Consuming exported design tokens (via NPM)
Exports of the design tokens in various formats are published as an NPM package: `@buildit/gravity-particles`.

### Setup
Add the NPM package as a dependency (or dev dependency) to your project:
```
npm install --save @buildit/gravity-particles
```

### Usage: JavaScript / TypeScript
The design tokens can be consumed in JavaScript (Node.js) applications. TypeScript type declarations are also published.

In your code, you can `require` and use the tokens like so:

```js
const gravityParticles = require('@buildit/gravity-particles');
```


### Usage: SASS
The design tokens are also published as SASS variables.

We recommend using [Eyeglass SASS](https://github.com/linkedin/eyeglass) to simplify importing this library into your SASS code. Follow Eyeglass's instructions to integrate it with your SASS compilation options.

Once setup, you can `@import` them into your SASS code like so:

```scss
@import 'gravity-particles';
```


## Development

### Setup
1. Clone this repo to your machine
1. Run `npm install` to install the dependencies

Congrats, you're all set!

**TIP:** We recommend using [NVM](https://github.com/creationix/nvm) to ensure you have a compatible Node.js version (>= 8.11.1).

### Commits
⚠️**Important:** All commits must adhere to the [Coventional Commits format](https://www.conventionalcommits.org/), because we have an [automated release process](https://semantic-release.gitbook.io/semantic-release/) that depends on this.

While you can, in principle, manually format your commit messages using your preferred git client, we recommend using [commitizen](http://commitizen.github.io/cz-cli/), which is installed when you run `npm install`. To run it, simply do:

```sh
npm run commit
```

Note, we also use a git pre-commit hook (which is setup automatically when you run `npm install`) to lint new commit messages and enforce the correct formatting. Our CI also checks commit messages in a PR.


### Build
To do a build, which exports the tokens in all the supported formats, run:

```
npm run build
```

This will create a `dist/` directory containing the exported tokens. (It will also create a `.tmp/` directory for intermediate build files)


### Clean
To remove any previous build output run:

```
npm run clean
```

When running on macOS, the build process will download some [additional tools](https://github.com/ramonpoca/ColorTools) on the first build and place them under `.tmp-bin/`. If you wish, you can remove those (e.g. to force a fresh download on the next build) by running: `npm run clean-bin`.


### How it works
The design tokens are expressed in JSON files under `src/tokens/`. We use Amazon's [Style Dictionary](https://amzn.github.io/style-dictionary/) to export them in various formats.

The configuration, along with some Style Dictionary customisations, are kept under `build-scripts/`.

Finally, we use [Gulp](https://gulpjs.com/) as our task runner to run Style Dictionary and perform other operations needed for the build.
