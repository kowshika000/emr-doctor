import React, { useState } from "react";
import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
  TextField,
  Grid,
  Button,
} from "@mui/material";

const UCAFForm = () => {
  const [caseManagementIncluded, setCaseManagementIncluded] = useState("no");

  const handleChange = (event) => {
    setCaseManagementIncluded(event.target.value);
  };

  return (
    <div className="my-4 card p-3">
      <h6>Is Case Management Form (CMF1.0) included?</h6>
      <FormControl component="fieldset">
        <RadioGroup value={caseManagementIncluded} onChange={handleChange} row>
          <FormControlLabel
            value="yes"
            control={<Radio size="small" />}
            label="Yes"
          />
          <FormControlLabel
            value="no"
            control={<Radio size="small" />}
            label="No"
          />
        </RadioGroup>
      </FormControl>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Possible Line Of Management"
            variant="standard"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Estimated Length Of Stay"
            variant="standard"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Expected Date Of Admission"
            variant="standard"
            fullWidth
          />
        </Grid>
      </Grid>
      <div className="mt-4">
        <div className="custom-btn text-center">Save</div>
      </div>
    </div>
  );
};

export default UCAFForm;
