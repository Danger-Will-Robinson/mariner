const keys = require('../config/keys')
const express = require('express')
const router = new express.Router()

const google = require('googleapis')
const youTubeDataApi = google.google.youtube('v3')

const OAuth2 = google.google.auth.OAuth2
const oauth2Client = new OAuth2(keys.youTube.clientID, keys.youTube.clientSecret, [])

const User = require('../models/user-model')