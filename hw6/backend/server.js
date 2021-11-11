import express from 'express';
import cors from 'cors';
import guessRoute from './routes/guess';

const app = express(); 

// init middleware
app.use(cors());

// defining routes
app.use('/api/guess', guessRoute);

// define server
const PORT = process.env.PORT || 4000;
app.listen(PORT, ()=>{console.log(`Server is running on port ${PORT}`)})
