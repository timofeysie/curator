var artists = require('./data/artists.json');
var uniqueRandowmArray = require('unique-random-array');
module.exports = {
  getArtists: artists,
  getArtist: uniqueRandowmArray(artists),
  searchArtists: function(term) {
  	console.log('term',term);
  	for (var i = 0; i < artists.length; i++) {
        var obj = artists[i];
        for(var key in obj) {
            var attrValue = obj[key];
            //console.log(key+' '+attrValue);
            if (attrValue.toLowerCase().indexOf(term.toLowerCase()) !== -1) {
            	console.log(key+' '+attrValue);
            	return attrValue;
            }
        }
    }
    return null;
  }
};
// repl commands to test
// var lib = require('./src/index.js');
// lib.getArtists
// lib.getArtist()
// lib.searchArtists('emily');