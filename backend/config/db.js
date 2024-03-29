//conection file
import mongoose from 'mongoose'

const connectDB = async () => {

    try{
        //connection return promise, соеденение с базой MongoDB
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useCreateIndex: true
        })

        console.log(`MongoDB Connect ${conn.connection.host}`);
    } catch(error) {
        console.error(`Error ${error.message}`)
        process.exit(1)
    }
}


export default connectDB