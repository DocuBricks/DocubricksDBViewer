#!/bin/bash

if [ "$#" -lt 1 ]; then
    echo "Usage:"$'\n\t'"$0 file [theme] > out.html"
    exit 1
fi
theme=$2

if [ "$#" -ne 2 ]; then
    theme=$(cat theme)
fi

# first concat src files into one file
out=$(cat src/themes/$theme/header.html)

for f in src/themes/$theme/css/*; do
    out+="<style type=\"text/css\">"$'\n'
    out+=$(cat $f)
    out+="</style>"$'\n'
done

for f in src/themes/$theme/js/*; do
    out+="<script type=\"text/javascript\">"$'\n'
    out+=$(cat $f)
    out+="</script>"$'\n'
done

for f in src/js/*; do
    out+="<script type=\"text/javascript\">"$'\n'
    out+=$(cat $f)
    out+="</script>"$'\n'
done

out+=$(cat src/themes/$theme/main.html)

# then add in actual documentation file
out+="<!-- XMLDATA --><script type=\"text/javascript\">var xmldata = \""
out+=$(cat $1 | base64 -w 0)
out+="\"</script></body></html>"

echo "$out"
