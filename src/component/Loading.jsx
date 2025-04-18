// components/Loading.js
import React from "react";
import { Backdrop, CircularProgress } from "@mui/material";

const Loading = ({ loading = false }) => {
  return (
    <Backdrop
      open={loading}
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 999,
        color: "#fff",
        backgroundColor: "rgba(255, 255, 255, 0.7)",
      }}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

export default Loading;
