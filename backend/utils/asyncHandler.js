/*
export default function errorHandler(callback) {
    return (req, res, next) => {
        try {
            callback(req, res, next)?.catch(err => next(err));
        } catch (err) {
            next(err);
        }
    }
}*/

export default function asyncHandler(callback) {
    return (req, res, next) => {
        const result = callback(req, res, next);
        //console.log(result instanceof Promise);

        result?.catch(err => {
            console.log('en el catch de error');
            next(err)
        });
    }
}

//si el controller es sync, parece que no necesita llamar a next, directamente pasa al error handleling