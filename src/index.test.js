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
	/* --- removeHtml & removeWikiDataPreambles --*/
	describe('removeHtml & removeWikiDataPreambles', function () {
		const cultural = `<div>
		<div role="note" class="hatnote navigation-not-searchable">
		   <span class="plainlinks selfreference noprint">
		   For <a href="/wiki/Systemic_bias" title="Systemic bias">
		   systemic bias</a> 
		   on Wikipedia and how to reduce it, see <a href="/wiki/Wikipedia:Systemic_bias" title="Wikipedia:Systemic bias">
		   Wikipedia:Systemic bias</a>.
		   </span>
		</div>
		<div role="note" class="hatnote navigation-not-searchable">
		   <span class="plainlinks selfreference noprint">
		   For Wikipedia's editorial policy on avoiding bias, see <a href="/wiki/Wikipedia:Neutral_point_of_view" title="Wikipedia:Neutral point of view">
		   Wikipedia:Neutral point of view</a>.
		   </span>
		</div>
		<table class="plainlinks metadata ambox ambox-style ambox-More_footnotes" role="presentation">
		   <tbody>
			  <tr>
				 <td class="mbox-image">
					<div style="width:52px">
					   <img alt="" src="//upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Text_document_with_red_question_mark.svg/40px-Text_document_with_red_question_mark.svg.png" width="40" height="40" srcset="//upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Text_document_with_red_question_mark.svg/60px-Text_document_with_red_question_mark.svg.png 1.5x, //upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Text_document_with_red_question_mark.svg/80px-Text_document_with_red_question_mark.svg.png 2x" data-file-width="48" data-file-height="48" />
					</div>
				 </td>
				 <td class="mbox-text">
					<div class="mbox-text-span">
					   This article includes a <a href="/wiki/Wikipedia:Citing_sources" title="Wikipedia:Citing sources">
					   list of references</a>, 
					   but <b>its sources remain unclear</b> because it has <b>insufficient <a href="/wiki/Wikipedia:Citing_sources#Inline_citations" title="Wikipedia:Citing sources">inline citations</a></b>.<span class="hide-when-compact"> Please help to <a href="/wiki/Wikipedia:WikiProject_Fact_and_Reference_Check" title="Wikipedia:WikiProject Fact and Reference Check">improve</a> this article by <a href="/wiki/Wikipedia:When_to_cite" title="Wikipedia:When to cite">introducing</a> more precise citations.</span>  <small><i>(July 2008)</i></small><small class="hide-when-compact"><i> (<a href="/wiki/Help:Maintenance_template_removal" title="Help:Maintenance template removal">Learn how and when to remove this template message</a>)</i></small>
					</div>
				 </td>
			  </tr>
		   </tbody>
		</table>
		<p>
		   <b>Cultural bias</b> is the phenomenon of interpreting and judging phenomena by standards inherent to one's own culture. The phenomenon is sometimes considered a problem central to social and human sciences, such as <a href="/wiki/Economics" title="Economics">economics</a>, <a href="/wiki/Psychology" title="Psychology">psychology</a>, <a href="/wiki/Anthropology" title="Anthropology">anthropology</a>, and <a href="/wiki/Sociology" title="Sociology">sociology</a>. Some practitioners of the aforementioned fields have attempted to develop methods and theories to compensate for or eliminate cultural bias.
		</p>
		<p>
		   Cultural bias occurs when people of a culture make assumptions about conventions, including conventions of language, notation, proof and evidence. They are then accused of mistaking these assumptions for laws of logic or nature. Numerous such biases exist, concerning cultural norms for color, mate selection, concepts of justice, <a href="/wiki/Linguistics" title="Linguistics">linguistic</a> and logical validity, the acceptability of evidence, and taboos.
		</p>
	 </div>`;
		 const jsonObj = { "parse": {
			 "text": {
				 "*": cultural
		 	}
	 }}
		const unescapedHtml = curator.removeHtml(cultural);
		it('should not contain markup', function () {
			expect(unescapedHtml).to.not.contain('<');
		});
		const newContent = curator.removeWikiDataPreambles(unescapedHtml);
		it('should not contain the \`this article is about\` preamble', function () {
			expect(newContent).to.not.contain('This article is about');
		});
		it('should not contain the \'systemic bias \' preamble', function () {
			expect(newContent).to.not.contain('For systemic bias on Wikipedia and how to reduce it, see');
		});
		it('should not contain the \'editorial policy\' preamble', function () {
			expect(newContent).to.not.contain('For Wikipedia\'s editorial policy on avoiding bias, see');
		});
		//console.log('newContent',newContent);
	});

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
