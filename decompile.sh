#!/bin/bash

if [ "$#" -ne 1 ]; then
    echo "Usage:"$'\n\t'"$0 file > out.xml"
    exit 1
fi

cat $1 | sed -n -e '/<!-- XMLDATA/,$p' | cut -d'"' -f4 | base64 -d
