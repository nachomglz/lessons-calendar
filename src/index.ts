import express from "express";
import dotenv from "dotenv";

// Enable .env variables
dotenv.config();

// Create constants
const PORT = process.env.PORT ?? 3001

// Create express app
const app = express();

// Add middlewares to express app
app.use(express.json())
   .use(express.urlencoded({ extended: false }))


// App listening on .env port
app.listen(PORT, () => {
    console.log(`Listening on: http://localhost:${PORT}`);
})

