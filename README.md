# Patient Registration System

A React-based patient registration system using **PGlite** for local database storage with **multi-tab synchronization** via a **BroadcastChannel**. This app supports registering patients, listing them, and running raw SQL queries — all synchronized across multiple tabs or windows of the same browser.

---

## Table of Contents

- [Features](#features)  
- [Tech Stack](#tech-stack)  
- [Project Structure](#project-structure)  
- [Getting Started](#getting-started)  
- [PGlite Multi-Tab Setup](#pglite-multi-tab-setup)  
- [BroadcastChannel Sync](#broadcastchannel-sync)  
- [Usage](#usage)  
- [Browser Compatibility](#browser-compatibility)  
- [Known Limitations](#known-limitations)  
- [Contributing](#contributing)  
- [License](#license)  

---

## Features

- Patient registration form with validation  
- Patient list with live updates  
- SQL Query box for advanced queries  
- Local database powered by PGlite (SQLite in browser)  
- Multi-tab safe database access using PGlite Worker  
- Real-time synchronization across tabs/windows using BroadcastChannel  
- Clean React component architecture with MUI Joy UI  

---

## Tech Stack

- **React 18** with TypeScript  
- **PGlite** for local SQLite database in the browser  
- **ElectricSQL PGlite Worker** for multi-tab safe DB access  
- **BroadcastChannel API** for cross-tab synchronization  
- **MUI Joy UI** for UI components and styling  

---

## Project Structure

src/
├── db/
│ ├── pgliteWorker.ts # PGlite multi-tab worker initialization
│ |__ pglite.ts # PGliteWorker client instance export
│
├── utils/
│ └── patientSyncChannel.ts # BroadcastChannel instance for sync
│
├── components/
| |── HomePage.tsx # Main page with tab navigation
│ ├── PatientForm.tsx # Patient registration form
│ ├── PatientList.tsx # Patient list component
│ └── SQLQueryBox.tsx # SQL query box component
│
└── App.tsx # Root app component

---

## Getting Started

### Prerequisites

- Node.js v16+  
- npm or yarn package manager  
- Modern browser (Chrome, Firefox, Edge, Safari 15.4+)  

### Installation

git clone https://github.com/shreyas-bk24/patient-registration-app.git
cd patient-registration-app
npm install
or

yarn install
text

### Running the app locally

npm run dev
or

yarn dev
text

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## PGlite Multi-Tab Setup

To safely share the PGlite database instance across multiple tabs/windows, this project uses the **PGlite Worker pattern**:

- `src/db/pgliteWorker.ts` initializes the PGlite instance inside a Web Worker with the database schema.
- `src/db/pglite.ts` creates a `PGliteWorker` client that connects to the worker.
- Components import the `db` instance from `pglite.ts` to run queries.
- The worker ensures **only one tab is the leader** managing the DB, while others proxy queries to it.
- Leader election happens automatically when tabs open/close.

### Example usage:

import { db } from '../db/pglite';
await db.exec(
INSERT INTO patients (name, age, gender) VALUES (?, ?, ?),
{ params: [name, age, gender] }
);
text

---

## BroadcastChannel Sync

To keep the UI in sync across tabs/windows:

- A shared `BroadcastChannel` named `"patient-sync"` is created in `src/utils/patientSyncChannel.ts`.
- When a patient is registered, the form component sends a message on this channel.
- The patient list component listens for these messages and refreshes the data when a sync event occurs.

### Example broadcast on patient registration:

import { patientSyncChannel } from '../utils/patientSyncChannel';
patientSyncChannel.postMessage({ type: 'patient-registered' });
text

### Example listener in patient list:

patientSyncChannel.addEventListener('message', (event) => {
if (event.data?.type === 'patient-registered') {
fetchPatients();
}
});
text

---

## Usage

- **Patient Registration Tab:** Fill out the form and submit to add a new patient.  
- **Patient List Tab:** View the list of registered patients. It auto-refreshes when new patients are added in any tab.  
- **SQL Query Box Tab:** Run custom SQL queries directly against the local PGlite database.

Open multiple tabs or windows to see real-time synchronization in action.

---

## Browser Compatibility

| Browser           | Minimum Version Supporting Features |
|-------------------|-------------------------------------|
| Chrome            | 54+ (BroadcastChannel supported)    |
| Firefox           | 38+                                 |
| Edge (Chromium)   | 79+                                 |
| Safari            | 15.4+                               | 
| Safari on iOS     | 15.5+                               |
| Chrome for Android| All versions                        | 
| Firefox for Android| All versions                       |

**Note:** BroadcastChannel does not work across different browsers or devices, only within tabs/windows of the same browser and origin.

---

## Known Limitations

- Sync only works between tabs/windows of the **same browser and origin**.  
- Local writes are currently only synced across tabs via BroadcastChannel; no remote sync implemented.  
- Initial PGlite database sync may take time depending on data size (if remote sync enabled).  
- Private/incognito modes may restrict BroadcastChannel or IndexedDB usage.

---


## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## Acknowledgments

- [ElectricSQL PGlite](https://pglite.dev/) for the embedded SQLite in-browser database  
- [BroadcastChannel API](https://developer.mozilla.org/en-US/docs/Web/API/BroadcastChannel) for cross-tab communication  
- [MUI Joy UI](https://mui.com/joy-ui/getting-started/overview/) for beautiful React components  
