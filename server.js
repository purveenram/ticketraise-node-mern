const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();
const app = express();

// Configure CORS to allow requests from deployed React frontend
const allowedOrigins = [
  process.env.FRONTEND_URL || 'http://localhost:3000', // Frontend in .env or localhost
  'https://ticketraise-react-mern.vercel.app' // Your deployed React URL
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
  credentials: true // Allow cookies if needed
}));

app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((error) => console.error("MongoDB connection error:", error));

// Import user routes
const userRoutes = require("./routes/auth");
app.use("/api", userRoutes);

// Root endpoint
app.get("/", (req, res) => {
  res.send("API is Running !!!");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
