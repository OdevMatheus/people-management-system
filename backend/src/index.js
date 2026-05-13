import express from "express";
import cors from "cors";
import { db, ensureDatabaseExists } from "./config/db.js";
import usersRouter from "./routes/UsersRouter.js";

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    res.send("API running");
});

const runQuery = (query, values = []) =>
    new Promise((resolve, reject) => {
        db.query(query, values, (err, result) => {
            if (err) {
                reject(err);
                return;
            }

            resolve(result);
        });
    });

const initDatabase = async () => {
    const shouldReset = process.env.RESET_DB_ON_START !== "false";

    if (shouldReset) {
        await runQuery("DROP TABLE IF EXISTS usuarios");
    }

    const createTableQuery = `
        CREATE TABLE IF NOT EXISTS usuarios (
            id INT AUTO_INCREMENT PRIMARY KEY,
            nome VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL,
            fone VARCHAR(50) NOT NULL,
            data_nascimento DATE NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    `;

    await runQuery(createTableQuery);


    if (shouldReset) {
        await runQuery("TRUNCATE TABLE usuarios");
    }
};

//============================================================================== BANCO DE DADOS!
const startDatabase = async () => {
    try {
        await ensureDatabaseExists(process.env.DB_NAME);
    } catch (error) {
        console.log("Database creation error:", error);
        return;
    }

    db.connect((err) => {
        if (err) {
            console.log("Database connection error:", err);
        } else {
            console.log("MySQL connected");
            initDatabase()
                .then(() => {
                    console.log("Database ready");
                })
                .catch((initError) => {
                    console.log("Database init error:", initError);
                });
        }
    });
};

startDatabase();
//============================================================================== BANCO DE DADOS!


app.use("/users", usersRouter);

app.listen(8800, () => {
    console.log("Backend running on port 8800");
});