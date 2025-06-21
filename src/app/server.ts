
import {Server} from 'http';
import app from './app';
import mongoose from 'mongoose';

let server: Server;
const PORT = 5000;
async function main(){
    try{
        await mongoose.connect('mongodb+srv://user:Visa06t6cXmDUiFr@cluster0.1iyz9.mongodb.net/library-management?retryWrites=true&w=majority&appName=Cluster0');
        console.log('Connected to mongodb using Mongoose')
        server = app.listen(PORT,()=>{
            console.log(`app is listening on port ${PORT} `)
        })
    }
    catch(error){
        console.log(error)
    }
}
main()