import dotenv from 'dotenv';
import dns from "dns";
import connectDB from './config/db';
import app from './app';

dns.setServers(["8.8.8.8", "1.1.1.1"]);
dotenv.config();

const PORT = process.env.PORT || 5050;

const startServer = async () => {
    try {
        await connectDB().then(()=>{
            app.listen(PORT, ()=>{
                console.log(`Server is running on port ${PORT}`);
            })
        });
    } catch (error) {
        console.error("Failed to start sever: ", error);
        process.exit(1);
    }
};

startServer();