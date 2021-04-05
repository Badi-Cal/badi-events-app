#!/usr/bin/env node

import fs from 'fs/promises';
import path from 'path';
import process from 'process';
import { fileURLToPath } from 'url';

import Mocha from 'mocha/lib/mocha.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const tsLibPath = path.resolve(__dirname, "../node_modules/@fullcalendar/core/node_modules/tslib/tslib.es6.js");
const tsLibLink = path.resolve(__dirname, "../node_modules/@fullcalendar/core/node_modules/tslib/tslib.es6.mjs");
const testDir = path.resolve(__dirname, "tests/")

// Instantiate a Mocha with options
var mocha = new Mocha();

// root suite test fixtures 
const fixtures = path.resolve(__dirname, "fixtures/jsdom.fixture.js");
mocha.addFile(fixtures);

/**
 * Add test files to the Mocha instance
 * 
 * @param {string} dir 
 */
async function addFiles(dir) {
  try {
    const files = await fs.readdir(dir);
    files.forEach(function(file) {
      mocha.addFile(path.join(testDir, file));
    });
  } catch (error) {
    console.log(`\nError: ${error.message || error}`);
  }
}

/**
 * Add hard link to tslib es module.
 * 
 * Node imports this module as commonjs
 * 
 * @see https://github.com/microsoft/tslib/issues/81
 */
async function linkFiles() {
  try {
    await fs.link(tsLibPath, tsLibLink);
  } catch (error) {
    let regex = /EEXIST/;
    if (! regex.test( error.message )) {
      console.log(`\nError: ${error.message || error}`);
    }
  }
}

function setUpMocha () {
  return Promise.all([ addFiles(testDir), linkFiles() ]);
}

// loads test files asynchronously, then runs root suite
setUpMocha()
  .then( () => mocha.loadFilesAsync() )
  .then( () => mocha.run( failures => process.exitCode = failures ? 1 : 0) )
  .then( () => fs.unlink( tsLibLink ))
  .catch( (error) => {
    console.error('\n' + (error.stack || `Error: ${error.message || error}`));
    process.exitCode = 1;
  });
