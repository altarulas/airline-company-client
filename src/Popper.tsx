import * as React from "react";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { TextField } from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Popper(props: { popper: any; setPopper: any }) {
  const { popper, setPopper } = props;

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
              label="Name"
              variant="standard"
              sx={{ marginBottom: "24px" }}
            />
            <TextField
              id="standard-basic"
              label="Surname"
              variant="standard"
              sx={{ marginBottom: "24px" }}
            />
            <TextField
              id="standard-basic"
              label="Username"
              variant="standard"
              sx={{ marginBottom: "24px" }}
            />
            <TextField
              id="standard-basic"
              label="Password"
              variant="standard"
              sx={{ marginBottom: "40px" }}
            />
            <Button variant="contained">LOGIN</Button>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>CLOSE</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
