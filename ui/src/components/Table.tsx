import React from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper, 
  Typography,
  Box,
  Button,
} from '@mui/material';

interface BasicTableProps {
  data: any[];
  title: string;
  button?: string;
  onClick?: (id: string) => void;
}

export default function BasicTable(props: BasicTableProps) {
  if (!props.data || !props.data[0]) return (<></>);
  const header = Object.keys(props.data[0]);

  return (
    <Box
      sx={{
        flexGrow: 1,
        backgroundColor: 'whitesmoke',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <Typography variant="h4">{props.title}</Typography>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              {header.map((item, index) => (
                <TableCell key={index}>{item}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {props.data.map((row, index) => (
              <TableRow key={index}>
                {Object.keys(row).map((item, index) => (
                  <TableCell key={index} align="left" >{row[item]}</TableCell>
                ))}
                {props.button && (
                  <Button variant="contained" onClick={() => props.onClick && props.onClick(row.id)}>
                    {props.button}
                  </Button>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};
