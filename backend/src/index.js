import express from "express";
import cors from "cors";
import { db } from "./config/db.js";
import usersRouter from "./routes/UsersRouter.js";

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    res.send("API running");
});

//============================================================================== BANCO DE DADOS!
db.connect((err) => {
    if (err) {
        console.log("Database connection error:", err);
    } else {
        console.log("MySQL connected");
    }
});
//============================================================================== BANCO DE DADOS!


app.use("/users", usersRouter);

app.listen(8800, () => {
    console.log("Backend running on port 8800");
});