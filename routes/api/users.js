const express = require('express');
const router = express.Router();
const User = require('../../models/User');

router.get('/', async (req, res) => {
	try {
		const users = await User.find();
		res.json(users);
	} catch (err) {
		res.json({ message: err });
	}
});

router.get('/:username', async (req, res) => {
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

	console.log(user);
});

router.post('/', async (req, res) => {
	const newUser = new User({
		username: req.body.username,
		password: req.body.password,
		email: req.body.email,
	});

	const users = await User.find();
	const usernameExists = users.some(
		(user) => user.username == newUser.username
	);
	const emailExists = users.some((user) => user.email == newUser.email);

	if (usernameExists) {
		res.json({ message: 'Username already exists' });
	} else if (emailExists) {
		res.json({ message: 'Email already registered' });
	} else {
		try {
			const savedUser = await newUser.save();
			res.json(savedUser);
		} catch (err) {
			res.json({ message: err });
		}
	}
});

module.exports = router;
