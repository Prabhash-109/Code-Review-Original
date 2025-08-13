
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const aiRoutes = require('./routes/ai.routes');
const authRouter = require('./routes/authRouter');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');
const subscriberRoutes =require('./routes/subscriberRoutes');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });


const app = express();

// MongoDB connection
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("❌ MongoDB connection error:", err));

// Middlewares
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Default route
app.get('/', (req, res) => {
    res.send('Server running');
});

// Routes
app.use('/auth', authRouter);
app.use('/ai', aiRoutes);
app.use("/api", subscriberRoutes);

module.exports = app;
