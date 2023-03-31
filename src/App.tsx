import { useEffect, useState } from "react";

import AuthPopper from "./Components/AuthPopper";
import Flights from "./Components/Flights";
import Location from "./Components/Location";
import Reservation from "./Components/Reservation";
import axios from "axios";

const App = () => {
  const [seatsNum, setSeatsNum] = useState(0);

  const [showFlights, setShowFlights] = useState(false);
  const [flightList, setFlightList] = useState([]);
  const [filteredFlight, setFilteredFlight] = useState([]);
  const [refreshFlightList, setRefreshFlightList] = useState(false);

  const [popper, setPopper] = useState(false);
  const [token, setToken] = useState("");

  const [currentUser, setCurrentUser] = useState([]);
  const [reservations, setReservations] = useState([]);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // setting flights
  useEffect(() => {
    axios
      .get("http://localhost:3002/api/v1/flights")
      .then((response) => {
        setFlightList(response.data.results);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // setting flights after reservation
  useEffect(() => {
    axios
      .get("http://localhost:3002/api/v1/flights")
      .then((response) => {
        setFlightList(response.data.results);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [refreshFlightList]);

  return (
    <div style={{ padding: "24px" }}>
      <Location setSeatsNum={setSeatsNum} />

      <Flights
        seatsNum={seatsNum}
        flightList={flightList}
        setFilteredFlight={setFilteredFlight}
        setPopper={setPopper}
      />

      <Reservation currentUser={currentUser} reservations={reservations} />

      <AuthPopper
        token={token}
        setToken={setToken}
        filteredFlight={filteredFlight}
        currentUser={currentUser}
        setCurrentUser={setCurrentUser}
        setReservations={setReservations}
        seatsNum={seatsNum}
        popper={popper}
        setPopper={setPopper}
        loading={loading}
        setLoading={setLoading}
        setMessage={setMessage}
        message={message}
        setRefreshFlightList={setRefreshFlightList}
      />
    </div>
  );
};

export default App;
