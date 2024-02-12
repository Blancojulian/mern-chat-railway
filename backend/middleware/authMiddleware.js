import HttpError from "../exception/HttpError.js";
import User from "../models/User.js";
import asyncHandler from "../utils/asyncHandler.js";
import { getPayload } from "../utils/tokenJWT.js";

const authMiddleware = asyncHandler(async (req, res, next) => {
    const token = req?.cookies?.jwt;
    let payload = null;
    let user = null;
    //console.log(req);
    if (!token) {
        throw new HttpError(401, 'No autorizado, no posee token');
    }

    try {
        payload = getPayload(token);
        user = await User.findOne({_id: payload.userId}).select('-password');
    } catch (err) {
        throw new HttpError(401, 'No autorizado, token invalido');
    }
    if (!user) {
        throw new HttpError(401, 'No autorizado, usuario desconocido');
    }
    req.user = user;
    req.rol = payload.userRol;

    next();
    
});

export default authMiddleware;