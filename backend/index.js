import express from 'express';
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
dotenv.config();
import connectionDB from './config/db.js';
connectionDB();
const server = express();
server.use(cors());

server.get('/', (req, res) => {
  res.send('Hello World!');
});

if(process.env.NODE_ENV === 'dev'){
  server.use(morgan('dev'));
}


const PORT = process.env.PORT || 3400;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});