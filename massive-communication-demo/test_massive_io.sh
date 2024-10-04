#!/bin/bash
node generateNumberText.js 2000000000
gcc number_formatter.c -o main
node app.js
