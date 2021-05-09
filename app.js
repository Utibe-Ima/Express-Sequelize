const express = require('express');
const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.static(path.join(__dirname, 'Public')));
app.use(express.urlencoded({extended:false}));
app.use(express.json())

const User = require('./user.js')
const sequelize = require('./database.js');
sequelize.sync().then(() => console.log('db is ready'));


// Find All Users
app.get('/user', async (req, res) => {
	const users = await User.findAll();
	res.send(users);
})


// Create new User
app.post('/user', async (req, res) => {
	await User.create(req.body);
	res.send('User is inserted');
})


// Find One User 
app.get('/user/:id', async (req, res) => {
	const requestedId = req.params.id;
	const user = await User.findOne({ where: {id: requestedId}});
	res.send(user);
})

// Update user info
app.put('/user/:id', async (req, res) => {
	const requestedId = req.params.id;
	const user = await User.findOne({ where: {id: requestedId}});
	user.username = req.body.username;
	user.email = req.body.email;
	user.password = req.body.password;
	await user.save()
	res.send('updated');
})

// Delete a User
app.delete('user/:id', async (req, res) => {
	const requestedId = req.params.id;
	await User.destroy({ where: {id: requestedId}});
	res.send('removed');
})




app.listen(PORT, function () {
	console.log(`Server is active on ${PORT}`);
});