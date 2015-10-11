var artists = require('./data/artists.json');
var uniqueRandowmArray = require('unique-random-array');
module.exports = {
  getArtists: artists,
  getArtist: uniqueRandowmArray(artists)
};
// repl commands to test
// var lib = require('./src/index.js');
// lib.getArtists
// lib.getArtist()