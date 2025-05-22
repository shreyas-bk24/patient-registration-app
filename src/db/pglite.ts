import { PGlite } from '@electric-sql/pglite';

const dbPromise = (async () => {
  const db = new PGlite("idb://patient_db");
  await db.exec(`
    CREATE TABLE IF NOT EXISTS patients (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      age INTEGER NOT NULL,
      gender TEXT NOT NULL
    );
  `);
  return db;
})();

export default dbPromise;
