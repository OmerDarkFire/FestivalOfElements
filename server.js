const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

const users = {
    'user1': 'password1',
    'user2': 'password2'
};

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    if (users[username] && users[username] === password) {
        res.send('Login successful!');
    } else {
        res.send('Login failed. Invalid username or password.');
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
