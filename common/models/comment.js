'use strict';

module.exports = function(Comment) {
  /**
   * Validates minimal length of firstName
   */
  Comment.validatesLengthOf('content', {
    min: 3,
    message: {
      min: 'Content must be at least 3 characters',
    }
  })
};
