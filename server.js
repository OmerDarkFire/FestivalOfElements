const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const session = require('express-session');
const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://localhost/pokemon_forum', { useNewUrlParser: true });

// Middleware
app.use(express.json());
app.use(express.static('public'));
app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false } // set to true if using HTTPS
}));

// User Model
const User = mongoose.model('User', {
    username: String,
    password: String,
    role: String // 'admin' or 'user'
});

// Post Model
const Post = mongoose.model('Post', {
    title: String,
    content: String,
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    date: { type: Date, default: Date.now },
    comments: [{
        content: String,
        author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        date: { type: Date, default: Date.now }
    }]
});

// Routes
app.post('/api/register', async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const user = new User({
            username: req.body.username,
            password: hashedPassword,
            role: 'user'
        });
        await user.save();
        res.status(201).json({ message: 'User created successfully' });
    } catch {
        res.status(500).json({ message: 'Error creating user' });
    }
});

app.post('/api/login', async (req, res) => {
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
        return res.status(400).json({ message: 'User not found' });
    }
    if (await bcrypt.compare(req.body.password, user.password)) {
        req.session.userId = user._id;
        req.session.role = user.role;
        res.json({ message: 'Logged in successfully' });
    } else {
        res.status(400).json({ message: 'Invalid password' });
    }
});

// Protected route middleware
const requireAuth = (req, res, next) => {
    if (!req.session.userId) {
        return res.status(401).json({ message: 'Authentication required' });
    }
    next();
};

// Posts routes
app.post('/api/posts', requireAuth, async (req, res) => {
    const post = new Post({
        title: req.body.title,
        content: req.body.content,
        author: req.session.userId
    });
    await post.save();
    res.status(201).json(post);
});

app.get('/api/posts', async (req, res) => {
    const posts = await Post.find().populate('author', 'username');
    res.json(posts);
});

app.post('/api/posts/:id/comments', requireAuth, async (req, res) => {
    const post = await Post.findById(req.params.id);
    post.comments.push({
        content: req.body.content,
        author: req.session.userId
    });
    await post.save();
    res.status(201).json(post);
});

app.listen(3000, () => console.log('Server running on port 3000'));
