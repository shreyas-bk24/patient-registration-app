import { useEffect, useState } from "react";
import { Table } from "@mui/joy";
import db from '../db/pglite';

interface Patient {
  id: number;
  name: string;
  age: number;
  gender: string;
  address: string;
}

const PatientList = () => {
  const [patients, setPatients] = useState<Patient[]>([]);

  const fetchPatients = async () => {
    const result = await db.exec("SELECT * FROM patients ORDER BY id DESC");
    const rows = result[0]?.rows || [];
    setPatients(rows as Patient[]);
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  return (
    <Table
      aria-label="List of registered patients"
      variant="soft"
      borderAxis="xBetween"
      stripe="odd"
      hoverRow
      stickyHeader
    >
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Age</th>
          <th>Gender</th>
          <th>Address</th>
        </tr>
      </thead>
      <tbody>
        {patients.map((p) => (
          <tr key={p.id}>
            <td>{p.id}</td>
            <td>{p.name}</td>
            <td>{p.age}</td>
            <td>{p.gender}</td>
            <td>{p.address}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default PatientList;