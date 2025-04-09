import { Dialog, DialogContent, Box, Grid } from "@mui/material";
import React, { useState } from "react";
import FormInput from "../../../component/FormInput";
import FormButton from "../../../component/FormButton";
import { useDispatch } from "react-redux";
import { fetchAddPainrate } from "../../../Redux/slice/DoctSlice/POST/addPainrateSlice";

const AddPainRate = ({ handleClose, appointmentId, getPainrate }) => {
  const dispatch = useDispatch();
  const [type, setType] = useState("");
  const [painRate, setPainRate] = useState("");

  const handleSubmit = () => {
    const payload = { type, painRate, appointmentId };
    dispatch(fetchAddPainrate(payload))
      .then(() => getPainrate())
      .finally(() => handleClose());
  };

  return (
    <Dialog open={true} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogContent>
        <Box>
          <div className="header-text">Add Pain Rate</div>
          <div className="form-container form-bg mt-2">
            <FormInput
              label="Type"
              type="select"
              options={[
                { value: "emoji", label: "Emoji" },
                { value: "scale", label: "Scale" },
                { value: "numeric", label: "Numeric" },
              ]}
              value={type}
              onChange={(value) => setType(value)}
            />
            {type && (
              <FormInput
                label={`Select Pain Rate (${type.toUpperCase()}):`}
                type="select"
                options={Array.from({ length: 10 }, (_, i) => ({
                  value: i + 1,
                  label: `Pain Rate ${i + 1}`,
                }))}
                value={painRate}
                onChange={(value) => setPainRate(value)}
              />
            )}
          </div>
          <Box sx={{ mt: 3, textAlign: "center" }}>
            <FormButton
              label="Add"
              onClick={handleSubmit}
              disabled={!type || !painRate}
            />
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default AddPainRate;
