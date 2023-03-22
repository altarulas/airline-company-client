import { Button, TextField } from "@mui/material";

import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const LocationDecider = (props: { setFlights: any; flights: any }) => {
  const { setFlights, flights } = props;

  const showFlights = () => {
    if (flights) {
      setFlights(false);
    } else {
      setFlights(true);
    }
  };

  return (
    <div style={{ padding: "24px 0px" }}>
      <h1>From - To</h1>
      <div style={{ display: "flex", alignItems: "center" }}>
        <TextField
          sx={{ marginRight: "24px" }}
          id="outlined-basic"
          label="Outlined"
          variant="outlined"
        />
        <ArrowForwardIcon fontSize="large" />
        <TextField
          sx={{ marginLeft: "24px" }}
          id="outlined-basic"
          label="Outlined"
          variant="outlined"
        />
        <Button
          size="large"
          sx={{ marginLeft: "36px" }}
          variant="contained"
          onClick={showFlights}
        >
          SHOW FLIGHTS
        </Button>
      </div>
    </div>
  );
};

export default LocationDecider;
