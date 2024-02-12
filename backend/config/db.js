import mongoose from "mongoose";


export default async function connectDB() {
    
    try {
        const connDB = await mongoose.connect(process.env.MONGO_URI)
        console.log(`Conectado a la base de datos ${connDB.connection.host}`);
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
}

