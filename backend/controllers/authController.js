import HttpError from "../exception/HttpError.js";
import User from "../models/User.js";
import asyncHandler from "../utils/asyncHandler.js";
import { generateAccessToken } from "../utils/tokenJWT.js";


export const handleLogin = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        throw new HttpError(400, 'Debe enviar mail y contraseña');
    }
    const userFound = await User.findOne({email});
    //const result = !userFound || !await userFound?.compararPassword(password);
    const result = !userFound?.compararPassword(password);
    if (result) {
        throw new HttpError(400, 'Email o contraseña incorrecto');
    }
    const payload = {
        userId: userFound._id,
        userRol: 'invitado'
    };
    const token = generateAccessToken(payload);
    res.cookie('jwt', token, {
        httpOnly: true,
        secure: false,//true tira error
        sameSite: 'strict', // Prevent CSRF attacks, antes era None
        maxAge: 60 * 60 * 1000
    });
    res.status(200).json({
        _id: userFound._id,
        nombre: userFound.nombre,
        apellido: userFound.apellido,
        email: userFound.email,
      });
   
})

export const handleRegister = asyncHandler(async (req, res) => {
    const { nombre, apellido, email, password } = req.body;
    if (!nombre || !apellido || !email || !password) {
        throw new HttpError(400, 'Debe enviar nombre, apelligo, mail y contraseña');
    }

    const emailDuplicado = await User.findOne({email});

    if (emailDuplicado) {
        throw new HttpError(400, 'El email se encuentra en uso');
    }
    const user = await User.create({
        nombre,
        apellido,
        email,
        password
    })

    res.status(200).json({
        _id: user._id,
        nombre: user.nombre,
        apellido: user.apellido,
        email: user.email,
      });
})


export const handleLogout = asyncHandler( async (req, res) => {

    res.clearCookie("jwt");

    res.status(204).json({mensaje: 'logout usuario'});//con 204 no envia el json
});
