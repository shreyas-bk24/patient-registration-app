import React, { useState } from "react";
import {
    Box,
    FormControl,
    FormLabel,
    Input,
    Select,
    Option,
    Button,
    Typography,
    Stack,
} from "@mui/joy";

const PatientForm = () => {
    const [formData, setFormData] = useState({
        name: "",
        age: "",
        gender: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleGenderChange = (_: any, value: string | null) => {
        setFormData((prev) => ({
            ...prev,
            gender: value ?? "",
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Patient Registered:", formData);
        setFormData({ name: "", age: "", gender: "" });
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
            <Stack spacing={2}>
                <Typography level="h4">Register New Patient</Typography>

                <FormControl>
                    <FormLabel>Name</FormLabel>
                    <Input
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </FormControl>

                <FormControl>
                    <FormLabel>Age</FormLabel>
                    <Input
                        name="age"
                        type="number"
                        value={formData.age}
                        onChange={handleChange}
                        required
                    />
                </FormControl>

                <FormControl>
                    <FormLabel>Gender</FormLabel>
                    <Select
                        placeholder="Select gender"
                        value={formData.gender}
                        onChange={handleGenderChange}
                        required
                    >
                        <Option value="Male">Male</Option>
                        <Option value="Female">Female</Option>
                        <Option value="Other">Other</Option>
                    </Select>
                </FormControl>

                <Button type="submit" color="primary">
                    Register
                </Button>
            </Stack>
        </Box>
    );
};

export default PatientForm;