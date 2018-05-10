#!/usr/bin/env node --harmony

const program = require('commander');
const fs = require("fs");
const SF = require('../src');

program.version(require('../package.json').version)
    .option('-i, --in <file ...>', 'Enter the file path.')
    .option('-o, --out <file ...>', 'Output file path.')
    // .option('-t, --type [value]', 'Add pineapple')
    .action((arg, cmd) => {
        console.log(arg)
    })
    .on('--help', () => {
        console.log(`
    gogo!
        `)
    })
    .parse(process.argv)

if (!program.in) {
    console.log(`
    Parameter -i must be specified.
    `);
    process.exit(1);

}

function hasdir(src) {
    return new Promise((resolve, reject) => {
        fs.exists(src, (val) => {
            resolve(val)
        })
    })
}

(async () => {

    let res = await hasdir(program.in);
    if (!res) {
        console.log(`
        ${program.in}
        This directory does not exist.
        `);
        process.exit(1);
    }

    if (program.out && !await hasdir(program.out)) {
        fs.mkdirSync(program.out);
    }

    let sf = new SF({
        inSrc: program.in,
        outSrc: program.out,
    })
    sf.init()

})()