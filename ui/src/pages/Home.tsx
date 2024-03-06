import React, { ReactElement, FC } from "react";
import { Box, TextField } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useStore } from "../stores";

const Home: FC<any> = (): ReactElement => {
  const { appStore } = useStore();
  return (
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
        label="Put profile ID here to authorize:"
        value={appStore.profileId}
        onChange={(event) => appStore.profileId = event.target.value}
      />
    </Box>
  );
};

export default observer(Home);
