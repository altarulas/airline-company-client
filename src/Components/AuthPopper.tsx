import * as React from "react";

import { useEffect, useState } from "react";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Loading from "./Loading";
import Slide from "@mui/material/Slide";
import SnackBar from "./SnackBar";
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

export default function AuthPopper(props: {
  token: any;
  setToken: any;
  filteredFlight: any;
  currentUser: any;
  setCurrentUser: any;
  seatsNum: any;
  setReservations: any;
  popper: any;
  setPopper: any;
  loading: any;
  setLoading: any;
  setMessage: any;
  message: any;
  setRefreshFlightList: any;
}) {
  const {
    token,
    setToken,
    filteredFlight,
    currentUser,
    setCurrentUser,
    seatsNum,
    setReservations,
    popper,
    setPopper,
    loading,
    setLoading,
    setMessage,
    message,
    setRefreshFlightList,
  } = props;

  const [inputs, setInputs] = React.useState({
    username: "",
    password: "",
  });
  const [users, setUsers] = useState([]);

  const authHandler = async () => {
    setLoading(true);

    const userInfo = {
      username: inputs.username,
      password: inputs.password,
    };

    try {
      if (process.env.REACT_APP_JWT_TOKEN_END_POINT) {
        await axios
          .post(process.env.REACT_APP_JWT_TOKEN_END_POINT, userInfo)
          .then((response) => setToken(response.data.token))
          .catch(() => {
            setMessage("Information's are not correct");
            setLoading(false);
          });
      }
    } catch (error) {
      console.log("auth handler error: ", error);
    }
  };

  useEffect(() => {
    if (token && process.env.REACT_APP_USERS_END_POINT) {
      const verifyToken = { headers: { Authorization: token } };
      axios
        .get(process.env.REACT_APP_USERS_END_POINT, verifyToken)
        .then((response) => setUsers(response.data))
        .catch((error) => console.log("Error fetching user data:", error));
    }
  }, [token]);

  useEffect(() => {
    if (users.length > 0) {
      const filteredUser = users.filter(
        (user: any) =>
          user.username === inputs.username && user.password === inputs.password
      );
      setCurrentUser(filteredUser);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [users]);

  useEffect(() => {
    if (currentUser.length > 0 && filteredFlight.length > 0) {
      const goingData = {
        userId: currentUser[0]._id,
        name: currentUser[0].name,
        surname: currentUser[0].surname,
        flightId: filteredFlight[0]._id,
        flightNo: filteredFlight[0].flightNo,
        from: filteredFlight[0].from,
        to: filteredFlight[0].to,
        date: filteredFlight[0].date,
        price: filteredFlight[0].price,
        numOfSeats: String(seatsNum),
      };

      const verifyToken = { headers: { Authorization: token } };
      try {
        if (process.env.REACT_APP_RESERVATION_END_POINT) {
          axios
            .post(
              process.env.REACT_APP_RESERVATION_END_POINT,
              goingData,
              verifyToken
            )
            .then(() => {
              const verifyToken = { headers: { Authorization: token } };
              if (process.env.REACT_APP_RESERVATION_END_POINT) {
                axios
                  .get(process.env.REACT_APP_RESERVATION_END_POINT, verifyToken)
                  .then((response) => setReservations(response.data))
                  .catch((error) =>
                    console.log("Error getting reservation: ", error)
                  );
              }
              setPopper(false);
              setInputs({ username: "", password: "" });
              setToken("");
              setLoading(false);
              setMessage("Reservation made successfully");
            })
            .catch((error) => {
              console.log("Error creating reservation:", error);
              setLoading(false);
              setMessage(false);
            });
        }

        const newSeatNumber = String(
          filteredFlight[0].availableSeats - seatsNum
        );

        const decreaseSeatNumber = {
          flightId: filteredFlight[0]._id,
          flightNo: filteredFlight[0].flightNo,
          from: filteredFlight[0].from,
          to: filteredFlight[0].to,
          date: filteredFlight[0].date,
          price: filteredFlight[0].price,
          availableSeats: newSeatNumber,
        };

        if (process.env.REACT_APP_FLIGHT_END_POINT) {
          axios
            .put(
              `${process.env.REACT_APP_FLIGHT_END_POINT}/${filteredFlight[0]._id}`,
              decreaseSeatNumber,
              verifyToken
            )
            .then(() => {
              setRefreshFlightList(true);
              setTimeout(() => {
                setRefreshFlightList(false);
              }, 1500);
            })
            .catch((error) => console.log(error));
        }
      } catch (error) {
        console.log(error);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser]);

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
              value={inputs.username}
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
              value={inputs.password}
              onChange={(e) => {
                setInputs({ ...inputs, password: e.target.value });
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
      {message && <SnackBar message={message} setMessage={setMessage} />}
      {loading && <Loading loading={loading} />}
    </div>
  );
}
