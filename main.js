import express from "express";
import http from "http";
import https from "https";
import fs from "fs";

const app = express();
const port = 3000;

app.use(express.static("public"));

http.createServer(app).listen(8080, () => {
  console.log(`Server is running at http://localhost:8080`);
});
https.createServer({ key: fs.readFileSync("keys/priv.pem"), cert: fs.readFileSync("keys/cert.pem") }, app).listen(port || 443, () => {
  console.log(`Server is running at https://localhost:${port || 443}`);
});
