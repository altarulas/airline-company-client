import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { TextField } from "@mui/material";

const Location = (props: { setSeatsNum: any }) => {
  const { setSeatsNum } = props;

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
        <div style={{ display: "flex", alignItems: "center" }}>
          <TextField
            sx={{ marginLeft: "24px" }}
            id="outlined-basic"
            variant="outlined"
            label={"Seats"}
            inputProps={{
              type: "number",
              min: 1,
              max: 5,
              onChange: (event) => {
                const value = parseInt(
                  (event.target as HTMLInputElement).value
                );
                if (value < 0) {
                  (event.target as HTMLInputElement).value = "0";
                }
                setSeatsNum(value);
              },
            }}
          />
          <span style={{ marginLeft: "20px", fontSize: "20px" }}>
            (To see the flights, increase seat number)
          </span>
        </div>
      </div>
    </div>
  );
};

export default Location;
