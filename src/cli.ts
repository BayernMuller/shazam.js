#!/usr/bin/env node

import { Vibra } from ".";
import fs from 'fs'

if (process.argv.length < 3) {
    console.log('Usage: node dist/cli.js <wav file>');
    process.exit(1);
}
const filePath = process.argv[2]

const buffer = fs.readFileSync(filePath)

const vibra = new Vibra();
vibra.on('initialized', () => {
    const signature = vibra.getSignature(buffer);
    console.log(signature);
});
