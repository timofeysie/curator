var artists = require('./data/artists.json');
var uniqueRandomArray = require('unique-random-array');
var getRandomArtist = uniqueRandomArray(artists);
module.exports = {
  	getArtists: artists,
  	getArtist: getArtist,
  	searchArtists: searchArtists,
  	getBio: getBio
};
function getArtist(number) {
	if (number === undefined) {
		return getRandomArtist();
	} else {
		randomArtists = [];
		for (var i = 0; i < number; i++) {
		randomArtists.push(getArtist());
		}
	return randomArtists;
	}
}
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
 }
 function getBio (term) {
	var obj = this.searchArtists(term);
	if (obj) {
		var fileName = obj.Artist.replace(/ /g,"_");
		try {
			var artist = require('./data/'+fileName+'.json');
			return artist;
		} catch (error) {
			console.log('problem: '+error);
		}
	}
	return null;
}
// repl commands to test:
// var lib = require('./src/index.js');
// lib.getArtists
// lib.getArtist()
// lib.searchArtists('abie');
// lib.getBio('albert');
