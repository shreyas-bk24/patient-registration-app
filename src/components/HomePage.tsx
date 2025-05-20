import * as React from 'react';
import Tabs from '@mui/joy/Tabs';
import TabList from '@mui/joy/TabList';
import Tab from '@mui/joy/Tab';
import TabPanel from '@mui/joy/TabPanel';
import { Box, Typography } from '@mui/joy';
import PatientForm from './PatientForm';


const HomePage = () => {
    
    return (
        <Box sx={{ p: 3, bgcolor: 'background.paper' }}>
            <Typography level='h3' gutterBottom>Patient Registration System</Typography>
            <Tabs aria-label="Tabs with icons" variant="plain" defaultValue={0}>
                <TabList>
                    <Tab>Patient Registration</Tab> 
                    <Tab>Patient List</Tab>
                </TabList>
                <TabPanel value={0}>
                    <PatientForm />
                </TabPanel>
                <TabPanel value={1}>
                    <p>Patient list and SQL Query tab</p>
                </TabPanel>
            </Tabs>
        </Box>
    );

}

export default HomePage;