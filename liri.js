require("dotenv").config()

const keys = require("./keys.js")
const moment = require('moment')
const axios = require('axios')
const fs = require('fs')
// const spotify = new Spotify(keys.spotify)

let command = process.argv[2]


// Make it so liri.js can take in one of the following commands:
//   * `concert-this`
const concertThis = _ => {
  artists = process.argv[3]
  axios.get(`https://rest.bandsintown.com/artists/${artists}/events?app_id=codingbootcamp`)
    .then(({ data }) => {
      if (data.length === 0) {
        console.log('This artist is currently not on tour')
      } else {
        data.forEach(({ venue, datetime}) => {
          console.log(`
          Venue: ${venue.name}
          Location : ${venue.city}, ${venue.country}
          Date: ${datetime}
          
          `)
        })
      }
      // console.log(data)
    })
    // * Name of the venue
    //   * Venue location
    //     * Date of the Event(use moment to format this as "MM/DD/YYYY")
    .catch(e => console.log(e))
}


switch (command) {
  case 'concert-this':
    concertThis()
    break
}

//   * `spotify-this-song`

// axios.get(``)
// .then(song =>{

//     //  * Artist(s)

//     // * The song's name

//     //   * A preview link of the song from Spotify

//     //     * The album that the song is from

//     //       * If no song is provided then your program will default to "The Sign" by Ace of Base.

// })
// //   * `movie-this`

// axios.get()
// .then( movie =>{

//   // ```
//   //      * Title of the movie.
//   //      * Year the movie came out.
//   //      * IMDB Rating of the movie.
//   //      * Rotten Tomatoes Rating of the movie.
//   //      * Country where the movie was produced.
//   //      * Language of the movie.
//   //      * Plot of the movie.
//   //      * Actors in the movie.
//   //    ```

//   //   * If the user doesn't type a movie in, the program will output data for the movie 'Mr.Nobody.'

//   //     * If you haven't watched "Mr. Nobody," then you should: <http://www.imdb.com/title/tt0485947/>

//   //       * It's on Netflix!

// })

// //   * `do-what-it-says`

//   // * Using the`fs` Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.

//   //   * It should run`spotify-this-song` for "I Want it That Way," as follows the text in `random.txt`.

//   //    * Edit the text in random.txt to test out the feature for movie - this and concert - this.