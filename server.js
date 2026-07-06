require("dotenv").config();
const express = require("express");
const app = express();
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/poductRoutes");
const logger = require("./middleware/loggerMiddleware");
app.use(logger);
app.use(express.json());
connectDB();
app.use(userRoutes);
app.use(productRoutes); 
const PORT = 7001;
app.listen(PORT, () => {
    console.log(`Server Running on http://localhost:${PORT}`);
});