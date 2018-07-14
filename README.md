# curator

[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg?style=flat-square)](https://github.com/semantic-release/semantic-release)


A micro-library of functions to manage lists of items and detail descriptions about them.  Originally for artists and thier paintings, it has been expanded to help retrieve lists of items from the WikiData and WikiMedia APIs.

The GitHub repo is called curator, but the npm repo is named art-curator since curator already existed as an npm module.  This has created problems with Travis.

We do unit testing with Mocha and Chai.  Conventional commits are done with commitizen.  The releases are automated with semantic-release.  Tests are automatically run before commits with ghooks.  Code coverage is recorded with Istanbul.  Badges are added to the README with Codecov and shields.io.  ES6 support is added with Babel.  Travis is used for continuous deployment.

The prebuild, build and postbuild scripts in the package.json compile the src directory to the dist directory while copying any data files needed.  ES6 code is run in implied strict mode and is transpiled down to ES5.


#

## Table of contents

### [Removing preambles from Wikipedia content pages](#Removing-preambles-from-Wikipedia-content-pages)
### [WikiData and WikiMedia functions](#WikiData-and-WikiMedia-functions)
### [Installation](#Installation)
### [Usage](#Usage)
### [Workflows](#workflows)
### [Committing](#committing)
### [Publishing a beta versions](#Publishing-a-beta-versions)
### [Releasing a new version to NP](#Releasing-a-new-version-to-NPM)
### [Errata](#errata)
### [WIP](#wip)

#

## Removing preambles from Wikipedia content pages

Many pages have preambles regarding the content which should be hidden.  It would be a good idea to keep these preambles and let the user view them on demand.  They should not detract from the primary description of the item.

Example:
```
This article may be in need of reorganization to comply with Wikipedia's layout guidelines. Please help by editing the article to make improvements to the overall structure. (August 2013) (Learn how and when to remove this template message)
```

As a first step in the [React Native](https://github.com/timofeysie/teretifolia) app they were removed by hand in this fashion: 
```
    const preamble = unescapedHtml.indexOf('This article is about');
    if (preamble !== -1) {
        const endOfSentence = unescapedHtml.indexOf('.');
        unescapedHtml = unescapedHtml.slice(endOfSentence+1, unescapedHtml.length);
    }
    const preamble2 = unescapedHtml.indexOf('For other uses, see');
    if (preamble !== -1) {
        const endOfSentence = unescapedHtml.indexOf('.');
        unescapedHtml = unescapedHtml.slice(endOfSentence+1, unescapedHtml.length);
    }
```

This has all arisen due to the virtual dom that does not have the functions the curator needs to call to parse the HTML for example to find the list of <p> elements on a page.

After stripping off the html, which is all that is required for many pages, there would still be these preambles that get in the way of seeing the definition.

We may take the route of using a library to create and parse DOM structures in the curator, but seeing these preambles gives rise to the idea that they are in fact important to the validity of the definitions and can be provided in some kind of expanding/contracting widget.  To this end we are detailing the various types here to plan how to deal with them.  

Even the [Ionic 4 app](https://github.com/timofeysie/loranthifolia) currently does not exclude these comments.

For example, these preambles show up on the "Cultural bias" page:
```
For systemic bias on Wikipedia and how to reduce it, see Wikipedia:Systemic bias.
For Wikipedia's editorial policy on avoiding bias, see Wikipedia:Neutral point of view.
This article includes a list of references, but its sources remain unclear because it has insufficient inline citations. Please help to improve this article by introducing more precise citations. (July 2008) (Learn how and when to remove this template message)
```

We could scrape this like we did with the splice string method before, but there should be appropriate indications in the markup that we can use a selector query to do all the work for us.

That would make even more reasons to use a library like jsdom.  Lets look at the markup to decide how to do this.
```
<div class="mw-parser-output">
    <div role="note" class="hatnote navigation-not-searchable">
        <span class="plainlinks selfreference noprint">
            For <a href="/wiki/Systemic_bias" title="Systemic bias">
            systemic bias</a> 
            on Wikipedia and how to reduce it, see <a href="/wiki/Wikipedia:Systemic_bias" title="Wikipedia:Systemic bias">
            Wikipedia:Systemic bias</a>.
        </span>
    </div>
    <div role="note" class="hatnote navigation-not-searchable">
        <span class="plainlinks selfreference noprint">
            For Wikipedia's editorial policy on avoiding bias, see <a href="/wiki/Wikipedia:Neutral_point_of_view" title="Wikipedia:Neutral point of view">
            Wikipedia:Neutral point of view</a>.
        </span>
    </div>
    <table class="plainlinks metadata ambox ambox-style ambox-More_footnotes" role="presentation">
        <tbody>
            <tr>
                <td class="mbox-image">
                    <div style="width:52px">
                        <img alt="" src="//upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Text_document_with_red_question_mark.svg/40px-Text_document_with_red_question_mark.svg.png" width="40" height="40" srcset="//upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Text_document_with_red_question_mark.svg/60px-Text_document_with_red_question_mark.svg.png 1.5x, //upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Text_document_with_red_question_mark.svg/80px-Text_document_with_red_question_mark.svg.png 2x" data-file-width="48" data-file-height="48" />
                    </div>
                </td>
                <td class="mbox-text">
                    <div class="mbox-text-span">
                        This article includes a <a href="/wiki/Wikipedia:Citing_sources" title="Wikipedia:Citing sources">
                        list of references</a>, 
                        but <b>its sources remain unclear</b> because it has <b>insufficient <a href="/wiki/Wikipedia:Citing_sources#Inline_citations" title="Wikipedia:Citing sources">inline citations</a></b>.<span class="hide-when-compact"> Please help to <a href="/wiki/Wikipedia:WikiProject_Fact_and_Reference_Check" title="Wikipedia:WikiProject Fact and Reference Check">improve</a> this article by <a href="/wiki/Wikipedia:When_to_cite" title="Wikipedia:When to cite">introducing</a> more precise citations.</span>  <small><i>(July 2008)</i></small><small class="hide-when-compact"><i> (<a href="/wiki/Help:Maintenance_template_removal" title="Help:Maintenance template removal">Learn how and when to remove this template message</a>)</i></small>
                    </div>
                </td>
            </tr>
        </tbody>
    </table>
    <p>
        <b>Cultural bias</b> is the phenomenon of interpreting and judging phenomena by standards inherent to one's own culture. The phenomenon is sometimes considered a problem central to social and human sciences, such as <a href="/wiki/Economics" title="Economics">economics</a>, <a href="/wiki/Psychology" title="Psychology">psychology</a>, <a href="/wiki/Anthropology" title="Anthropology">anthropology</a>, and <a href="/wiki/Sociology" title="Sociology">sociology</a>. Some practitioners of the aforementioned fields have attempted to develop methods and theories to compensate for or eliminate cultural bias.
    </p>
    <p>
        Cultural bias occurs when people of a culture make assumptions about conventions, including conventions of language, notation, proof and evidence. They are then accused of mistaking these assumptions for laws of logic or nature. Numerous such biases exist, concerning cultural norms for color, mate selection, concepts of justice, <a href="/wiki/Linguistics" title="Linguistics">linguistic</a> and logical validity, the acceptability of evidence, and taboos.
    </p>
```

So you can see the ```role="note"``` designates the first kind of preamble.
Then the box with the icon has a ```role="presentation"```.  The description later starts with <p> tags which denote paragraphs which is following semantic guidelines.

Right now we are just doing this:
```
const desc:any = one.getElementsByClassName('mw-parser-output')[0].children;
```

We then take only the inner html from those children, which as you can see includes the preambles as well as the table.
We should instead look for roles and capture those in a separate array, and then put just the <p> content in another.

Maybe these should be two separate functions.  One to get the descriptions and the other to get the roles based content.  This was the API will stay the same.  Instead of using jsdom, Cheerio has done well in the past and is still a popular repo.  Let's go with that.

After installing Cherrio, and using it in the  function, and chaning the test to use the sample result from the cultural bias shown above, we're getting a really strange error:
```
ReferenceError: React is not defined
    at Object.<anonymous> (/Users/tim/repos/loranthifolia-teretifolia-curator/curator/src/data/Cultural_bias.html:1:1)
```

How is some html markup requiring React?  Did someone run a npm task which required React for tests?  Line 1 of that file is just ```<div class="mw-parser-output">```...

The only mention of React is in the package-lock.json file:
```
            "babel-plugin-react-constant-elements": "^1.0.3",
            "babel-plugin-react-display-name": "^1.0.3",
```

Not sure why that was happening so put the html content inline.  Then it took a little time to get ```parseSingeWikiMediaPage(htmlContent)``` working.  Couldn't get the array of notes/preambles yet.  Have to work out how to do that with Cheerio.  For now, time to test out the new function in the React app.  The best news is that the test for that function is passing thanks to Cheerio providing our missing DOM functions!

The bad news is commitizen is failing:
```
Error: Cannot find module 'internal/util/types'
    at Function.Module._resolveFilename (module.js:538:15)
    at Function.Module._load (module.js:468:25)
    at Module.require (module.js:587:17)
    at require (internal/module.js:11:18)
    at evalmachine.<anonymous>:31:26
    at Object.<anonymous> (/Users/tim/repos/loranthifolia-teretifolia-curator/curator/node_modules/commitizen/node_modules/gulp/node_modules/vinyl-fs/node_modules/graceful-fs/fs.js:11:1)
```

Going with normal git commits for now.

## WikiData and WikiMedia functions

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

## Publishing a beta versions
Bump the version with the sufix -beta.0. Ex: 1.3.1-beta.3.  As usual, commit the code, add a new tag, push to GitHub, push the tags, publish to NPM with –tag beta . 
```
$ git add & git commit
$ git tag 1.1.0
$ git push
$ git push --tags 
$ npm publish --tag beta
```

## Releasing a new version to NPM
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
