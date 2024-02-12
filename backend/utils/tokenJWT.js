import jwt from "jsonwebtoken";

export const generateAccessToken = (payload) => {

    return jwt.sign(
        payload,
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: process.env.EXPIRE_ACCESS_TOKEN }
    );
}

export const getPayload = token => jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);