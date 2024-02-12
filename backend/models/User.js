import { Schema, model } from "mongoose";
import bcrypt from 'bcryptjs'

const userSchema = new Schema({
    nombre: {
        type: String,
        require: true
    },
    apellido: {
        type: String,
        require: true
    },
    email: {
        type: String,
        unique: true,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    refreshToken: String
},
{
    timestamps: true
});

userSchema.pre('save', async function (next) {
    
    if (!this.isModified('password')) {
        return next();
    }
    const saltWorkFactor = 10;
    const salt = await bcrypt.genSalt(saltWorkFactor);

    const hashPassword = await bcrypt.hashSync(this.password, salt);

    this.password = hashPassword;
    
    return next();
});

userSchema.methods.compararPassword = function(password) {
    //return bcrypt.compare(password, this.password).catch((e) => false);
    //const bool = bcrypt.compareSync(password, this.password);
    //console.log(bool);
    return bcrypt.compareSync(password, this.password);
}

export default model('User', userSchema)