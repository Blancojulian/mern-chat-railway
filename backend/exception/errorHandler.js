import HttpError from "./HttpError.js";

export default function errorHandler (err, req, res, next) {
    console.log("Middleware Error Hadnling");
    let errStatus = err.statusCode || 500;
    let errMsg = err.message || 'Ocurrio un error';
    /*
    if (err.name === 'CastError' && err.kind === 'ObjectId') {
        errStatus = 404;
        errMsg = 'Recurso no encontrado';
    }*/
    res.status(errStatus).json({
        success: false,
        status: errStatus,
        message: errMsg,
        stack: process.env.NODE_ENV === 'development' ? err.stack : null
    })
}

export function notFound(req, res, next) {
    next(new HttpError(404, `Not Found - ${req.originalUrl}`));
}