import fs from "fs";
import express from 'express';
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
dotenv.config();
import connectionDB from './config/db.js';
import Authrouter from './routes/auth.routes.js';
import swagger from "swagger-ui-express";
import Courserouter from "./routes/course.routes.js";
import Categoryrouter from "./routes/category.routes.js";

const apiDocs = JSON.parse(
  fs.readFileSync(new URL("./swagger.json", import.meta.url), "utf-8")
);



const server = express();
server.use(express.json());
// CROS Policy Configuration
var corsOptions = {
  origin: "*", // allow all origins, or specify ["http://localhost:3000"]
  // methods: ["GET", "POST", "PUT", "DELETE"],
  // allowedHeaders: ["Content-Type", "Authorization"],
}
server.use(cors(corsOptions));
connectionDB();


if(process.env.NODE_ENV === 'dev'){
  server.use(morgan('dev'));
}
server.use('/api-docs', swagger.serve, swagger.setup(apiDocs)); // swagger api endpoint

server.use('/api/auth',Authrouter); // authentication 
server.use('/api/course',Courserouter);
server.use('/api/category',Categoryrouter);


server.get('/', (req, res) => {
  res.send('Hello World!');
});
server.use('/api/auth',Authrouter);
const PORT = process.env.PORT || 3400;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});