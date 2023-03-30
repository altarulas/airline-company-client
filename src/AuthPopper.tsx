import * as React from "react";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { TextField } from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import axios from "axios";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

type User = {
  _id: string;
  name: string;
  surname: string;
  username: string;
  password: string;
};

type Flight = {
  _id: string;
  from: string;
  to: string;
  date: string;
  flightNo: string;
  price: string;
  availableSeats: string;
};

export default function Popper(props: {
  popper: any;
  setPopper: any;
  setToken: any;
  token: any;
  flightList: any;
  setShowReservations: any;
  setReservations: any;
  setLoading: any;
  _id: any;
}) {
  const {
    popper,
    setPopper,
    setToken,
    token,
    _id,
    flightList,
    setShowReservations,
    setReservations,
    setLoading,
  } = props;

  const [users, setUsers] = React.useState<User[]>([]);
  const [filteredUser, setFilteredUser] = React.useState<User[]>([]);

  const [reservationFlight, setReservationFlight] = React.useState<Flight>();

  const [inputs, setInputs] = React.useState({
    username: "",
    password: "",
    seats: "",
  });

  const authHandler = async () => {
    setLoading(true);
    const seats = inputs.seats;

    const userInfo = {
      username: inputs.username,
      password: inputs.password,
    };

    try {
      const response = await axios.post(
        "http://localhost:3002/api/v1/users/token",
        userInfo
      );
      setToken(response.data.token);

      if (token) {
        const verifyToken = { headers: { Authorization: token } };
        const response = await axios.get(
          "http://localhost:3002/api/v1/users",
          verifyToken
        );
        setUsers(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    if (users) {
      const filterUser = users.filter(
        (user: User) => user.username === inputs.username
      );

      setFilteredUser(filterUser);

      const filteredFlight = flightList.find(
        (flight: any) => flight._id === _id
      );

      setReservationFlight(filteredFlight);
    }
  }, [users]);

  React.useEffect(() => {
    if (reservationFlight && filteredUser && token) {
      const reservationData = {
        userId: filteredUser[0]._id,
        name: filteredUser[0].name,
        surname: filteredUser[0].surname,
        flightId: reservationFlight._id,
        from: reservationFlight.from,
        to: reservationFlight.to,
        date: reservationFlight.date,
        flightNo: reservationFlight.flightNo,
        price: reservationFlight.price,
        availableSeats: reservationFlight.availableSeats,
      };

      const verifyToken = { headers: { Authorization: token } };
      axios.post(
        "http://localhost:3002/api/v1/reservations",
        reservationData,
        verifyToken
      );

      axios
        .get("http://localhost:3002/api/v1/reservations", verifyToken)
        .then((response) => {
          setReservations(response.data);
          setShowReservations(true);
          setLoading(false);
        })
        .catch((error) => console.log(error));
    }
  }, [filteredUser, reservationFlight, token]);

  const handleClose = () => {
    setPopper(false);
  };

  return (
    <div>
      <Dialog
        open={popper}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"LOGIN"}</DialogTitle>
        <DialogContent>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              padding: "24px",
              width: "300px",
            }}
          >
            <TextField
              id="standard-basic"
              label="Username"
              variant="standard"
              sx={{ marginBottom: "24px" }}
              onChange={(e) => {
                setInputs({ ...inputs, username: e.target.value });
              }}
            />
            <TextField
              id="standard-basic"
              label="Password"
              variant="standard"
              type="password"
              sx={{ marginBottom: "40px" }}
              onChange={(e) => {
                setInputs({ ...inputs, password: e.target.value });
              }}
            />
            <TextField
              id="standard-basic"
              label="Number of People"
              variant="standard"
              sx={{ marginBottom: "40px" }}
              onChange={(e) => {
                setInputs({ ...inputs, seats: e.target.value });
              }}
            />
            <Button onClick={authHandler} variant="contained">
              LOGIN
            </Button>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>CLOSE</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
