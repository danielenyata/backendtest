const express = require('express');
const morgan = require('morgan');

const authRoutes = require('./routes/auth.route');
const userRoutes = require('./routes/user.route');
const inventoryRoutes = require('./routes/inventory.route');
const { verifyJwt } = require('./middleware/auth');

const app = express();



app.use(morgan('dev'));
app.use(express.json());


app.use('/auth', authRoutes);
app.use('/user', verifyJwt, userRoutes);
app.use('/item', verifyJwt, inventoryRoutes);



module.exports =  app 


