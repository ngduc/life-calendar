#!/usr/bin/bash

cd build
echo '{ "name": "life-calendar", "version": 2, "alias": [] }' > vercel.json && vercel --prod --confirm
cd ..