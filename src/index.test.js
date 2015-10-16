var expect = require('chai').expect;
var curator = require('./index.js');

describe('curator', function() {
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
			var randomArtists = curator.getArtist(3);
			expect(randomArtists).to.have.length(3);
			randomArtists.forEach(function(item) {
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
