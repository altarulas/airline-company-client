import { useEffect, useState } from "react";

import { Button } from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

export default function Flights(props: {
  seatsNum: any;
  flightList: any;
  setFilteredFlight: any;
  setPopper: any;
}) {
  const { seatsNum, flightList, setFilteredFlight, setPopper } = props;

  const [flightId, setFlightId] = useState("");
  const [filteredBySeats, setFilteredBySeats] = useState([]);

  const displayPopper = (flightId: any) => {
    setPopper(true);
    setFlightId(flightId);
  };

  useEffect(() => {
    if (flightList.length > 0 && seatsNum) {
      const filteredBySeats = flightList.filter(
        (flight: any) => flight.availableSeats === String(seatsNum)
      );
      setFilteredBySeats(filteredBySeats);

      const filteredById = flightList.filter(
        (flight: any) => flight._id === flightId
      );
      setFilteredFlight(filteredById);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [flightList, seatsNum, flightId]);

  return (
    <>
      <TableContainer component={Paper}>
        <div style={{ fontSize: "28px", marginBottom: "24px" }}>
          Flight List
        </div>
        <Table
          sx={{ minWidth: 650, background: "#dadada" }}
          aria-label="simple table"
        >
          <TableHead>
            <TableRow>
              <TableCell>Flight No</TableCell>
              <TableCell align="center">From</TableCell>
              <TableCell align="center">To</TableCell>
              <TableCell align="center">Date</TableCell>
              <TableCell align="center">Price</TableCell>
              <TableCell align="center">Available Seats</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredBySeats.map((flight: any) => (
              <TableRow
                key={flight._id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="flight">
                  {flight.flightNo}
                </TableCell>
                <TableCell align="center">{flight.from}</TableCell>
                <TableCell align="center">{flight.to}</TableCell>
                <TableCell align="center">{flight.date}</TableCell>
                <TableCell align="center">{flight.price}$</TableCell>
                <TableCell align="center">{flight.availableSeats}</TableCell>
                <TableCell align="center">
                  <Button
                    color="success"
                    onClick={() => {
                      displayPopper(flight._id);
                    }}
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
    </>
  );
}
