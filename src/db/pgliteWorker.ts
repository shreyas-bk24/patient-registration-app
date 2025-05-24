// Worker script that sets up a browser-based PGlite (SQLite over IndexedDB) database.
// Enables cross-tab synchronization and non-blocking database operations.

import { PGlite } from "@electric-sql/pglite";
import { worker } from "@electric-sql/pglite/worker";

// Define and initialize the PGlite database inside the Web Worker
worker({
    async init() {
        const db = new PGlite("idb://patient_db"); // Use IndexedDB as the storage backend

        // Create 'patients' table if it doesn't already exist
        await db.exec(`
            CREATE TABLE IF NOT EXISTS patients (
            id SERIAL PRIMARY KEY,
            name TEXT NOT NULL,
            age INTEGER NOT NULL,
            gender TEXT NOT NULL
            );
        `);
        return db;
    }
});