# curator

![github](https://raw.github.com/timofeysie/curator/master/logos/github-logo.svg)
![sheilds](https://raw.github.com/timofeysie/curator/master/logos/sheilds-logo.svg)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg?style=flat-square)](https://github.com/semantic-release/semantic-release)

A micro-library of functions to manage artists and thier paintings.

The GitHub repo is called curator, but the npm repo is named art-curator since curator already exists as an npm module.
We do unit testing with Mocha and Chai.  Conventional commits are done with commitizen.  The releases are automated with semantic-release.  Tests are automatically run before commits with ghooks.  Code coverage is recorded with Istanbul.  Badges are added to the README with Codecov and shields.io.  ES6 support is added with Babel.  Travis is used for continuous deployment.

The prebuild, build and postbuild scripts in the package.json compile the src directory to the dist directory while copying any data files needed.  ES6 code is run in implied strict mode and is transpiled down to ES5.


#Installation
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


# Usage
```
var lib = require('./src/index.js');
lib.getArtists
lib.getArtist()
lib.searchArtists('abie');
lib.getBio('albert');
lib.artistsReport()
```

# Workflow
## Commiting
Make sure that you have Node.js installed.
This package uses commitizen to create it's sematic releases.  First add your changes then run the commit:
```
$ git add
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

##Publishing a beta versions: 
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

#Errata
Apparently it's actually safe to git-ignore the dist folder as long as we either explicitly declare the files for npm in package.json's files property or by adding a .npmignore that is a copy of your .gitignore but without dist.
