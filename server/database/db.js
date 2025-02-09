import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
const Connection = async () => {
    const DB_URI = `mongodb://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@gmailclone-shard-00-00.8rgjd.mongodb.net:27017,gmailclone-shard-00-01.8rgjd.mongodb.net:27017,gmailclone-shard-00-02.8rgjd.mongodb.net:27017/?ssl=true&replicaSet=atlas-l9nc8n-shard-0&authSource=admin&retryWrites=true&w=majority&appName=GmailClone`;

    try {
        await mongoose.connect(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('Database Connected Successfully');
    } catch (err) {
        console.log('Error while Connecting with Database', err);
    }
};

export default Connection;
