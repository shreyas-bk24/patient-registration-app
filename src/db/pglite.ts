import { PGlite } from '@electric-sql/pglite'

const db = new PGlite("idb://patient_db")

db.exec(`
  CREATE TABLE IF NOT EXISTS patients (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    age INTEGER NOT NULL,
    gender TEXT NOT NULL
  );`
)

export default db;