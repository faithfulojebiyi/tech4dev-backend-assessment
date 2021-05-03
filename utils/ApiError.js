/**
 * A custom class for handling Api related errors.
 * @class ApiError
 */
class ApiError extends Error {
  /** 
    * The Api Error Constructor.
      @param {string} statusCode - The http error statusCode
    * @param {string} message - the message to be returned to client
    * @constructor ApiError
    */

  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = ApiError;
