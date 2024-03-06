import React, { ReactElement, FC, SyntheticEvent, useState } from "react";
import { Box, TextField, Button, Snackbar } from "@mui/material";
import { useStore } from "../stores";
import { deposit } from '../api/balances';

const Deposit: FC<any> = (): ReactElement => {
  const { appStore } = useStore();
  const [amount, setAmount] = useState<number>(0);
  const [message, setMessage] = useState(false);

  const makeDeposit = async () => {
    try {
      const response = await deposit(amount, appStore.profileId, appStore.profileId);
      setMessage(response.data.message);
    } catch (error) {
      console.error(error);
    }
  }

  const handleCloseMessage = (event: SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setMessage(false);
  };

  return (
    <>
      <Box
        sx={{
          flexGrow: 1,
          backgroundColor: 'whitesmoke',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <TextField 
          id="standard-basic" 
          label="Amount:"
          value={amount}
          onChange={(event) => setAmount(Number(event.target.value))}
        />
        <Button variant="contained" onClick={makeDeposit}>
          {'Deposit'}
        </Button>
      </Box>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={!!message}
        autoHideDuration={6000}
        onClose={handleCloseMessage}
        message={message}
      />
    </>
  );
};

export default Deposit;