const express = require('express');
const router = express.Router();
const User = require('../../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { registerValidation, loginValidation } = require('../validation');


router.get('/user/:username', async (req, res) => {
	try {
		const users = await User.find();
		const found = users.some(
			(user) => user.username == req.params.username
		);

		if (found) {
			const foundUser = users.find(
				(user) => user.username == req.params.username
			);
			res.json(foundUser);
		} else {
			res.json({
				message: `User not found with username: ${req.params.username}`,
			});
		}
	} catch (err) {
		res.json({ message: err });
	}
});

router.post('/register', async (req, res) => {

	const {error} = registerValidation(req.body);

	console.log(error)
	if (error != null) return res.status(400).json({ message: error.details[0].message });

	let hashedPw = bcrypt.hashSync(req.body.password, 13);

	const newUser = new User({
		username: req.body.username,
		password: hashedPw,
		email: req.body.email,
		recipes: [],
	});

	const users = await User.find();

	const emailExists = users.some((user) => user.email == newUser.email);
	if (emailExists) return res.status(400).json({ message: 'Email already registered' });

	const usernameExists = users.some( (user) => user.username == newUser.username );
	if (usernameExists) return res.status(400).json({ message: 'Username already exists' });

	try {
		console.log(newUser);
		const savedUser = await newUser.save();
		res.json({ user: savedUser } );
	} catch (e) {
		res.status(400).json({ message: e });
	}
});

router.post('/login', async (req, res) => {
	const { error } = loginValidation(req.body);

	if (error != null) return res.status(400).json({ message: error.details[0].message });

	const user = await User.findOne({ username: req.body.username });
	if (user == null) return res.status(400).json({ message: 'username not found!' });

	const validPass = await bcrypt.compare(req.body.password, user.password);

	if (!validPass) return res.status(400).json({ message: 'Invalid Password!' });

	const token = jwt.sign( { _id : user._id}, process.env.TOKEN);
	res.header('auth-token', token).send(token);
});

module.exports = router;
