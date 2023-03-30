import { useEffect, useState } from "react";

import AuthPopper from "./AuthPopper";
import Flights from "./Flights";
import Loading from "./Loading";
import LocationDecider from "./LocationDecider";
import ReservationTable from "./Reservation";
import axios from "axios";

const App = () => {
  const [popper, setPopper] = useState(false);
  const [showFlights, setShowFlights] = useState(false);
  const [reservations, setReservations] = useState([]);

  const [showReservation, setShowReservations] = useState(false);

  const [fresher, setFresher] = useState(false);

  const [flightList, setFlightList] = useState([]);
  const [_id, set_id] = useState("");

  const [token, setToken] = useState("");

  const [loading, setLoading] = useState(false);

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

  return (
    <div style={{ padding: "24px" }}>
      <LocationDecider
        showFlights={showFlights}
        setShowFlights={setShowFlights}
      />

      <Flights
        setPopper={setPopper}
        showFlights={showFlights}
        flightList={flightList}
        set_id={set_id}
      />

      <AuthPopper
        setLoading={setLoading}
        setReservations={setReservations}
        setShowReservations={setShowReservations}
        popper={popper}
        setPopper={setPopper}
        setToken={setToken}
        token={token}
        flightList={flightList}
        _id={_id}
      />

      <ReservationTable
        reservations={reservations}
        showReservation={showReservation}
      />

      <Loading loading={loading} />
    </div>
  );
};

export default App;
