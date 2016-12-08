'use strict';
/* eslint-env jest */

jest.autoMockOff();

// libs
const defineTest = require('jscodeshift/dist/testUtils').defineTest;
const fs = require('fs');

// config
const testDir = __dirname;
const fixturesDir = `${__dirname}/../__testfixtures__/`;
const transformName = 'transform';
const options = null;

const prefixes = [];
const files = fs.readdirSync(fixturesDir);
files.forEach((file) => {
  const prefix = file
    .replace('.input.js', '')
    .replace('.output.js', '');
  if (prefixes.indexOf(prefix) === -1) {
    prefixes.push(prefix);
  }
});
prefixes.forEach((testFilePrefix) => {
  defineTest(testDir, transformName, options, testFilePrefix);
});
