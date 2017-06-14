# Simple example of Angular JS

Use bower and (grunt or gulp) tools.

## Installing bower

```bash
$ sudo npm install -g bower
```

## Installing grunt

```bash
$ sudo npm install -g grunt-cli
```

## Installing gulp

```bash
$ sudo npm install -g gulp
```

## Installing a little JSON server

```bash
$ sudo npm install -g json-server
```

## Development Installation

```bash
$ bower install
$ npm install
$ grunt serve
```

or

```bash
$ bower install
$ npm install
$ gulp watch
```

On an other command line, launch the JSON server:
```bash
$ cd json-server
$ json-server --watch db.json
```


**Other Grunt commands**

1. grunt build: to build the application (See dist folder)
  * clean dist folder,
  * verify code with JSHint,
  * concat CSS files in one file,
  * concat JS files in one file,
  * uglify the code,
  * put a revision tag on generated files
2. grunt clean: clean dist folder
3. grunt serve:
  * build the application,
  * launch a local server on port 9000,
  * launch your browser on the main html page,
  * on any file modification, rebuild automatically and reload the page

**Other Gulp commands**

1. gulp: to build the application (See dist folder)
  * clean dist folder,
  * verify code with JSHint,
  * concat CSS files in one file,
  * concat JS files in one file,
  * uglify the code,
  * put a revision tag on generated files,
  * "minify" images
2. gulp clean: clean dist folder
3. gulp watch:
  * build the application,
  * launch a local server on port 3000,
  * launch your browser on the main html page,
  * on any file modification, rebuild automatically and reload the page
