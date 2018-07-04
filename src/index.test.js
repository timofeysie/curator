import {expect} from 'chai';
import curator from'./index.js';
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
		console.log('lll', dataUrl);
		it('should contain a sparql string', function() {
			expect(dataUrl).to.equal('https://query.wikidata.org/sparql?format=json&query=%0A%20%20%20%20%20%20%20%20SELECT%20%3Fcognitive_bias%20%3Fcognitive_biasLabel%20%3Fcognitive_biasDescription%20WHERE%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20SERVICE%20wikibase%3Alabel%20%7B%20%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20bd%3AserviceParam%20wikibase%3Alanguage%20%22%5BAUTO_LANGUAGE%5D%2Cen%22.%20%0A%20%20%20%20%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%20%20%20%20%20%20%3Fcognitive_bias%20wdt%3AP31%20wd%3AQ1127759.%0A%20%20%20%20%20%20%20%20%7D%0A%09%09LIMIT%201000');
		});
		it('should contain the base url for a sparql API query', function() {
			expect(dataUrl).to.contain('https://query.wikidata.org/sparql');
		});
	});

	// createWikiMediaUrl: createWikiMediaUrl,
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

	// parseWikiMediaResult: parseWikiMediaResult,
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

	// createSingleWikiMediaPageUrl: createSingleWikiMediaPageUrl,
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
			var artist = { Artist: 'Abie Loy Kemarre'}
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
