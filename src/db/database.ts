import mysql from "mysql2/promise"
import assert from "assert"

assert(process.env.DB_HOST, "Host not defined")
assert(process.env.DB_USERNAME, "Username not defined")
assert(process.env.DB_PASSWORD, "Password not defined")
assert(process.env.DB_DATABASE, "Database not defined")

export async function connectToDB() {
    try {
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE
        })

        const [rows, fields] = await connection.execute('SELECT * FROM users');
        console.log('Query results:', rows);

        await connection.end();
    } catch (err) {
        console.error("Can't connect to db: ", err)
    }
}

export async function getConnection() {
    return await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE
    })
}

export const mockConnectDB = async () => {
    try {
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
}
