import artists from './data/artists.json';
import uniqueRandomArray from 'unique-random-array';
// ES5 versions
// var artists = require('./data/artists.json');
// var uniqueRandomArray = require('unique-random-array');
var getRandomArtist = uniqueRandomArray(artists);

module.exports = {
  	getArtists: artists,
  	getArtist: getArtist,
  	searchArtists: searchArtists,
  	getBio: getBio,
  	artistsReport: artistsReport
};
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
    console.log('bios: '+bios);
    console.log('total:'+total);
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
