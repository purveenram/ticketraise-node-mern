const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();
const app = express();

// Configure CORS to allow requests from React frontend on port 3000
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
}));


app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((Error) => console.log(Error));

// Import user routes
const userRoutes = require("./routes/auth");
app.use("/api", userRoutes);

// Root endpoint
app.get("/", (req, res) => {
  res.send("API is Running !!!");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
