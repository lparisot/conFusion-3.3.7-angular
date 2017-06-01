# Simple example of Angular JS

Use bower and grunt tools.

## Installing bower

```bash
$ sudo npm install -g bower
```

## Installing grunt

```bash
$ sudo npm install -g grunt-cli
```

## Development Installation

```bash
$ bower install
$ grunt serve
```

**Other Grunt commands**

1. grunt build: to build the application (See dist folder)
  - clean dist folder,
  - verify code with JSHint,
  - concat CSS files in one file,
  - concat JS files in one file,
  - uglify the code
  - put a revision tag on generated files
2. grunt clean: clean dist folder
3. grunt serve:
  - build the application,
  - launch a local server on port 9000,
  - launch your browser on the main html page,
  - on any file modification, rebuild automatically and reload the page
