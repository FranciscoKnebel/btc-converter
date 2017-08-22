#!/usr/bin/env node
'use strict';

var program = require('commander');
var pkg = require('../package.json');
var convertBTC = require('./convertBTC');

program.version(pkg.version).description(pkg.description).option('-C, --currency <currency>', 'Currency to be converted to. (Default: USD)').option('-A, --amount <amount>', 'BTC value to convert. (Default: 1)').parse(process.argv);

console.log(convertBTC(program.currency, program.amount));