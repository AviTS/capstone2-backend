class ExpressError extends Error {
  constructor(message, status) {
    super();
    this.message = message;
    this.status = status;
    if (process.env.NODE_ENV !== 'test') {
      console.error(this.stack);
    }
  }
}

class DuplicateBookError extends ExpressError {
  constructor(message = 'This book already exists') {
    super(message, 600);
  }
}

class BadRequestError extends ExpressError {
  constructor(message = 'Bad Request') {
    super(message, 400);
  }
}

class NotFoundError extends ExpressError {
  constructor(message = 'Not Found') {
    super(message, 404);
  }
}

class UnauthorizedError extends ExpressError {
  constructor(message = 'Unauthorized') {
    super(message, 401);
  }
}

class ForbiddenError extends ExpressError {
  constructor(message = 'Bad Request') {
    super(message, 403);
  }
}

module.exports = {
  ExpressError,
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
  ForbiddenError,
  DuplicateBookError,
};
