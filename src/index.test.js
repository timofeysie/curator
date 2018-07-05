import {expect} from 'chai';
import curator from'./index.js';
import { sinon, spy, stub } from 'sinon';

// ES5 versions
// var expect = require('chai').expect;
// var curator = require('./index.js');

describe('curator', function() {

	/* --- createWikiDataUrl --- */
	describe('createWikiDataUrl', function () {
		const dataUrl = curator.createWikiDataUrl();
		it('should return a string', function() {
			expect(dataUrl).to.be.a('string');
		});
		it('should contain a sparql string', function() {
			expect(dataUrl).to.equal('https://query.wikidata.org/sparql?format=json&query=%0A%20%20%20%20%20%20%20%20SELECT%20%3Fcognitive_bias%20%3Fcognitive_biasLabel%20%3Fcognitive_biasDescription%20WHERE%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20SERVICE%20wikibase%3Alabel%20%7B%20%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20bd%3AserviceParam%20wikibase%3Alanguage%20%22%5BAUTO_LANGUAGE%5D%2Cen%22.%20%0A%20%20%20%20%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%20%20%20%20%20%20%3Fcognitive_bias%20wdt%3AP31%20wd%3AQ1127759.%0A%20%20%20%20%20%20%20%20%7D%0A%09%09LIMIT%201000');
		});
		it('should contain the base url for a sparql API query', function() {
			expect(dataUrl).to.contain('https://query.wikidata.org/sparql');
		});
	});

	/* --- createWikiMediaUrl --- */
	describe('createWikiMediaUrl', function () {
		const dataUrl = curator.createWikiMediaUrl(1);
		it('should return a string', function() {
			expect(dataUrl).to.be.a('string');
		});
		it('should contain a WikiMedia API call string', function() {
			expect(dataUrl).to.equal('http://en.wikipedia.org/w/api.php?action=parse&section=1&prop=text&format=json&page=List_of_cognitive_biases');
		});
		it('should contain the base url for a WikiMedia API call', function() {
			expect(dataUrl).to.contain('http://en.wikipedia.org/w/api.php');
		});
	});

	// /* --- parseWikiMediaResult --- */
	// describe('parseWikiMediaResult!', function () {
	// 	const callResult = {
	// 		"parse": {
	// 		  "title": "List of cognitive biases",
	// 		  "pageid": 510791,
	// 		  "text": {
	// 			"*": "<div class=\"mw-parser-output\"><h2><span id=\"Decision-making.2C_belief.2C_and_behavioral_biases\">"
	// 			}
	// 		}
	// 	}
	// 	let mockResponse = {
	// 		parse: parse(),
	// 		_body: callResult
	// 	}
	// 	const parseResult = curator.parseWikiMediaResult(mockResponse);
	// 	console.log('parseResult',parseResult);
	// 	it('should contain someone', function () {
	// 		expect(parseResult).to.equal(parseResult);
	// 	});
	// });

	// parseSingeWikiMediaPage: parseSingeWikiMediaPage,
	// describe('getArtists', function () {
	// 	it('should return a list of artists', function() {
	// 		expect(curator.getArtists).to.satisfy(isArrayOfObjects);

	// 		function isArrayOfObjects(array) {
	// 			return array.every(function(item) {
	// 				return typeof item === 'object';
	// 			});
	// 		}
	// 	});
	// 	it('should contain someone', function () {
	// 		var randomArtist = curator.getArtist();
	// 		expect(curator.getArtists).to.include(randomArtist);
	// 	});
	// });

	/* --- createSingleWikiMediaPageUrl --- */
	describe('createSingleWikiMediaPageUrl', function () {
		const dataUrl = curator.createSingleWikiMediaPageUrl('magical thinking');
		it('should return a string', function() {
			expect(dataUrl).to.be.a('string');
		});
		it('should contain a WikiMedia API call string', function() {
			expect(dataUrl).to.equal('http://en.wikipedia.org/w/api.php?action=parse&section=0&prop=text&format=json&page=magical_thinking');
		});
		it('should contain the base url for a WikiMedia API call', function() {
			expect(dataUrl).to.contain('http://en.wikipedia.org/w/api.php');
		});
	});

	/* ----- Original Tests --------- */
	describe('getArtists', function () {
		it('should return a list of artists', function() {
			expect(curator.getArtists).to.satisfy(isArrayOfObjects);

			function isArrayOfObjects(array) {
				return array.every(function(item) {
					return typeof item === 'object';
				});
			}
		});
		it('should contain someone', function () {
			var randomArtist = curator.getArtist();
			expect(curator.getArtists).to.include(randomArtist);
		});
	});
	describe('getArtist', function () {
		it('should return a searched for artist', function() {
			var artist = { Artist: 'Abie Loy Kemarre'};
			expect(curator.searchArtists('abie') === artist);
		});
		it('should return null if the artist is not found', function() {
			expect(curator.searchArtists('not there') === null);
		});
		it('should return an array of random names if passed an arg', function() {
			var random = curator.getArtist(3);
			expect(random).to.have.length(3);
			random.forEach(function(item) {
				expect(curator.getArtists).to.include(item);
			})
		});
	});
	describe('getBio', function () {
		it('should return the bio of an artist', function() {
			expect(curator.getBio('albert') === null);
		});
	});
	describe('artistsReport', function () {
		it('should return the number of artists with bios', function() {
			var artist = { }
			expect(curator.artistsReport() === 27);
		});
	});
});
