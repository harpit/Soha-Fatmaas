import mongoose from "mongoose";

const connectdb = async ()=>{
    try {
        const connect = await mongoose.connect(process.env.dbUrl);
        console.log(`Database Connected Successfully ${connect.connection.host}`);
    } catch (error) {
        console.log(`Error Occured ${error}`);
    }
}
export default connectdb;