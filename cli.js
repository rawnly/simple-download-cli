#!/usr/bin/env node
'use strict;'

// Modules
const download = require('simple-download');
const meow = require('meow');
const normalize = require('normalize-url');
const chalk = require('chalk');

// Variables
const cli = meow(`
  Usage: ${chalk.yellow('download')} ${chalk.dim('<url>')} ${chalk.gray('[filename]')}

    ${chalk.yellow('-p --path')} ${chalk.dim('<path>')}

`, {
  alias: {
    v: 'version',
    h: 'help',
    p: 'path'
  }
})

// Functions
String.prototype.getFile = function() {
  const $this = this.split('/');
  let pth = $this[$this.length - 1]

  return pth
};

function download_cli(inputs, flags) {
  const defaultPath = '.';
  const parameters = {
    url: inputs[0] ? normalize(inputs[0]) : false,
    file: (inputs[1]) ? inputs[1] : (inputs[0]) ? inputs[0].getFile() : 'file.txt',
    path: (flags.path) ? flags.path : defaultPath
  }

  if (parameters.url === false) {
    console.log();
    console.log('Warn: No url provided.');
    console.log();
    console.log(cli.help);
    console.log();
    process.exit()
  }

  download(parameters, (l, n) => {
		console.log('');
    console.log(`${chalk.yellow(n)} downloaded in ${chalk.green(l)}`);
		console.log('');
  })

}


// Init
download_cli(cli.input, cli.flags)
