import React, { useEffect, useState } from "react";
import { Typography, Table } from "@mui/joy";
import dbPromise from "../db/pglite";


const PatientList = () => {
  const [patients, setPatients] = useState<any[]>([]);

  const fetchPatients = async () => {
    const db = await dbPromise;
    const result = await db.exec(`SELECT * FROM patients`);
    setPatients(result[0]?.rows || []);
  };

  useEffect(() => {
    fetchPatients();
    // Listen for storage events for cross-tab sync
    window.addEventListener("storage", fetchPatients);
    return () => window.removeEventListener("storage", fetchPatients);
  }, []);

  return (
    <div>
      <Typography level="h4" mb={2}>Patient Records</Typography>
      <Table>
        <thead>
          <tr>
            <th>ID</th><th>Name</th><th>Age</th><th>Gender</th>
          </tr>
        </thead>
        <tbody>
          {patients.map((p) => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.name}</td>
              <td>{p.age}</td>
              <td>{p.gender}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default PatientList;
