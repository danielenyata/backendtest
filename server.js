const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const connectDB = require('./config/dbConn');


const authRoutes = require('./routes/auth.route');
const userRoutes = require('./routes/user.route');
const inventoryRoutes = require('./routes/inventory.route');

const app = express();

connectDB();


app.use(morgan('dev'));
app.use(express.json());

app.use(cors());


app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.use('/item', inventoryRoutes);

const PORT = process.env.PORT || 3500;

mongoose.connection.once('open', () => {
    console.log('Connection to MongoDB');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});