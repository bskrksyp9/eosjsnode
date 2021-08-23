class AppError extends Error {

    constructor(message, statusCode) {
        super(message); //call's parent constructor

        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith('4') ? 'Fail' : 'Error';
        this.isOperational = true;

        Error.captureStackTrace(this, this.constructor);
    }

}

module.exports = AppError