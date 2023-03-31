import { Button, TextField } from "@mui/material";

import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const Location = (props: {
  setShowFlights: any;
  showFlights: any;
  setSeatsNum: any;
}) => {
  const { showFlights, setShowFlights, setSeatsNum } = props;

  const displayFlights = () => {
    if (showFlights) {
      setShowFlights(false);
    } else {
      setShowFlights(true);
    }
  };

  return (
    <div style={{ padding: "24px 0px" }}>
      <h1>From - To</h1>
      <div style={{ display: "flex", alignItems: "center" }}>
        <TextField
          sx={{ marginRight: "24px" }}
          id="outlined-basic"
          variant="outlined"
          disabled
          value={"Izmir"}
        />
        <ArrowForwardIcon fontSize="large" />
        <TextField
          sx={{ marginLeft: "24px" }}
          id="outlined-basic"
          variant="outlined"
          disabled
          value={"Istanbul"}
        />
        <TextField
          sx={{ marginLeft: "24px" }}
          id="outlined-basic"
          variant="outlined"
          label={"Seats"}
          inputProps={{
            type: "number",
            min: 0,
            max: 6,
            onChange: (event) => {
              const value = parseInt((event.target as HTMLInputElement).value);
              if (value < 0) {
                (event.target as HTMLInputElement).value = "0";
              }
              setSeatsNum(value);
            },
          }}
        />
        <Button
          size="large"
          sx={{ marginLeft: "36px" }}
          variant="contained"
          onClick={displayFlights}
        >
          SHOW FLIGHTS
        </Button>
      </div>
    </div>
  );
};

export default Location;
