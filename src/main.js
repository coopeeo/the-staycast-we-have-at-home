import express from "express";
import https from "https";
import fs from "fs";
import routes from "./routes/index.js"; // Assuming you have an index.js that exports all your routes
import dotenv from 'dotenv'
const app = express();
dotenv.config()

//app.use(express.static("public"));

routes.forEach(route => {
    app.use(route.path, route.router);
});

app.disable("x-powered-by");



https.createServer({ key: fs.readFileSync("keys/priv.pem"), cert: fs.readFileSync("keys/cert.pem") }, app).listen(process.env.PORT || 443, () => {
  console.log(`Server is running at https://localhost:${process.env.PORT || 443}`);
});
