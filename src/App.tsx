import Flights from "./Flights";
import LocationDecider from "./LocationDecider";
import Popper from "./Popper";
import { useState } from "react";

const App = () => {
  const [popper, setPopper] = useState(false);
  const [flights, setFlights] = useState(false);
  return (
    <div style={{ padding: "24px" }}>
      <LocationDecider flights={flights} setFlights={setFlights} />

      <Flights setPopper={setPopper} flights={flights} />

      <Popper popper={popper} setPopper={setPopper} />
    </div>
  );
};

export default App;
