import express from 'express';
import Connection from './database/db.js';
import routes from './routes/route.js';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.urlencoded({extended:true}));
app.use(express.json({extended:true}));
app.use('/',routes);
const PORT = 8000;

Connection(); // Call the database connection function

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
