const express = require('express')

// import router for the notes
const notesRouter = require('./notes')

const app = express()

app.use('/notes', notesRouter)

module.exports = app