import express from 'express';
import bodyParser from 'body-parser';
import routes from './src/routes/index.js';
import dotenv from 'dotenv';
import cors from 'cors';
dotenv.config();
const app = express();
const PORT = 5000
app.use(cors())
app.use(bodyParser.json());
app.use('/api',routes);
app.get('/', (req, res) => {
    res.send('Welcome to Express!');
});

app.listen(PORT, () => console.log(`Server running on port: http://localhost:${PORT}`));