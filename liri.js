require("dotenv").config();
var keys = require("./keys.js");
// var spotify = new Spotify(keys.spotify);
var axios = require("axios");


var command = process.argv[2];
var userInput = process.argv.slice(3).join(" ");

// console.log(process.argv);
// console.log(command);
// console.log(userInput);

switch(command) {
    case "concert-this": 
    axios.get("https://rest.bandsintown.com/artists/" + userInput + "/events?app_id=codingbootcamp").then(function (response) {
        console.log(response[0]);
      })
      .catch(function (error) {
        console.log(error);
      });
    console.log("Need to use Bands In Town " + userInput);
    break;
    case "spotify-this-song": spotify
    .search({ type: 'track', query: userInput })
    .then(function(response) {
      console.log(response);
    })
    .catch(function(err) {
      console.log(err);
    });
    console.log("Need to use Spotify " + userInput);
    break;
    case "movie-this": console.log("Need to use OMDB "+ userInput);
    break;
    case "do-what-it-says": console.log("Need to follow instructions in random.txt "+ userInput);
    break;
    default:
    return console.log("Sorry, need a valid command!");
}
// commands:
// conert-this
// spotify-this-song 
// movie-this
// do-what-it-says 
