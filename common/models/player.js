'use strict'

/* eslint max-len: 0 */

module.exports = function(Player) {
  /**
   * Validates minimal length of firstName
   */
  Player.validatesLengthOf('firstName', {
    min: 3,
    message: {
      min: 'First name should be at least 3 characters',
    }
  })

  /**
   * Validates minimal length of lastName
   */
  Player.validatesLengthOf('lastName', {
    min: 3,
    message: {
      min: 'Last name should be at least 3 characters',
    }
  })

  /**
   * Validates uniqueness of the firstName
   */
  Player.validatesUniquenessOf('firstName')

  /**
   * Validates uniqueness of the lastName
   */
  Player.validatesUniquenessOf('lastName')

  /**
   * Validate the jersey number to be a positive integer greater than 1
   */
  const positiveInteger = /^[1-9]*$/
  function validatePositiveInteger(err) {
    if (!positiveInteger.test(this.jerseyNumber)) {
      err()
    }
  }

  Player.validate('jerseyNumber', validatePositiveInteger, {
    message: 'Jersey number should be a positive integer greater than 1'
  })

  /**
   * Validate the jersey number is no greater than 99
   */
  function validateJerseyNumberMax(err, done) {
    const jerseyNumber = this.jerseyNumber

    process.nextTick(() => {
      const jerseyNumberLimit = 99
      if (jerseyNumberLimit < jerseyNumber) {
        err()
      }
      done()
    })
  }

  Player.validateAsync('jerseyNumber', validateJerseyNumberMax, {
    message: 'Jersey number should be no greater than 99'
  })

  /**
   * Validates the position
   */
  const positions = ['QB', 'RB', 'FB', 'OL', 'TE', 'WR', 'K', 'P', 'DL', 'LB', 'DB']
  function validatePosition(err) {
    if (!positions.includes(this.position)) {
      err()
    }
  }

  Player.validate('position', validatePosition, {
    message: 'An invalid position was given. Must give the abbreviated i.e. QB'
  })

  /**
   * Validates the team
   */
  const teams = [
    'Buffalo Bills',
    'Miami Dolphins',
    'New England Patriots',
    'New York Jets',
    'Baltimore Ravens',
    'Cincinnati Bengals',
    'Cleveland Browns',
    'Pittsburgh Steelers',
    'Pittsburgh Steelers',
    'Indianapolis Colts',
    'Houston Texans',
    'Jacksonville Jaguars',
    'Tennessee Titans',
    'Denver Broncos',
    'Kansas City Chiefs',
    'Los Angeles Chargers',
    'Oakland Raiders',
    'Dallas Cowboys',
    'New York Giants',
    'Philadelphia Eagles',
    'Washington Redskins',
    'Chicago Bears',
    'Detroit Lions',
    'Green Bay Packers',
    'Minnesota Vikings',
    'Atlanta Falcons',
    'Carolina Panthers',
    'LNew Orleans SaintsB',
    'Tampa Bay Buccaneers',
    'Arizona Cardinals',
    'Los Angeles Rams',
    'San Francisco 49ers',
    'Seattle Seahawks'
  ]

  function validateTeam(err) {
    if (!teams.includes(this.team)) {
      err()
    }
  }

  Player.validate('team', validateTeam, {
    message: 'An invalid team was given'
  })
}
