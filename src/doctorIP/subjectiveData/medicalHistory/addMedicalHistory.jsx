import { Dialog, DialogContent } from "@mui/material";
import React from "react";

export const AddMedicalHistory = ({ handleCloseModal }) => {
  return (
    <Dialog open={true} onClose={handleCloseModal} fullWidth>
      <DialogContent>
        <h6>Add Medical History</h6>
      </DialogContent>
    </Dialog>
  );
};
