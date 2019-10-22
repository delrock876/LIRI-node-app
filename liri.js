require("dotenv").config()

const keys = require("./keys.js")
const moment = require('moment')
const axios = require('axios')
const fs = require('fs')
const Spotify = require('node-spotify-api')
const spotify = new Spotify(keys.spotify)

let command = process.argv[2]

//   Search concert
const concertThis = _ => {
  artists = process.argv[3]
  axios.get(`https://rest.bandsintown.com/artists/${artists}/events?app_id=codingbootcamp`)
    .then(({ data }) => {
      if (data.length === 0) {
        console.log('This artist is currently not on tour')
      } else {
        data.forEach(({ venue, datetime }) => {
          console.log(`
          Venue: ${venue.name}
          Location : ${venue.city}, ${venue.country}
          Date: ${moment(datetime).format("MM / DD / YYYY")}
          `)
        })
      }
    })
    .catch(e => console.log(e))
}

//  Search spotify
const spotifyThis = _ => {
  songTitle = process.argv[3]
  spotify.search({ type: 'track', query: `${songTitle}`, limit: 3 })
    .then(({ tracks: { items } }) => {
      if (items.length === 0) {
        console.log('Nothing here')
        //the sign by ace of base
      } else {
        console.log(`
      Artist(s): ${items[0].artists[0].name}
      Track Name: ${items[0].name}
      Preview Song: ${items[0].preview_url}
      Album: ${items[0].album.name}
  `)
      }
    })
}

//movie this

const movieThis = _ => {
  movie = process.argv[3]
  axios.get(`https://www.omdbapi.com/?t=${movie}&apikey=trilogy&`)
    .then(({ data }) => {
      if (movie) {
        console.log(`
  Title: ${data.Title}
  Release Year:  ${data.Year}
  IMBD Rating:  ${data.Ratings[0].Value}
  Rotten Tomatoes Rating:  ${data.Ratings[1].Value}
  Country Produced:  ${data.Country}
  Language:  ${data.Language}
  Actors:  ${data.Actors}
  Plot:
  ${data.Plot}`)
        //   //    ```
      } else {
        axios.get(`https://www.omdbapi.com/?t=Cats&apikey=trilogy&`)
          .then(({ data }) => {
            // console.log(data)
            console.log(
              `You should watch Cats! Check it out here: https://www.imdb.com/title/${data.imdbID}/`)
            console.log('It may or not be on Netflix!')

          })
      }
    })
}

switch (command) {

  case 'concert-this':
    concertThis()
    break

  case 'spotify':
    spotifyThis()
    break

  case 'movie-this':
    movieThis()
    break
}




// //   * `do-what-it-says`

//   // * Using the`fs` Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.

//   //   * It should run`spotify-this-song` for "I Want it That Way," as follows the text in `random.txt`.

//   //    * Edit the text in random.txt to test out the feature for movie - this and concert - this.