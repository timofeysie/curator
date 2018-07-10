# curator

[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg?style=flat-square)](https://github.com/semantic-release/semantic-release)


A micro-library of functions to manage artists and thier paintings.

The GitHub repo is called curator, but the npm repo is named art-curator since curator already exists as an npm module.  This has created problems with Travis.
We do unit testing with Mocha and Chai.  Conventional commits are done with commitizen.  The releases are automated with semantic-release.  Tests are automatically run before commits with ghooks.  Code coverage is recorded with Istanbul.  Badges are added to the README with Codecov and shields.io.  ES6 support is added with Babel.  Travis is used for continuous deployment.

The prebuild, build and postbuild scripts in the package.json compile the src directory to the dist directory while copying any data files needed.  ES6 code is run in implied strict mode and is transpiled down to ES5.


## A new beginning

This project is being dusted off as our only published npm.  We want to use it to hold the refactored code from the Ionic 4 project so that it can also be used in the React Native app.

When taking the first step, we got this warning:
```
$ npm install wikidata-sdk --save
npm notice created a lockfile as package-lock.json. You should commit this file.
+ wikidata-sdk@5.12.0
added 26 packages from 10 contributors, removed 1 package and audited 1419 packages in 42.682s
found 71 vulnerabilities (15 low, 36 moderate, 18 high, 2 critical)
  run `npm audit fix` to fix them, or `npm audit` for details
```

Recently GitHub has a new feature showing warnings to users on their repos.  The message we are getting from loranthifolia is:
```
We found a potential security vulnerability in one of your dependencies.
A dependency defined in package-lock.json has known security vulnerabilities and should be updated.

Only the owner of this repository can see this message.
Learn more about vulnerability alerts
```

That's 2 critical packages folks.  This repo hasn't been touched in over two years.  Suppose we should find out what those details are.  Wouldn't want to pass on any vulnerabilites to any potential users of this repo later.

Trying to fix it with:
```
$ npm audit fix

Usage: npm <command>

where <command> is one of:
    access, adduser, bin, bugs, c, cache, completion, config,
    ddp, dedupe, deprecate, dist-tag, docs, edit, explore, get,
    help, help-search, i, init, install, install-test, it, link,
    list, ln, login, logout, ls, outdated, owner, pack, ping,
    prefix, prune, publish, rb, rebuild, repo, restart, root,
    run, run-script, s, se, search, set, shrinkwrap, star,
    stars, start, stop, t, tag, team, test, tst, un, uninstall,
    unpublish, unstar, up, update, v, version, view, whoami
```

My text search does not list audit as a string in that list.  In the npm docs it says:
```
Note: The npm audit command is available in npm@6. To upgrade, run npm install npm@latest -g
```

nvm says we are "Now using node v8.9.4 (npm v6.1.0)".
So then where is that command?  The latest npm was installed on the weekend.

Since the code is coming from an Ionic app which is built with Angular, using TypeScrip of course, the type information will have to be removed from the current code, or we will have to convert the entire index.js file to typescript.  This should be an issue because it's already using Babel to transpile the JavaScript files into a build directory, however, to move things along we are not going to be putting in the extra work right now so that we can get the basics down to be used in the [React Native app](https://github.com/timofeysie/teretifolia).

The functionality has been split up into these functions:
```
	createWikiDataUrl: createWikiDataUrl,
	createWikiMediaUrl: createWikiMediaUrl,
	parseWikiMediaResult: parseWikiMediaResult,
	parseSingeWikiMediaPage: parseSingeWikiMediaPage,
	createSingleWikiMediaPageUrl: createSingleWikiMediaPageUrl,
```


## Installation
Install and save modules: 
```
$ npm i -S art-curator 
// This is equal to
$ npm install --save art-curator
```
Install and save dependency modules:
```
$ npm i -D art-curator
// This is equal to
$ npm install --save-dev art-curator
```
Install a beta version.  Remember, the GitHub repo is called curator, but the npm repo is named art-curator.
```
$ npm install art-curator@beta // latest beta, or
$ npm install art-curator@1.3.1-beta.3
```


## Usage
```
var curator = require('./node_modules/art-curator/dist/index.js');
curator.createWikiDataUrl()
curator.getArtists
curator.getArtist()
curator.searchArtists('abie');
curator.getBio('albert');
curator.artistsReport()
```


## Workflow

You can build and test with repl:
```
$ npm run build
$ node
> var curator = require('./dist/index.js');
> curator.createWikiDataUrl()
```


## Committing
Make sure that you have Node.js installed.
This package uses commitizen to create it's sematic releases.  First add your changes then run the commit:
```
$ git add .
$ npm run commit
```
Choose the type of changes that you did. Ex: chore
Choose the scope of the change. Ex: releasing
Add a description. Ex: Add travis config, conventional commit and semantic-release
Add a longer description
List break changes or issues closed by this change. Ex: closes #1
To see if everything is ok:
```
$ git log
```

## Publishing a beta versions: 
Bump the version with the sufix -beta.0. Ex: 1.3.1-beta.3.  As usual, commit the code, add a new tag, push to GitHub, push the tags, publish to NPM with –tag beta . 
```
$ git add & git commit
$ git tag 1.1.0
$ git push
$ git push --tags 
$ npm publish --tag beta
```

## Releasing a new version to NPM:
We use Semantic Versioning to bump the version correctly.  Commit the code, add a new tag, push to GitHub, push the tags and republish to NPM.
```
$ git add & git commit
$ git tag 1.1.0
$ git push
$ git push --tags
$ npm publish
```
To check the info on NPM:
```
$ npm info art-curator
```

## Errata
Apparently it's actually safe to git-ignore the dist folder as long as we either explicitly declare the files for npm in package.json's files property or by adding a .npmignore that is a copy of your .gitignore but without dist.

## WIP

```
$ npm run commit

> art-curator@0.0.0-sematically-released commit /Users/tim/repos/loranthifolia-teretifolia-curator/curator
> git-cz

module.js:540
    throw err;
    ^

Error: Cannot find module 'internal/util/types'
    at Function.Module._resolveFilename (module.js:538:15)
    at Function.Module._load (module.js:468:25)
    at Module.require (module.js:587:17)
    at require (internal/module.js:11:18)
    at evalmachine.<anonymous>:31:26
    at Object.<anonymous> (/Users/tim/repos/loranthifolia-teretifolia-curator/curator/node_modules/commitizen/node_modules/gulp/node_modules/vinyl-fs/node_modules/graceful-fs/fs.js:11:1)
    at Module._compile (module.js:643:30)
    at Object.Module._extensions..js (module.js:654:10)
    at Module.load (module.js:556:32)
    at tryModuleLoad (module.js:499:12)
```

Tried the recommended ```npm rebuild``` and things got worse:
```
...
../node_modules/nan/nan.h:619:20: error: no type named 'GCPrologueCallback' in 'v8::Isolate'
      v8::Isolate::GCPrologueCallback callback) {
      ~~~~~~~~~~~~~^
../node_modules/nan/nan.h:1955:15: warning: 'SetAccessor' is deprecated [-Wdeprecated-declarations]
  return obj->SetAccessor(
              ^
/Users/tim/.node-gyp/8.9.4/include/node/v8.h:3172:22: note: 'SetAccessor' has been explicitly marked deprecated here
                bool SetAccessor(Local<Name> name,
                     ^
/Users/tim/.node-gyp/8.9.4/include/node/v8config.h:321:3: note: expanded from macro 'V8_DEPRECATED'
  declarator __attribute__((deprecated))
  ^
3 warnings and 4 errors generated.
make: *** [Release/obj.target/fse/fsevents.o] Error 1
gyp ERR! build error 
gyp ERR! stack Error: `make` failed with exit code: 2
gyp ERR! stack     at ChildProcess.onExit (/Users/tim/.nvm/versions/node/v8.9.4/lib/node_modules/npm/node_modules/node-gyp/lib/build.js:258:23)
gyp ERR! stack     at emitTwo (events.js:126:13)
gyp ERR! stack     at ChildProcess.emit (events.js:214:7)
gyp ERR! stack     at Process.ChildProcess._handle.onexit (internal/child_process.js:198:12)
gyp ERR! System Darwin 14.5.0
gyp ERR! command "/Users/tim/.nvm/versions/node/v8.9.4/bin/node" "/Users/tim/.nvm/versions/node/v8.9.4/lib/node_modules/npm/node_modules/node-gyp/bin/node-gyp.js" "build" "--fallback-to-build" "--module=/Users/tim/repos/loranthifolia-teretifolia-curator/curator/node_modules/babel/node_modules/chokidar/node_modules/fsevents/lib/binding/Release/node-v57-darwin-x64/fse.node" "--module_name=fse" "--module_path=/Users/tim/repos/loranthifolia-teretifolia-curator/curator/node_modules/babel/node_modules/chokidar/node_modules/fsevents/lib/binding/Release/node-v57-darwin-x64"
gyp ERR! cwd /Users/tim/repos/loranthifolia-teretifolia-curator/curator/node_modules/babel/node_modules/chokidar/node_modules/fsevents
gyp ERR! node -v v8.9.4
gyp ERR! node-gyp -v v3.6.2
gyp ERR! not ok 
node-pre-gyp ERR! build error 
node-pre-gyp ERR! stack Error: Failed to execute '/Users/tim/.nvm/versions/node/v8.9.4/bin/node /Users/tim/.nvm/versions/node/v8.9.4/lib/node_modules/npm/node_modules/node-gyp/bin/node-gyp.js build --fallback-to-build --module=/Users/tim/repos/loranthifolia-teretifolia-curator/curator/node_modules/babel/node_modules/chokidar/node_modules/fsevents/lib/binding/Release/node-v57-darwin-x64/fse.node --module_name=fse --module_path=/Users/tim/repos/loranthifolia-teretifolia-curator/curator/node_modules/babel/node_modules/chokidar/node_modules/fsevents/lib/binding/Release/node-v57-darwin-x64' (1)
node-pre-gyp ERR! stack     at ChildProcess.<anonymous> (/Users/tim/repos/loranthifolia-teretifolia-curator/curator/node_modules/babel/node_modules/chokidar/node_modules/fsevents/node_modules/node-pre-gyp/lib/util/compile.js:83:29)
node-pre-gyp ERR! stack     at emitTwo (events.js:126:13)
node-pre-gyp ERR! stack     at ChildProcess.emit (events.js:214:7)
node-pre-gyp ERR! stack     at maybeClose (internal/child_process.js:925:16)
node-pre-gyp ERR! stack     at Process.ChildProcess._handle.onexit (internal/child_process.js:209:5)
node-pre-gyp ERR! System Darwin 14.5.0
node-pre-gyp ERR! command "/Users/tim/.nvm/versions/node/v8.9.4/bin/node" "/Users/tim/repos/loranthifolia-teretifolia-curator/curator/node_modules/babel/node_modules/chokidar/node_modules/fsevents/node_modules/.bin/node-pre-gyp" "install" "--fallback-to-build"
node-pre-gyp ERR! cwd /Users/tim/repos/loranthifolia-teretifolia-curator/curator/node_modules/babel/node_modules/chokidar/node_modules/fsevents
node-pre-gyp ERR! node -v v8.9.4
node-pre-gyp ERR! node-pre-gyp -v v0.6.12
node-pre-gyp ERR! not ok 
Failed to execute '/Users/tim/.nvm/versions/node/v8.9.4/bin/node /Users/tim/.nvm/versions/node/v8.9.4/lib/node_modules/npm/node_modules/node-gyp/bin/node-gyp.js build --fallback-to-build --module=/Users/tim/repos/loranthifolia-teretifolia-curator/curator/node_modules/babel/node_modules/chokidar/node_modules/fsevents/lib/binding/Release/node-v57-darwin-x64/fse.node --module_name=fse --module_path=/Users/tim/repos/loranthifolia-teretifolia-curator/curator/node_modules/babel/node_modules/chokidar/node_modules/fsevents/lib/binding/Release/node-v57-darwin-x64' (1)
npm ERR! code ELIFECYCLE
npm ERR! errno 1
npm ERR! fsevents@1.0.2 install: `node-pre-gyp install --fallback-to-build`
npm ERR! Exit status 1
npm ERR! 
npm ERR! Failed at the fsevents@1.0.2 install script.
npm ERR! This is probably not a problem with npm. There is likely additional logging output above.
npm ERR! A complete log of this run can be found in:
npm ERR!     /Users/tim/.npm/_logs/2018-07-03T13_16_29_107Z-debug.log
```
Any suggestions?  Start from scratch?


## Testing Wiki functions

Without writing any tests, we have the following statement:
```
Statements   : 57.66% ( 64/111 ), 1 ignored
Branches     : 86.36% ( 19/22 ), 4 ignored
Functions    : 46.15% ( 6/13 )
Lines        : 53.47% ( 54/101 )
```

After adding a few tests for the everything except the two parse functions, our coverage has gotten a bit better:
```
Statements   : 72.97% ( 81/111 ), 1 ignored
Branches     : 86.36% ( 19/22 ), 4 ignored
Functions    : 69.23% ( 9/13 )
Lines        : 70.3% ( 71/101 )
```

The reason the parse funtions were not testing is because they require a response object to be converted into JSON.

I'm looking at Sinon now as a way to mock the response object and attach the content to it to test the rest of the parse function.  The result is first converted to JSON, and the content is help in a _body parameter, which has the root property of 'parse'.  

So we look at these three: ```['parse']['text']['*']``` which then contains the content we want.
Maybe we will have to construct our own object that has a parse function and a _body parameter.
