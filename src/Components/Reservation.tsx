import { useEffect, useState } from "react";

import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

export default function Reservation(props: {
  currentUser: any;
  reservations: any;
}) {
  const { currentUser, reservations } = props;

  const [userReservation, setUserReservation] = useState([]);

  useEffect(() => {
    if (reservations.length > 0 && currentUser) {
      const filteredReservation = reservations.filter(
        (reservation: any) => reservation.userId === currentUser[0]._id
      );
      setUserReservation(filteredReservation);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reservations]);

  return (
    <div style={{ marginTop: "100px" }}>
      {reservations && (
        <TableContainer component={Paper}>
          <div style={{ fontSize: "28px", marginBottom: "24px" }}>
            Current Reservations
          </div>
          <Table
            sx={{ minWidth: 650, background: "#dadada" }}
            aria-label="simple table"
          >
            <TableHead>
              <TableRow>
                <TableCell>Flight No</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Surname</TableCell>
                <TableCell align="center">From</TableCell>
                <TableCell align="center">To</TableCell>
                <TableCell align="center">Date</TableCell>
                <TableCell align="center">Price</TableCell>
                <TableCell align="center">Number of Seats</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {userReservation.map((reservation: any) => (
                <TableRow
                  key={reservation._id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="center">{reservation.flightNo}</TableCell>
                  <TableCell component="th" scope="reservation">
                    {reservation.name}
                  </TableCell>
                  <TableCell align="center">{reservation.surname}</TableCell>
                  <TableCell align="center">{reservation.from}</TableCell>
                  <TableCell align="center">{reservation.to}</TableCell>
                  <TableCell align="center">{reservation.date}</TableCell>
                  <TableCell align="center">{reservation.price}</TableCell>
                  <TableCell align="center">{reservation.numOfSeats}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
}
