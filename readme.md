# node-app

My personal best practice Node.js application. Major technology choices include:

1. [express.js](http://expressjs.com/) - routing
1. [jade](http://jade-lang.com/) - templating
1. [nconf](https://www.npmjs.com/package/nconf) - configuration
1. [bunyan](https://www.npmjs.com/package/bunyan) - logging
1. [gulp](http://gulpjs.com/) - task runner
1. [gulp-bundle-assets](https://www.npmjs.com/package/gulp-bundle-assets) - frontend asset bundling

## Setup

Install all dependencies

```bash
npm install
```

## Usage

Start the app in dev mode. This includes watching src files for changes and auto-restarting

```bash
gulp dev
```

For all other available tasks, run

```bash
gulp help
```
