import artists from './data/artists.json';
import uniqueRandomArray from 'unique-random-array';
// ES5 version
// var artists = require('./data/artists.json');
// var uniqueRandomArray = require('unique-random-array');
var getRandomArtist = uniqueRandomArray(artists);
import * as wdk from 'wikidata-sdk';

module.exports = {
  parseTitle: parseTitle,
  createElementFromHTML:createElementFromHTML,
  createWikiDataUrl: createWikiDataUrl,
  createWikiDataCategoryUrl: createWikiDataCategoryUrl,
  createWikiDataItemUrl: createWikiDataItemUrl,
	createWikiMediaUrl: createWikiMediaUrl,
	parseWikiMediaResult: parseWikiMediaResult,
  createSingleWikiMediaPageUrl: createSingleWikiMediaPageUrl,
  removeHtml: removeHtml,
  removeWikiDataPreambles: removeWikiDataPreambles,
	getArtists: artists,
	getArtist: getArtist,
	searchArtists: searchArtists,
	getBio: getBio,
	artistsReport: artistsReport
};
/**
 * @returns SPARQL query url
 */
function createWikiDataItemUrl(itemLabel, language) {
    const sparql = `
        SELECT ?item ?itemLabel
        WHERE {
            ?item ?label "${itemLabel}"@en.
            ?article schema:about ?item .
            ?article schema:inLanguage "en" .
            ?article schema:isPartOf <https://en.wikipedia.org/>.
            SERVICE wikibase:label { bd:serviceParam wikibase:language "${language}". }
        } `
	return wdk.sparqlQuery(sparql);
}
/**
 * @returns data.results.bindings
 */
function createWikiDataUrl(lang) {
    let language = 'en';
    if (lang) {
        language = lang;
    }
    const sparql = `
        SELECT ?cognitive_bias ?cognitive_biasLabel ?cognitive_biasDescription WHERE {
            SERVICE wikibase:label {
                bd:serviceParam wikibase:language "[AUTO_LANGUAGE],${language}".
            }
            ?cognitive_bias wdt:P31 wd:Q1127759.
        }
		LIMIT 1000`
	const url = wdk.sparqlQuery(sparql);
	return url;
}
/**
 * @returns data.results.bindings
 */
function createWikiDataCategoryUrl(lang, category, wdt, wd) {
    let language = 'en';
    if (lang) {
        language = lang;
    }
    const sparql = `
        SELECT ?${category} ?${category}Label ?${category}Description WHERE {
            SERVICE wikibase:label {
                bd:serviceParam wikibase:language "[AUTO_LANGUAGE],${language}".
            }
            ?${category} wdt:${wdt} wd:${wd}.
        }
		LIMIT 1000`
	const url = wdk.sparqlQuery(sparql);
	return url;
}
/** Create a url for a WikiMedia API call.
 * Currently set to return a list of cognitive bias. */
function createWikiMediaUrl(sectionNum, lang) {
    let language = 'en';
    if (lang) {
        language = lang;
    }
    let action = 'action=parse';
    let section = 'section='+sectionNum;
    let prop = 'prop=text&format=json';
    let page = 'page=List_of_cognitive_biases';
    const baseUrl = 'http://'+language+'.wikipedia.org/w/api.php';
    let sectionUrl = baseUrl+'?'+action+'&'+section+'&'+prop+'&'+page;
	return sectionUrl;
}
/** Parse the result of a WikiMedia API call to return a text version of
 * multiple rows of name and definition pairs.
 */
function parseWikiMediaResult(parseResult) {
    const content = parseResult['parse']['text']['*'];
    let one = this.createElementFromHTML(content);
    let title = this.parseTitle(one);
    const rows = one.getElementsByClassName("wikitable")[0].getElementsByTagName('tr');
    for (let i = 1; i < rows.length;i++) {
        let name = rows[i].getElementsByTagName('td')[0].innerText;
        let description = rows[i].getElementsByTagName('td')[1].innerText;
        this.wikiMediaEntries.set(name,title);
    }
    return wikiMediaEntries;
}
/**
   * Create the API call for a single subject page on Wikipedia.
   * @param pageName
   * @param lang
   * @param doNotLowerCase
   */
function createSingleWikiMediaPageUrl(pageName, lang, doNotLowerCase) {
    let language = 'en';
    if (lang) {
        language = lang;
    }
	let action = "action=parse";
	let section = "section=0";
	let prop = 'prop=text&format=json';
    let subject = pageName.replace(/\s+/g, '_');
    if (!doNotLowerCase) {
        subject = subject.toLowerCase();
    }
	let page = 'page='+subject;
	const baseUrl = 'http://'+language+'.wikipedia.org/w/api.php';
	let sectionUrl = baseUrl+'?'+action+'&'+section+'&'+prop+'&'+page;
	return sectionUrl;
}
/**
 * Removes html and special characters from an html string.
 * @param {html string} content
 */
function removeHtml(content) {
    const stripedHtml = content.replace(/<[^>]+>/g, '');
    let unescapedHtml = unescape(stripedHtml).trim();
        // remove newlines
        unescapedHtml = unescapedHtml.replace(/\n|\r/g, '');
        // concat spaces
        unescapedHtml = unescapedHtml.replace(/\s{2,}/g, ' ');
        unescapedHtml = unescapedHtml.replace(/&#91;/g, '[');
        unescapedHtml = unescapedHtml.replace(/&#93;/g, ']');
        unescapedHtml = unescapedHtml.replace(/&#8239;/g, '->');
        unescapedHtml = unescapedHtml.replace(/&#123;/g, '{');
        unescapedHtml = unescapedHtml.replace(/&#125;/g, '}');
        unescapedHtml = unescapedHtml.replace(/&#160;/g, '');
        unescapedHtml = unescapedHtml.replace(/&amp;/g, '&');
    return unescapedHtml;
}
/**
 * Removes the various preambles for description content.
 */
function removeWikiDataPreambles(content) {
    // remove preambles
    const preamble = content.indexOf('This article is about');
    if (preamble !== -1) {
        const endOfSentence = content.indexOf('.');
        content = content.slice(endOfSentence+1, content.length);
    }
    const preamble2 = content.indexOf('For other uses, see');
    if (preamble2 !== -1) {
        const endOfSentence = content.indexOf('.');
        content = content.slice(endOfSentence+1, content.length);
    }
    const preamble3 = content.indexOf('For systemic bias on Wikipedia and how to reduce it');
    if (preamble3 !== -1) {
        const endOfSentence = content.indexOf('.');
        content = content.slice(endOfSentence+1, content.length);
    }
    const preamble4 = content.indexOf('For Wikipedia\'s editorial policy on avoiding bias');
    if (preamble4 !== -1) {
        const endOfSentence = content.indexOf('.');
        content = content.slice(endOfSentence+1, content.length);
    }
    return content;
}
/**
   * Convert the result content to an html node for easy access to the content.
   * Change this to div.childNodes to support multiple top-level nodes
   * @param htmlString
   */
function createElementFromHTML(htmlString) {
    var div = document.createElement('div');
    let page = '<div>'+htmlString+'</div>';
    div.innerHTML = page.trim();
    return div;
}

  /**
   * Remove the [edit] portion of the title.
   * @param HTMLDivElement
   */
function parseTitle(html) {
    let title =  html.getElementsByTagName('h2')[0].innerText;
    let bracket = title.indexOf('[');
    if (bracket > 0) {
      title = title.substr(0,bracket);
    }
    return title;
}
/**
 * Original function from this package.
 * @param number (optional) Takes the id of a particular artist on the data list
 * or return a randomly selected artist.
 */
function getArtist(number) {
	if (number === undefined) {
		return getRandomArtist();
	} else {
		var randomArtists = [];
		for (var i = 0; i < number; i++) {
		  randomArtists.push(getRandomArtist());
		}
	return randomArtists;
	}
};
function searchArtists(term) {
  	for (var i = 0; i < artists.length; i++) {
        var obj = artists[i];
        for(var key in obj) {
            var attrValue = obj[key];
            if (attrValue.toLowerCase().indexOf(term.toLowerCase()) !== -1) {
            	return obj;
            }
        }
    }
	return null;
 };
 function getBio (term) {
	var obj = searchArtists(term);
	if (obj) {
		var fileName = obj.Artist.replace(/ /g,"_");
		try {
			var artist = require('./data/'+fileName+'.json');
			return artist;
		} catch (error) {
			//console.log('problem: '+error);
		}
	}
	return null;
};
function artistsReport() {
	var total = 0;
	var bios = 0;
  	for (var i = 0; i < artists.length; i++) {
        var obj = artists[i];
        for(var key in obj) {
            var attrValue = obj[key];
            var bio = getBio(attrValue);
            if (bio) {
            	bios++;
            }
            total++;
        }
    }
    // console.log('bios: '+bios);
    // console.log('total:'+total);
	return bios;
 };
// repl commands to test.
// We are using ES6 so you have to have Babel installed globally.
// usage: babel-node
// var lib = require('./src/index.js');
// lib.getArtists
// lib.getArtist()
// lib.getArtist(5)
// lib.searchArtists('abie');
// lib.getBio('albert');
// lib.artistsReport()
