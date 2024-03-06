import React, { ReactElement, FC, useEffect, useState } from 'react';
import { Box, Typography, CircularProgress, TextField } from '@mui/material';
import { getBestProfession, getBestClients } from '../api/admin';
import { useStore } from '../stores';
import Table from '../components/Table';

const Admin: FC<any> = (): ReactElement => {
  const { appStore } = useStore();
  const [bestProfession, setBestProfession] = useState(null);
  const [bestClients, setBestClients] = useState(null);
  const [loading, setLoading] = useState(false);
  const [startDate, setStartDate] = useState('2017-05-24');
  const [endDate, setEndDate] = useState('2023-05-24');
  const [limit, setLimit] = useState(2);

  useEffect(() => {
    setLoading(true);
    getBestProfession(new Date(startDate), new Date(endDate), appStore.profileId).then((result) =>{
      setBestProfession(result.data);
      setLoading(false);
    })
  }, [startDate, endDate, appStore.profileId])

  useEffect(() => {
    setLoading(true);
    getBestClients(new Date(startDate), new Date(endDate), limit, appStore.profileId).then((result) =>{
      setBestClients(result.data);
      setLoading(false);
    })
  }, [startDate, endDate, limit, appStore.profileId])

  return (
    <Box
      sx={{
        flexGrow: 1,
        backgroundColor: "whitesmoke",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: 'column',
      }}
    >  
      <Box
        sx={{
          flexGrow: 1,
          backgroundColor: "whitesmoke",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >  
        <TextField
          id="date"
          label="startDate"
          type="date"
          value={startDate}
          onChange={(event) => setStartDate(event.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          id="date"
          label="endDate"
          type="date"
          value={endDate}
          onChange={(event) => setEndDate(event.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField 
          id="standard-basic" 
          label="Limit"
          value={limit}
          onChange={(event) => setLimit(Number(event.target.value))}
        />
      </Box>
      {loading 
        ? (<CircularProgress />) 
        : (
          <>
            {bestProfession 
              ? (<Table data={[bestProfession]} title="Best proffesion"/>) 
              : (<Typography variant="h4">{'Could not load, try to authorize'}</Typography>)}
          </>
        )}
      {loading 
        ? (<CircularProgress />) 
        : (
          <>
            {bestClients 
              ? (<Table data={bestClients} title="Best clients"/>) 
              : (<Typography variant="h4">{'Could not load, try to authorize'}</Typography>)}
          </>
        )}
    </Box>
  );
};

export default Admin;
