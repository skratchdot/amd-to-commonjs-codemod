# amd-to-commonjs-codemod

[![NPM version](https://badge.fury.io/js/amd-to-commonjs-codemod.svg)](http://badge.fury.io/js/amd-to-commonjs-codemod)
[![Build Status](https://travis-ci.org/skratchdot/amd-to-commonjs-codemod.png?branch=master)](https://travis-ci.org/skratchdot/amd-to-commonjs-codemod)
[![Code Climate](https://codeclimate.com/github/skratchdot/amd-to-commonjs-codemod.png)](https://codeclimate.com/github/skratchdot/amd-to-commonjs-codemod)
[![Coverage Status](https://coveralls.io/repos/skratchdot/amd-to-commonjs-codemod/badge.svg?branch=master&service=github)](https://coveralls.io/github/skratchdot/amd-to-commonjs-codemod?branch=master)
[![Dependency Status](https://david-dm.org/skratchdot/amd-to-commonjs-codemod.svg)](https://david-dm.org/skratchdot/amd-to-commonjs-codemod)
[![devDependency Status](https://david-dm.org/skratchdot/amd-to-commonjs-codemod/dev-status.svg)](https://david-dm.org/skratchdot/amd-to-commonjs-codemod#info=devDependencies)

[![NPM](https://nodei.co/npm/amd-to-commonjs-codemod.png)](https://npmjs.org/package/amd-to-commonjs-codemod)


## Description

A codemod to transform amd style includes into commonjs includes


## Getting Started

```bash
npm install jscodeshift
npm install amd-to-commonjs-codemod
jscodeshift -t ./node_modules/amd-to-commonjs-codemod/transform.js /path/to/files/*.js
```


## Links

- [Source Code](https://github.com/skratchdot/amd-to-commonjs-codemod)
- [Live example on AST Explorer](http://astexplorer.net/#/qnUtxENiO8)


## License

Copyright (c) 2016 [skratchdot](https://www.skratchdot.com/)  
Licensed under the
[MIT license](https://github.com/skratchdot/amd-to-commonjs-codemod/blob/master/LICENSE-MIT).
