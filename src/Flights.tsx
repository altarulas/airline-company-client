import { Button } from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

export default function FlightTable(props: {
  setPopper: any;
  showFlights: any;
  set_id: any;
  flightList: any;
}) {
  const { setPopper, showFlights, set_id, flightList } = props;

  const displayPopper = (flightId: any) => {
    setPopper(true);
    set_id(flightId);
  };

  return (
    <>
      {showFlights && (
        <TableContainer component={Paper}>
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
              {flightList.map((flight: any) => (
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
      )}
    </>
  );
}
