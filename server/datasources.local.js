'use strict'

require('dotenv').config()

const mongodbUrl = process.env.MONGODB_URL

if (mongodbUrl) {
  console.log('Using MongoDB url:', mongodbUrl)

  const dataSources = {
    db: {
      name: 'db',
      connector: 'mongodb',
      url: mongodbUrl
    }
  }

  module.exports = dataSources
}
