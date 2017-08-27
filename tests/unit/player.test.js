'use strict'

const { app, expect } = require('../common')

// Get a reference to the Player model
const Player = app.models.Player

describe('Player Validation', () => {
  it('should reject a firstName less than 3 characters', () => (
    Player.create({
      firstName: 'S',
      lastName: 'Taylor',
      jerseyNumber: 21,
      position: 'DB',
      team: 'Washington Redskins'
    })
    .then(res => Promise.reject('Player should not be created'))
    .catch(err => {
      expect(err.message).to.contain('First name should be at least 3 characters')
      expect(err.statusCode).to.be.equal(422)
    })
  ))

  it('should reject a lastName less than 3 characters', () => (
    Player.create({
      firstName: 'Sean',
      lastName: 'T',
      jerseyNumber: 21,
      position: 'DB',
      team: 'Washington Redskins'
    })
    .then(res => Promise.reject('Player should not be created'))
    .catch(err => {
      expect(err.message).to.contain('Last name should be at least 3 characters')
      expect(err.statusCode).to.be.equal(422)
    })
  ))

  it('should reject a duplicate firstName and lastName', () => (
    Promise.resolve()
      .then(() => Player.create({
        firstName: 'Sean',
        lastName: 'Taylor',
        jerseyNumber: 21,
        position: 'DB',
        team: 'Washington Redskins'
      }))
      .then(() => Player.create({
        firstName: 'Sean',
        lastName: 'Taylor',
        jerseyNumber: 21,
        position: 'DB',
        team: 'Washington Redskins'
      }))
      .then(res => Promise.reject('Product should not be created'))
      .catch(err => {
        expect(err.message).to.contain('`firstName` is not unique (value: "Sean"); `lastName` is not unique (value: "Taylor").')
        expect(err.statusCode).to.be.equal(422)
      })
  ))

  it('should reject a jerseyNumber less than 1', () => (
    Player.create({
      firstName: 'Phil',
      lastName: 'Jackson',
      jerseyNumber: 0,
      position: 'QB',
      team: 'Washington Redskins'
    })
    .then(res => Promise.reject('Player should not be created'))
    .catch(err => {
      expect(err.message).to.contain('Jersey number should be a positive integer greater than 1')
      expect(err.statusCode).to.be.equal(422)
    })
  ))

  it('should reject a jerseyNumber greater than 99', () => (
    Player.create({
      firstName: 'Todd',
      lastName: 'Michaels',
      jerseyNumber: 100,
      position: 'RB',
      team: 'Washington Redskins'
    })
    .then(res => Promise.reject('Player should not be created'))
    .catch(err => {
      expect(err.message).to.contain('Jersey number should be no greater than 99')
      expect(err.statusCode).to.be.equal(422)
    })
  ))

  it('should reject a position thats not abbreviated', () => (
    Player.create({
      firstName: 'Todd',
      lastName: 'Michaels',
      jerseyNumber: 100,
      position: 'Running Back',
      team: 'Washington Redskins'
    })
    .then(res => Promise.reject('Player should not be created'))
    .catch(err => {
      expect(err.message).to.contain('An invalid position was given. Must give the abbreviated i.e. QB')
      expect(err.statusCode).to.be.equal(422)
    })
  ))

  it('should reject a invalid team name', () => (
    Player.create({
      firstName: 'Todd',
      lastName: 'Michaels',
      jerseyNumber: 100,
      position: 'Running Back',
      team: 'Redskins'
    })
    .then(res => Promise.reject('Player should not be created'))
    .catch(err => {
      expect(err.message).to.contain('An invalid team was given')
      expect(err.statusCode).to.be.equal(422)
    })
  ))
})
