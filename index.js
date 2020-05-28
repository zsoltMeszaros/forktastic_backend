const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv/config')

const app = express();

// middleware functions
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended: false}));

app.use("/api/users", require("./routes/api/users"));


mongoose.connect(
    process.env.DB_CONNECTION, 
    {useNewUrlParser: true, useUnifiedTopology: true}, 
    (err, db) => {

    if(err == null){
        console.log("connected to mongoDB");
    }else{
        console.log(err);
    }

});

app.get('/', (req, res) => {

    res.send("<h2> /api to get the routes");
});


app.get('/api', (req, res) => {

    routes = `
        <h1>Forktastic backend application</h1>
        <h2>API routes available:</h1>
        <p>/api/users</p>
        <p>/api/user/{id}</p>
        <p>/api/recipe/{id}</p>
    `

    res.send(routes);
});

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Server running at ${PORT}`))

