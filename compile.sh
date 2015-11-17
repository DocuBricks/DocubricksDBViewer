#!/bin/bash

if [ "$#" -ne 1 ]; then
    echo "Please tell me which documentation file to compile..."
fi
theme=$2

if [ "$#" -ne 2 ]; then
    theme=$(cat theme)
fi

# first concat src files into one file
rm out.html 2> /dev/null

touch out.html

(
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
) > out.html

# then add in actual documentation file
(
    echo -n "<!-- XMLDATA --><script type=\"text/javascript\">var xmldata = \""
    cat $1 | base64 -w 0
    echo -n "\"</script></body></html>"
) >> out.html
