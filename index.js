const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv/config');
require('cookie-parser');

const app = express();

// middleware functions
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

app.use('/api/users', require('./routes/api/users'));
app.use('/api/recipes', require('./routes/api/recipes'));

mongoose.connect(
	process.env.DB_CONNECTION,
	{ useNewUrlParser: true, useUnifiedTopology: true },
	(err, db) => {
		if (err == null) {
			console.log('connected to mongoDB');
		} else {
			console.log(err);
		}
	}
);


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running at ${PORT}`));
