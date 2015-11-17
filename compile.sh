#!/bin/bash

if [ "$#" -ne 1 ]; then
    echo "Usage:"$'\n\t'"$0 file [theme] > out.html"
    exit 1
fi
theme=$2

if [ "$#" -ne 2 ]; then
    theme=$(cat theme)
fi

# first concat src files into one file
out=$(
    cat src/themes/$theme/header.html

    for f in src/themes/$theme/css/*; do
        echo "<style type=\"text/css\">"
        cat $f
        echo "</style>"
    done
    for f in src/themes/$theme/js/*; do
        echo "<script type=\"text/javascript\">"
        cat $f
        echo "</script>"
    done
    for f in src/js/*; do
        echo "<script type=\"text/javascript\">"
        cat $f
        echo "</script>"
    done

    cat src/themes/$theme/main.html
)

# then add in actual documentation file
out+=$(
    echo -n "<!-- XMLDATA --><script type=\"text/javascript\">var xmldata = \""
    cat $1 | base64 -w 0
    echo -n "\"</script></body></html>"
)

echo $out
