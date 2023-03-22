import * as React from "react";

import { Button } from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number
) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

export default function FlightTable(props: { setPopper: any; flights: any }) {
  const { setPopper, flights } = props;

  const displayPopper = () => {
    setPopper(true);
  };

  return (
    <>
      {flights && (
        <TableContainer component={Paper}>
          <Table
            sx={{ minWidth: 650, background: "#dadada" }}
            aria-label="simple table"
          >
            <TableHead>
              <TableRow>
                <TableCell>Flights</TableCell>
                <TableCell align="center">Flight No</TableCell>
                <TableCell align="center">Price</TableCell>
                <TableCell align="center">Available Seats</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="center">{row.calories}</TableCell>
                  <TableCell align="center">{row.fat}</TableCell>
                  <TableCell align="center">{row.carbs}</TableCell>
                  <TableCell align="center">
                    <Button
                      color="success"
                      onClick={displayPopper}
                      variant="contained"
                    >
                      BUY TICKET
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  );
}
