import { connect as _connect } from 'mongoose';
const dbConnect =async ()=>{
    try {
        const connect = await _connect(process.env.MONGO_URL);
    console.log(`connected DB ${connect.connection.host}`);
    } catch (error) {
        console.log(error)
    }
    
}

export default dbConnect;