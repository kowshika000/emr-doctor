import { Dialog, DialogContent, Box, Grid } from "@mui/material";
import React, { useState } from "react";
import FormInput from "../../../component/FormInput";
import FormButton from "../../../component/FormButton";

const AddPainRate = ({ handleCloseAddVital, onAddPainRate }) => {
  const [type, setType] = useState("");
  const [painRate, setPainRate] = useState("");

  const handleSubmit = () => {
    onAddPainRate({ type, painRate });
    handleCloseAddVital();
  };

  return (
    <Dialog open={true} onClose={handleCloseAddVital} fullWidth maxWidth="sm">
      <DialogContent>
        <Box>
          <div className="header-text">Add Pain Rate</div>
          <div className="form-container form-bg">
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
