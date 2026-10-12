import { Database } from "bun:sqlite";

const db = new Database("rolltopia.sqlite");

console.log("Data chargée");

function columnExists(table: string, column: string): boolean {
    const cols = db.query(`PRAGMA table_info(${table})`).all() as { name: string }[];
    return cols.some((c) => c.name === column);
}


db.transaction(() => {
    db.run(`CREATE TABLE IF NOT EXISTS Users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT NOT NULL UNIQUE,      
        email TEXT NOT NULL UNIQUE,      
        password TEXT NOT NULL,
        created_at TEXT DEFAULT CURRENT_TIMESTAMP
    );`);
})();

const tables = db.query("SELECT name FROM sqlite_master WHERE type='table'").all();
console.log("Tables dans la base :", tables);

export default db;
