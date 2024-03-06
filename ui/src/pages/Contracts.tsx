import React, { ReactElement, FC, useEffect, useState } from 'react';
import { Box, Typography, CircularProgress, TextField } from '@mui/material';
import { getContracts } from '../api/contracts';
import { useStore } from '../stores';
import Table from '../components/Table';
import { useNavigate } from "react-router-dom";

const Contracts: FC<any> = (): ReactElement => {
  const { appStore } = useStore();
  const [contracts, setContracts] = useState(null);
  const [limit, setLimit] = useState(2);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);

  let navigate = useNavigate();
  const routeChange = (id: string) => {
    let path = `/contract/${id}`;
    navigate(path);
  }

  useEffect(() => {
    setLoading(true);
    getContracts(limit, offset, appStore.profileId).then((result) =>{
      setContracts(result.data);
      setLoading(false);
    })
  }, [limit, offset, appStore.profileId])

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
          id="standard-basic" 
          label="Limit"
          value={limit}
          onChange={(event) => setLimit(Number(event.target.value))}
        />
        <TextField 
          id="standard-basic" 
          label="Offset"
          value={offset}
          onChange={(event) => setOffset(Number(event.target.value))}
        />
      </Box>
      {loading 
        ? (<CircularProgress />) 
        : (
          <>
            {contracts 
              ? (<Table data={contracts} title="Contracts" button="View" onClick={routeChange}/>) 
              : (<Typography variant="h4">{'Could not load, try to authorize'}</Typography>)}
          </>
        )}
    </Box>
  );
};

export default Contracts;
