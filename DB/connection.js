const mongoose = require('mongoose');
const connectionString = process.env.connectionString
mongoose.connect(connectionString).then(() => {
    console.log("MongoDB Altas Successfully Connected to pfServer...");

}).catch((err) => {
    console.log("MongoDB Altas Failed...",err);
})