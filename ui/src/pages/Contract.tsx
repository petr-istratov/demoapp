import React, { ReactElement, FC, useEffect, useState } from 'react';
import { Box, Typography, CircularProgress } from '@mui/material';
import { useParams } from 'react-router-dom';
import { getContract } from '../api/contracts';
import { useStore } from '../stores';
import Table from '../components/Table';

const Contract: FC<any> = (): ReactElement => {
  const { appStore } = useStore();
  const [contract, setContract] = useState(null);
  const [loading, setLoading] = useState(false);
  const { contractId } = useParams<{ contractId: string }>();

  useEffect(() => {
    if (!contractId) return;
    setLoading(true);
    getContract(contractId, appStore.profileId).then((result) =>{
      setContract(result.data);
      setLoading(false);
    })
  }, [appStore.profileId, contractId])

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
      {loading 
        ? (<CircularProgress />) 
        : (
          <>
            {contract 
              ? (<Table data={[contract]} title="Contract"/>) 
              : (<Typography variant="h4">{'Could not load, try to authorize'}</Typography>)}
          </>
        )}
    </Box>
  );
};

export default Contract;
