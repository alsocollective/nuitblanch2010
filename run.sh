#! /bin/sh
PATH=${PATH}:/home/also/.nvm/v0.10.40/bin

forever stopall
forever list
#forever start /srv/node/demo/main.js
node /media/also/UNTITLED/nuitblanch2010/main.js