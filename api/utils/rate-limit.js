/**
 * @summary - Rate Limiter
 *
 * This wraps around npm's package called `express-rate-limit` and
 * makes it possible to rate limit requests on a per-route basis
 */

// Dependencies
const rateLimit = require('express-rate-limit');

module.exports = {
  /**
   * @method limit
   * @param {number} [time]      - Time in minutes before limit resets
   * @param {number} [amount]    - Amount of requests allowed
   * @param {string} [message] - Optional message to return if limit is reached
   *
   * @default
   * Time   :   1 minute
   * Amount :  20 requests
   * Message: 'Too many subsequent requests'
   */

  limit: function(time = 1, amount = 20, message, next) {
    const _limiter = rateLimit({
      windowMs: time * 60 * 1000,
      max: amount,
      message: message || 'Too many subsequent requests',
    });

    return _limiter;
  },
};
