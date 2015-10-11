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
	});
	describe('getBio', function () {
		it('should return the bio of an artist', function() {
			var artist = { }
			expect(curator.getBio('albert') === null);
		});
	});
});