import HttpError from "../exception/HttpError.js";
import User from "../models/User.js";
import { isValidObjectId } from "mongoose";
import asyncHandler from "../utils/asyncHandler.js";

export const getUser = asyncHandler( async (req, res) => {

    const { id } = req.params;
    if (!id || !isValidObjectId(id)) {
        throw new HttpError(400, 'Debe enviar un Id del usuario valido');
    }
    const userFound = await User.findOne({_id: id}).exec();
    if (!userFound) {
        throw new HttpError(404, 'Usuario no encontrado');
    }
    res.status(200).json(userFound);
    
});

export const getAllUsers = asyncHandler( async (req, res) => {

    const users = await User.find();
    res.status(200).json(users);
    
});

//no se usa en el frontend
export const getUserProfile = asyncHandler( async (req, res) => {
    
    const user = await User.findById(req.user._id);
    if (!user) {
        throw new HttpError(404, 'Usuario no encontrado');
    }
    
    res.status(200).json({mensaje: 'get profile usuario', user});
});

export const updateUserProfile = asyncHandler( async (req, res) => {

    const { nombre, apellido, email, password } = req.body;
    if (!nombre && !apellido && !email && !password) {
        throw new HttpError(400, 'Debe enviar campo para modificar: nombre, apelligo, mail o contraseña');
    }
    const user = await User.findById(req.user._id);
    if (!user) {
        throw new HttpError(404, 'Usuario no encontrado')
    }
    
    const duplicateEmail = email ? (await User.findOne({email})) : null;
    if (duplicateEmail && duplicateEmail._id.toString() !== user._id.toString()) {
        throw new HttpError(400, 'El email se encuentra en uso')
    }
    
    user.nombre = nombre || user.nombre;
    user.apellido = apellido || user.apellido;
    user.email = email || user.email;
    user.password = password || user.password;
    user.save();
    const userInfo = {
        _id: user._id,
        nombre: user.nombre,
        apellido: user.apellido,
        email: user.email
    }
    res.status(200).json(userInfo);    
});