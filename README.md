# curator

[![travis build]{https://img.shields.io/travis/timofeysie/curator.svg?style=flat-square}](https://github.com/timofeysie/curator)
[![code coverate]{https://img.shields.io/codecov/c/github/codecov/timofeysie/curator.svg?style=flat-square}](https://github.com/timofeysie/curator)
[![version]{https://img.shields.io/npm/v/art-curator.svg}](https://github.com/timofeysie/curator)
[![license]{https://img.shields.io/npm/l/art-curator.svg}](https://github.com/timofeysie/curator)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg?style=flat-square)](https://github.com/semantic-release/semantic-release)

A project to manage artists and thier paintings.

The GitHub repo is called curator, but the npm repo is named art-curator since curator already exists as an npm module.

# Usage

This package uses commitizen to create it's sematic releases.  First add your changes then run the commit:
$ git add
$ npm run commit
Choose the type of changes that you did. Ex: chore
Choose the scope of the change. Ex: releasing
Add a description. Ex: Add travis config, conventional commit and semantic-release
Add a longer description
List break changes or issues closed by this change. Ex: closes #1
See if everything is ok git log
$ npm run commit 

## Releasing a new version to NPM:

We use Semantic Versioning to bump the version correctly.  Commit the code, add a new tag, push to GitHub, push the tags and republish to NPM.
$ git add & git commit
$ git tag 1.1.0
$ git push
$ git push --tags
$ npm publish
To check the info on NPM:
$ npm info art-curator

##Publishing a beta version:

Bump the version with the sufix -beta.0. Ex: 1.3.1-beta.3.  Commit the code, Add a new tag, Push to GitHub, Push the tags, Publish to NPM with –tag beta . 
$ git add & git commit
$ git tag 1.1.0
$ git push
$ git push --tags 
$ npm publish --tag beta

##How to install a beta version:
$ npm install art-curator@beta (latest beta) or
$ npm install art-curator@1.3.1-beta.3

