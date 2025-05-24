// Initialize the main-thread interface for a PGlite database that runs inside a Web Worker.
// This setup allows database queries to run off the main thread, improving performance
// and enabling cross-tab synchronization in the browser.

import { PGliteWorker } from "@electric-sql/pglite/worker";

// Create and export a new PGliteWorker instance connected to the worker script
export const db = new PGliteWorker(
    new Worker(new URL('./PGliteWorker.ts',import.meta.url),{ // Resolve and load the worker script
      type: 'module', 
    }),
);