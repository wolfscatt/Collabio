const cors = require('cors');

const dotenv = require('dotenv')
const bodyParser = require("body-parser")
const express = require('express');
const connectDB = require('./services/connectionDb')
const allRoutes = require('./routes/routes')
const errorHandler = require('./middlewares/errorMiddleware');

dotenv.config()

const app = express();

// MongoDB bağlantısı
connectDB();

// Middleware
app.use(cors());
app.use(bodyParser.json());


// Routes
app.use('/api', allRoutes);

// Error handling middleware
app.use(errorHandler);



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
}); 