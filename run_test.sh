#!/bin/bash

git clone https://github.com/j-san/travis-ci-node-and-browser-qunit.git
cd travis-ci-node-and-browser-qunit
git submodule init
git submodule update
cd ..

export DISPLAY=:99.0
sh -e /etc/init.d/xvfb start
phantomjs travis-ci-node-and-browser-qunit/test/phantom-js-loader.js test/index.html
