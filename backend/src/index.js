import express from "express";
import cors from "cors";
import { db } from "./config/db.js";

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    res.send("API running");
});

db.connect((err) => {
    if (err) {
        console.log("Database connection error:", err);
    } else {
        console.log("MySQL connected");
    }
});

app.listen(8800, () => {
    console.log("Backend running on port 8800");
});