const express = require('express');
const mongoose = require('mongoose');
const authRouter = require('./routes/auth');
var bodyParser = require('body-parser')
var cors = require('cors')

const PORT = process.env.PORT || 3000;


const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//middleware
app.use(authRouter);

var username = encodeURIComponent("ashishu8888");
var password = encodeURIComponent("ashish#123");

const db = `mongodb+srv://${username}:${password}@cluster0.vigtde1.mongodb.net/?retryWrites=true&w=majority`;

mongoose.connect(db).then(() => {
    console.log("connection successful");
})
    .catch((e) => {
        console.log(e);
    });

app.listen(PORT, "0.0.0.0", () => {
    console.log(`connected at port ${PORT}`);
});
