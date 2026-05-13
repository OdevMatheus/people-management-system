import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config();

const dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
};

export const ensureDatabaseExists = (databaseName) =>
    new Promise((resolve, reject) => {
        if (!databaseName) {
            reject(new Error("DB_NAME nao definido."));
            return;
        }

        const serverConnection = mysql.createConnection({
            host: dbConfig.host,
            user: dbConfig.user,
            password: dbConfig.password,
        });

        serverConnection.query(
            "CREATE DATABASE IF NOT EXISTS ??",
            [databaseName],
            (err) => {
                serverConnection.end();

                if (err) {
                    reject(err);
                    return;
                }

                resolve();
            }
        );
    });

export const db = mysql.createConnection(dbConfig);
