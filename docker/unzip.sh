#!/usr/bin/env bash

mkdir -p webapp
cd webapp
rm -rf *
jar xvf ../../build/libs/game-ps.war
