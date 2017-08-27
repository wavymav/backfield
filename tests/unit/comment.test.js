'use strict'

const { app, expect } = require('../common')

// Get a reference to the Player model
const Comment = app.models.Comment

describe('Player Validation', () => {
  it('should reject a content less than 3 characters', () => (
    Comment.create({
      content: 'a',
      playerId: 1
    })
    .then(res => Promise.reject('Comment should not be created'))
    .catch(err => {
      expect(err.message).to.contain('Content must be at least 3 characters')
      expect(err.statusCode).to.be.equal(422)
    })
  ))
})
