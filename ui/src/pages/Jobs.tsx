import React, { ReactElement, FC, useEffect, useState, useCallback } from 'react';
import { Box, Typography, CircularProgress, TextField } from '@mui/material';
import { getUnpaidJobs, payForJob } from '../api/jobs';
import { useStore } from '../stores';
import Table from '../components/Table';
import pick from 'lodash/pick';

const Jobs: FC<any> = (): ReactElement => {
  const { appStore } = useStore();
  const [jobs, setJobs] = useState(null);
  const [limit, setLimit] = useState(2);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);

  const load = useCallback(() => getUnpaidJobs(limit, offset, appStore.profileId).then((result) => {
    const data = result.data?.map((item: any) => pick(item, ['id', 'contractId', 'description', 'price', 'createdAt', 'updatedAt']));
    setJobs(data);
    setLoading(false);
  }), [appStore.profileId, limit, offset]);

  useEffect(() => {
    setLoading(true);
    load();
  }, [limit, offset, load])

  const pay = async (id: string) => {
    try {
      const response = await payForJob(id, appStore.profileId);
      if (response.status === 200) {
        load();
      }
    } catch (error) {
      console.error(error);
    }
  };

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
            {jobs 
              ? (<Table data={jobs} title="Unpaid Jobs" button="Pay" onClick={pay}/>) 
              : (<Typography variant="h4">{'Could not load, try to authorize'}</Typography>)}
          </>
        )}
    </Box>
  );
};

export default Jobs;
