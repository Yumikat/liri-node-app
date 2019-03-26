require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);
var axios = require("axios");
var fs = require("fs");
var moment = require('moment');

var command = process.argv[2];
var userInput = process.argv.slice(3).join(" ");

function liri() {
    switch (command) {
        case "concert-this":
            axios.get("https://rest.bandsintown.com/artists/" + userInput + "/events?app_id=codingbootcamp").then(function (response) {
                console.log("Lineup: " + response.data[0].lineup);
                console.log("Name of venue: " + response.data[0].venue.name +
                    "\nVenue location: " + response.data[0].venue.city + ", " + response.data[0].venue.region +
                    "\nDate of the event: " + moment(response.data[0].datetime).format('MMMM Do YYYY, h:mm:ss a'));
            })
                .catch(function (error) {
                    console.log(error);
                });
            break;

        case "spotify-this-song":
            function song() {
                spotify
                    .search({ type: 'track', query: userInput })
                    .then(function (response) {
                        console.log("Artist: " + response.tracks.items[0].artists[0].name
                            + "\nThe song's name: " + response.tracks.items[0].name
                            + "\nA preview link of the song from Spotify: " + response.tracks.items[0].external_urls.spotify
                            + "\nThe album that the song is from: " + response.tracks.items[0].album.name);
                    })
                    .catch(function (err) {
                        console.log(err);
                    });
            }
            if (!userInput) {
                userInput = "The Sign Ace of Base";
                song(userInput);
            } else {
                song(userInput);
            };
            break;

        case "movie-this":
            function movie() {
                axios.get("http://www.omdbapi.com/?apikey=trilogy&" + "t=" + userInput).then(function (response) {
                    console.log("Title of the movie: " + response.data.Title
                        + "\nYear the movie came out: " + response.data.Year
                        + "\nIMDB Rating of the movie: " + response.data.Ratings[0].Value
                        + "\nRotten Tomatoes rating of the movie: " + response.data.Ratings[1].Value
                        + "\nCountry where the movie was produced: " + response.data.Country
                        + "\nLanguage: " + response.data.Language
                        + "\nPlot: " + response.data.Plot
                        + "\nActors: " + response.data.Actors);
                })
            };
            if (!userInput) {
                userInput = "Mr. Nobody";
                movie(userInput);
            } else {
                movie(userInput);
            };
            break;

        case "do-what-it-says":
            fs.readFile("random.txt", "utf8", function (error, data) {
                if (error) {
                    return console.log(error);
                }
                var output = data.split(",");
                var command = output[0];
                var userInput = output[1];
        });
            break;
        default:
            return console.log("Sorry, need a valid command!");
    }
}

liri();
