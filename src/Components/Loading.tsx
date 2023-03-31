import { useEffect, useState } from "react";

import CircularProgress from "@mui/material/CircularProgress";
import Dialog from "@mui/material/Dialog";

const Loading = (props: { loading: any }) => {
  const { loading } = props;
  const [open = false, setOpen] = useState(false);

  useEffect(() => {
    setOpen(loading);
  }, [loading]);

  return (
    <>
      <Dialog sx={{ opacity: "0.8" }} open={open}>
        <div style={{ padding: "8px 12px" }}>
          <CircularProgress />
        </div>
      </Dialog>
    </>
  );
};

export default Loading;
