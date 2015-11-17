# Docubricks Viewer mk2

## What it does
Turns your docubricks documentation file into a single html file that you can upload/view your project with.

Can also decompile html files to recover the original documentation file if needed.

## How to use
1. Make a documentation file with the docubricks format (save as something like `instructions.xml`)
2. `./compile.sh instructions.xml > out.html` to compile a file `out.html` that contains the reader.

### How to decompile
`./decompile.sh out.html > instructions.xml`

### Bonus
Also we have a theming system in case you are not a fan of the default theme. Change the default theme to another name in the `src/themes/` into the `theme` file.

Or you can change it for compiling a certain file, e.g.

`./compile.sh instructions.xml material > out.html`

## TODO
- Do it in other languages, not just bash (e.g. python, java, ruby, php, c etc)
