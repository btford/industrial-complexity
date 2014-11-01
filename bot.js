var fs = require('fs');
var twitter = require('twitter');

var nouns = fs.readFileSync('./nouns.txt', 'utf8').split(' ');

var twit = new twitter(require('./config.json'));

chooseYourComplex();
setInterval(chooseYourComplex, (1000 * 60 * 60 * 4)); // every four hours

function chooseYourComplex() {
  var noun = nouns.pop();
  fs.writeFileSync('./nouns.txt', nouns.join(' '));
  tweetAboutComplex(noun);
}

function tweetAboutComplex (name) {
  twit.updateStatus(name + ' industrial complex', function (err, data) {
    console.log('tweet was ' + (!!err ? '' : 'NOT ') + 'OKAY');
  });
}

