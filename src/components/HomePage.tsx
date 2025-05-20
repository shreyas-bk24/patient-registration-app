import * as React from 'react';
import Tabs from '@mui/joy/Tabs';
import TabList from '@mui/joy/TabList';
import Tab from '@mui/joy/Tab';
import TabPanel from '@mui/joy/TabPanel';
import { Box, Typography } from '@mui/joy';

import PatientForm from './PatientForm';
import SQLQueryBox from './SQLQuery';
import db from '../db/pglite';

const runRawSQL = async (query: string): Promise<any[]> => {
    if (!db) throw new Error("Database not initialized");
    const result = await db.exec(query);
    return result[0]?.rows || [];
  };

const HomePage = () => {
    
    return (
        <Box sx={{ p: 3, bgcolor: 'background.paper' }}>
            <Typography level='h3' gutterBottom>Patient Registration System</Typography>
            <Tabs aria-label="Tabs with icons" variant="plain" defaultValue={0}>
                <TabList>
                    <Tab>Patient Registration</Tab> 
                    <Tab>Patient List</Tab>
                    <Tab>SQL Query Box</Tab>
                </TabList>
                <TabPanel value={0}>
                    <PatientForm />
                </TabPanel>
                <TabPanel value={1}>
                    <p>Patient list and SQL Query tab</p>
                </TabPanel>
                <TabPanel value={2}>
                    <SQLQueryBox runRawSQL={runRawSQL} />
                </TabPanel>
            </Tabs>
        </Box>
    );

}

export default HomePage;