import artists from './data/artists.json';
import uniqueRandomArray from 'unique-random-array';
// ES5 versions
// var artists = require('./data/artists.json');
// var uniqueRandomArray = require('unique-random-array');
var getRandomArtist = uniqueRandomArray(artists);
import * as wdk from 'wikidata-sdk';

module.exports = {
	createWikiDataUrl: createWikiDataUrl,
	createWikiMediaUrl: createWikiMediaUrl,
	parseWikiMediaResult: parseWikiMediaResult,
	parseSingeWikiMediaPage: parseSingeWikiMediaPage,
	createSingleWikiMediaPageUrl: createSingleWikiMediaPageUrl,
  	getArtists: artists,
  	getArtist: getArtist,
  	searchArtists: searchArtists,
  	getBio: getBio,
  	artistsReport: artistsReport
};
/**
 * @returns data.results.bindings
 */
function createWikiDataUrl() {
    const authorQid = 'Q1127759'
    const sparql = `
        SELECT ?cognitive_bias ?cognitive_biasLabel ?cognitive_biasDescription WHERE {
            SERVICE wikibase:label { 
                bd:serviceParam wikibase:language "[AUTO_LANGUAGE],en". 
            }
            ?cognitive_bias wdt:P31 wd:Q1127759.
        }
		LIMIT 1000`
	const url = wdk.sparqlQuery(sparql);
	return url;
}
/** Create a url for a WikiMedia API call.
 * Currently set to return a list of cognitive bias. */ 
function createWikiMediaUrl(sectionNum) {
    let action = 'action=parse';
    let section = 'section='+sectionNum;
    let prop = 'prop=text&format=json';
    let page = 'page=List_of_cognitive_biases';
    const baseUrl = 'http://en.wikipedia.org/w/api.php';
    let sectionUrl = baseUrl+'?'+action+'&'+section+'&'+prop+'&'+page;
	return sectionUrl;
}
/** Parse the result of a WikiMedia API call to return a text version of
 * multiple rows of name and definition pairs.
 */
function parseWikiMediaResult(res) {
    console.log('res',res);
    let parseResult;
    try {
        parseResult = res.json();
    } catch (err) {
        console.log('TypeError: res.json is not a function');
    }
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
   */
function createSingleWikiMediaPageUrl(pageName) {
	let action = "action=parse";
	let section = "section=0";
	let prop = 'prop=text&format=json';
	let subject = pageName.replace(/\s+/g, '_').toLowerCase();
	let page = 'page='+subject;
	const baseUrl = 'http://en.wikipedia.org/w/api.php';
	let sectionUrl = baseUrl+'?'+action+'&'+section+'&'+prop+'&'+page;
	return sectionUrl;
}
/**
 * Parse the result from an API call to get a single subject page on Wikipedia.
 * @param res 
 */
function parseSingeWikiMediaPage(res) {
	const parse = res.json();
	const content = parse['parse']['text']['*'];
	let one = this.createElementFromHTML(content);
	const desc = one.getElementsByClassName('mw-parser-output')[0].children;
	let descriptions = [];
	for (let i = 0; i < desc.length;i++) {
	descriptions.push(desc[i].innerText);
	}
	return descriptions;
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
