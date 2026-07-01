require("dotenv").config();
const express = require("express");
const app = express();
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const logger = require("./middleware/loggerMiddleware");
app.use(logger);
app.use(express.json());
connectDB();
app.use(userRoutes);
const PORT = 7001;
app.listen(PORT, () => {
    console.log(`Server Running on http://localhost:${PORT}`);
});