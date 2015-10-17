# curator

[![travis build]{https://img.shields.io/travis/timofeysie/curator.svg?style=flat-square}](https://github.com/timofeysie/curator)
[![code coverate]{https://img.shields.io/codecov/c/github/codecov/timofeysie/curator.svg?style=flat-square}](https://github.com/timofeysie/curator)
[![version]{https://img.shields.io/npm/v/art-curator.svg}](https://github.com/timofeysie/curator)
[![license]{https://img.shields.io/npm/l/art-curator.svg}](https://github.com/timofeysie/curator)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg?style=flat-square)](https://github.com/semantic-release/semantic-release)

A micro-library of functions to manage artists and thier paintings.

The GitHub repo is called curator, but the npm repo is named art-curator since curator already exists as an npm module.
We do unit testing with Mocha and Chai.  Conventional commits are done with commitizen.  The releases are automated with semantic-release.  Tests are automatically run before commits with ghooks.  Code coverage is recorded with Istanbul.  Badges are added to the README with shields.io.  ES6 support is added with Babel.  Travis is used for continuous deployment.

# Usage

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
##Publishing a beta version:

Bump the version with the sufix -beta.0. Ex: 1.3.1-beta.3.  As usual, commit the code, add a new tag, push to GitHub, push the tags, publish to NPM with –tag beta . 
```
$ git add & git commit
$ git tag 1.1.0
$ git push
$ git push --tags 
$ npm publish --tag beta
```

##Installation
Install and save modules: 
```
$ npm i -S art-curator 
// This is equal to
$ npm install --save art-curator
```

###Install and save dependency modules:
```
$ npm i -D art-curator
// This is equal to
$ npm install --save-dev art-curator
```

##How to install a beta version
Remember, the GitHub repo is called curator, but the npm repo is named art-curator.
```
$ npm install art-curator@beta // latest beta, or
$ npm install art-curator@1.3.1-beta.3
```
