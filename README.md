# [Badi calendar](http://badí.com/)

Events app for Badi calendar

## Getting started

### Prerequisites

- [Node.js](https://nodejs.org/en/) version ^14.7

#### Using NVM

If you use [NVM](https://github.com/nvm-sh/nvm), the `/.nvmrc` file will set your Node version with `nvm use`.

### Installation

Make sure you have Node.js and NPM installed by running:

```
node --version && npm --version
```

Then install dependencies:

```
npm install
```

To run development enviroment:

```
npm start
```

To create a production build:

```
npm run build
```

## Using a Docker context

There is a [Dockerfile](https://docs.docker.com/get-docker/) that can be used to simulate a production-like environment.
A helper script is provided to make the process more stream-lined.

```shell
./docker.sh build # builds the docker image
./docker.sh start # creates a docker container to run in background
npm run build
```

The Docker image merely houses the serving of built files, but does not automatically build the application.
If you want the Docker environment to build the app as well:

```shell
./docker.sh enter
> npm run build
# or
> npm start
```

You can run `./docker.sh help` to see more options.

## Testing

The testing suite uses [Mocha](https://mochajs.org/) and [Chai](https://www.chaijs.com/) BDD style assertions.

You can define tests by creating files named `{name}.test.js` in the `test/tests` directory.

Run all tests with:

```
npm test
```

## License

 [![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)

* **[GPL-3.0 license](https://www.gnu.org/licenses/gpl-3.0)**
