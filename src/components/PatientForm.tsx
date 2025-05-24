import React, { useState } from "react";
import {
  Box, FormControl, FormLabel, Input, Select, Option, Button, Typography, Stack,
} from "@mui/joy";
import { db } from "../db/pglite";
import { patientSyncChannel } from "../utils/patientSyncChannel";

interface Patient {
  id?: number;      
  name: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
}

const PatientForm = ({ onPatientRegistered }: { onPatientRegistered?: () => void }) => {
  const [formData, setFormData] = useState<Patient>({
    name : '',
    age : 0,
    gender : 'Male'
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleGenderChange = (_: any, value: string | null) => {
    if (value === 'Male' || value === 'Female' || value === 'Other') {
      setFormData((prev) => ({
        ...prev,
        gender: value,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await db.query(
        'INSERT INTO patients (name, age, gender) VALUES ($1, $2, $3)',
        [formData.name, formData.age, formData.gender]
      );
    } catch (error) {
      console.error(error)
    }
    patientSyncChannel.postMessage({type: "patient-registered"})
    console.log("Broadcast has sent")
    setFormData({ name: "", age: 0, gender: 'Male' });
    onPatientRegistered?.(); // Notify parent to refresh list
  };

  return (
    <Box>
      <Typography level="h4" mb={2}>Register New Patient</Typography>
      <form onSubmit={handleSubmit}>
        <Stack spacing={2}>
          <FormControl>
            <FormLabel>Name</FormLabel>
            <Input name="name" value={formData.name} onChange={handleChange} required />
          </FormControl>
          <FormControl>
            <FormLabel>Age</FormLabel>
            <Input name="age" value={formData.age} onChange={handleChange} type="number" required />
          </FormControl>
          <FormControl>
            <FormLabel>Gender</FormLabel>
            <Select value={formData.gender} onChange={handleGenderChange} required>
              <Option value="Male">Male</Option>
              <Option value="Female">Female</Option>
              <Option value="Other">Other</Option>
            </Select>
          </FormControl>
          <Button type="submit">Register</Button>
        </Stack>
      </form>
    </Box>
  );
};

export default PatientForm;
