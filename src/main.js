import express from "express";
import https from "https";
import fs from "fs";
const app = express();
const port = 3000;

app.use(express.static("../public"));




https.createServer({ key: fs.readFileSync("keys/priv.pem"), cert: fs.readFileSync("keys/cert.pem") }, app).listen(port || 443, () => {
  console.log(`Server is running at https://localhost:${port || 443}`);
});
