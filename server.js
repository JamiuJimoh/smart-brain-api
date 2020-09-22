//jshint esversion:9
const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const cors = require('cors');
const knex = require('knex');
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');
const app = express();

app.use(bodyParser.json());
app.use(cors());

const db = knex({
	client: 'pg',
	connection: {
		connectionString: process.env.DATABASE_URL,
		ssl: true
	}
});

app.get('/', (req, res) => res.json("it's working"));

app.post('/signin', (req, res) => signin.handleSignin(req, res, db, bcrypt));

app.post('/register', (req, res) => register.handleRegister(req, res, db, bcrypt));

app.get('/profile/:id', (req, res) => profile.handleProfileGet(req, res, db));

app.put('/image', (req, res) => image.handleImageGet(req, res, db));

app.post('/imageUrl', (req, res) => image.handleApiCall(req, res));

const port = process.env.PORT || 3000;
const ip = process.env.IP || '0.0.0.0';

app.listen(port, ip, function() {
	console.log(`Server started on port ${port}`);
});
