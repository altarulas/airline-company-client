import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

export default function ReservationTable(props: {
  reservations: any;
  showReservation: any;
}) {
  const { reservations, showReservation } = props;

  console.log(reservations);

  return (
    <div style={{ marginTop: "100px" }}>
      {reservations && showReservation && (
        <TableContainer component={Paper}>
          <Table
            sx={{ minWidth: 650, background: "#dadada" }}
            aria-label="simple table"
          >
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Surname</TableCell>
                <TableCell>Flight No</TableCell>
                <TableCell align="center">From</TableCell>
                <TableCell align="center">To</TableCell>
                <TableCell align="center">Date</TableCell>
                <TableCell align="center">Price</TableCell>
                <TableCell align="center">FlightNo</TableCell>
                <TableCell align="center">Seats</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {reservations.map((reservation: any) => (
                <TableRow
                  key={reservation._id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="reservation">
                    {reservation.name}
                  </TableCell>
                  <TableCell align="center">{reservation.surname}</TableCell>
                  <TableCell align="center">{reservation.flightNo}</TableCell>
                  <TableCell align="center">{reservation.from}</TableCell>
                  <TableCell align="center">{reservation.to}</TableCell>
                  <TableCell align="center">{reservation.date}</TableCell>
                  <TableCell align="center">{reservation.price}</TableCell>
                  <TableCell align="center">{reservation.flightNo}</TableCell>
                  <TableCell align="center">
                    {reservation.availableSeats}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
}
