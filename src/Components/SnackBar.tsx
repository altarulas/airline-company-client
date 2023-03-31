import { useEffect, useState } from "react";

const SnackBar = (props: { message: any; setMessage: any }) => {
  const { message, setMessage } = props;

  const [showSnackbar, setShowSnackbar] = useState(false);

  useEffect(() => {
    setShowSnackbar(true);
    const timeoutId = setTimeout(() => {
      setShowSnackbar(false);
      setMessage("");
    }, 2000);
    return () => clearTimeout(timeoutId);
  }, [message]);

  return (
    <>
      {showSnackbar && (
        <div
          style={{
            background: `${
              message === "Reservation made successfully" ? "green" : "red"
            }`,
            position: "fixed",
            bottom: "8px",
            left: "8px",
            padding: "16px",
            borderRadius: "5px",
            color: "white",
          }}
        >
          <span
            style={{
              marginBottom: "6px",
              marginLeft: "12px",
            }}
          >
            {message}
          </span>
        </div>
      )}
    </>
  );
};

export default SnackBar;
