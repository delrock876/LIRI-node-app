require("dotenv").config()

const keys = require("./keys.js")
const moment = require('moment')
const axios = require('axios')
const fs = require('fs')
const spotify = new Spotify(keys.spotify)


// Make it so liri.js can take in one of the following commands:
//   * `concert-this`

//   * `spotify-this-song`

//   * `movie-this`

//   * `do-what-it-says`