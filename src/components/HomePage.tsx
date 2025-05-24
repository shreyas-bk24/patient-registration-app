import * as React from 'react';
import Tabs from '@mui/joy/Tabs';
import TabList from '@mui/joy/TabList';
import Tab from '@mui/joy/Tab';
import TabPanel from '@mui/joy/TabPanel';
import { Box, Typography } from '@mui/joy';
import PatientRegisterForm from './PatientForm';
import PatientList from './PatientList';
import SQLQueryBox from './SQLQuery';
import { db } from '../db/pglite';

const HomePage = () => {
  const [index, setIndex] = React.useState(0);
  const [refreshList, setRefreshList] = React.useState(false);


  const runRawSQL = async (query: string): Promise<any[]> => {

      if (!db) throw new Error("Database not initialized");
      const result = await db.exec(query);
      return result[0]?.rows || [];
    };

  const handleChange = (_event: React.SyntheticEvent | null, newIndex: string | number | null) => {
    if (typeof newIndex === 'number') {
      setIndex(newIndex);
    }
  };

  const handlePatientRegistered = () => {
    setRefreshList(v => !v); // Toggle to trigger refresh in PatientList
  };

  return (
    <Box>
      <Typography level="h2" mb={2}>Patient Registration System</Typography>
      <Tabs value={index} onChange={handleChange}>
        <TabList>
          <Tab>Patient Registration</Tab>
          <Tab>Patient List</Tab>
          <Tab>SQL Query Box</Tab>
        </TabList>
        <TabPanel value={0}>
          <PatientRegisterForm onPatientRegistered={handlePatientRegistered} />
        </TabPanel>
        <TabPanel value={1}>
          <PatientList key={refreshList ? 'refresh1' : 'refresh0'} />
        </TabPanel>
         <TabPanel value={2}>
          <SQLQueryBox runRawSQL={runRawSQL} />
        </TabPanel>
      </Tabs>
    </Box>
  );
};

export default HomePage;
