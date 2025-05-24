// Patient list view component

import { useEffect, useState } from "react";
import { Typography, Table } from "@mui/joy";
import { db } from "../db/pglite";
import { patientSyncChannel } from "../utils/patientSyncChannel";

const PatientList = () => {
  // State to hold list of patients fetched from the database
  const [patients, setPatients] = useState<any[]>([]);

  // Fetch all patients from the local database
  const fetchPatients = async () => {
    const result = await db.exec(`SELECT * FROM patients`);
    setPatients(result[0]?.rows || []);
  };

  useEffect(() => {
    // Initial fetch when component mounts
    fetchPatients();

    // Event handler for receiving broadcast messages to sync data across tabs
    const onMessage = (event : MessageEvent) => {
      if(event.data?.type === 'patient-registered'){
        console.log("event received")
        fetchPatients();
      }
    }
    // Listen for storage events for cross-tab sync
    patientSyncChannel.addEventListener('message',onMessage)

    // Cleanup listener on component unmount
    return () => patientSyncChannel.addEventListener('message',onMessage);
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
