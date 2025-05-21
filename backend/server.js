require('dotenv').config();
const express = require('express');
const cors = require('cors');

const connectDB = require('./db');
const routes = require('./routes');

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use('/api', routes);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
