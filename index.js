require("dotenv").config();
const express = require('express');
const cors = require("cors");
const path = require('path');
const router = require('./Router/router');
require('./DB/connection');

const pfServer = express();
pfServer.use(cors());
pfServer.use(express.json());
pfServer.use(router); 
pfServer.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const PORT = 3000;
pfServer.listen(PORT, () => {
    console.log(`pfServer started running at PORT:${PORT}`);
});

pfServer.get("/", (req, res) => {
    res.status(200).send('<h1 style="color:red">Project Fair server started running and waiting for client requests!</h1>');
});
