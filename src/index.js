var artists = require('./data/artists.json');
var uniqueRandowmArray = require('unique-random-array');
module.exports = {
  getArtists: artists,
  getArtist: uniqueRandowmArray(artists)
};