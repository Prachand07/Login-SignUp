const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('./model');

const router = express.Router();

// Signup
router.post('/signup', async (req, res) => {
    try {
        const { firstName, lastName, email, mobile, gender, city, role, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: 'Email already in use' });

        const user = new User({ firstName, lastName, email, mobile, gender, city, role, password });
        await user.save();

        res.status(201).json({
            message: 'User registered successfully',
            user: {
                id: user._id,
                firstName,
                lastName,
                email,
                role
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Error registering user', error: error.message });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email }).select('+password');

        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const isPasswordCorrect = await user.comparePassword(password);
        if (!isPasswordCorrect) {
            return res.status(401).json({ message: 'Check password and try again' });
        }

        user.lastLogin = new Date();
        await user.save();

        res.status(200).json({
            message: 'Login successful',
            user: {
                id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                role: user.role
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Error logging in', error: error.message });
    }
});


// Forgot Password
router.post('/forgot-password', async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });

        if (!user) return res.status(404).json({ message: 'User not found' });

        res.status(200).json({ message: 'Password reset instructions sent to your email' });
    } catch (error) {
        res.status(500).json({ message: 'Error processing request', error: error.message });
    }
});

// Reset Password
router.post('/reset-password', async (req, res) => {
    try {
        const { password, confirmPassword } = req.body;

        if (password !== confirmPassword)
            return res.status(400).json({ message: 'Passwords do not match' });

        const demoUserId = 'replace-with-actual-user-id-in-real-app';
        const user = await User.findById(demoUserId).select('+password +passwordHistory');

        if (!user) return res.status(404).json({ message: 'User not found' });

        const isPreviousPassword = await Promise.all(
            user.passwordHistory.map(old => bcrypt.compare(password, old))
        );

        if (isPreviousPassword.some(match => match)) {
            return res.status(400).json({ message: 'You cannot reuse a previous password' });
        }

        user.password = password;
        await user.save();

        res.status(200).json({ message: 'Password reset successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error resetting password', error: error.message });
    }
});

router.get('/dashboard', async (req, res) => {
    try {
        const users = await User.find().select(
            'email firstName lastName mobile lastLogin role city'
        );
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch users', error: error.message });
    }
});


module.exports = router;
