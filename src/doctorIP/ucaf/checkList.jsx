import React, { useState } from "react";
import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  TextField,
  Grid,
  Button,
} from "@mui/material";

const DiagnosisChecklist = () => {
  const [checkedItems, setCheckedItems] = useState({
    chronic: false,
    congenital: false,
    rta: false,
    workRelated: false,
    vaccination: false,
    checkup: false,
    psychiatric: false,
    infertility: false,
    pregnancy: false,
    lmp: "",
  });

  const handleCheckboxChange = (event) => {
    setCheckedItems({
      ...checkedItems,
      [event.target.name]: event.target.checked,
    });
  };

  const handleInputChange = (event) => {
    setCheckedItems({
      ...checkedItems,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = () => {
    alert(JSON.stringify(checkedItems, null, 2));
  };

  return (
    <div>
      <h6 className="my-4">Please tick where appropriate (Check list in below)</h6>
      <FormGroup>
        <Grid container spacing={2}>
          <Grid item>
            <FormControlLabel
              control={
                <Checkbox
                  checked={checkedItems.chronic}
                  onChange={handleCheckboxChange}
                  name="chronic"
                />
              }
              label="Chronic"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={checkedItems.congenital}
                  onChange={handleCheckboxChange}
                  name="congenital"
                />
              }
              label="Congenital"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={checkedItems.rta}
                  onChange={handleCheckboxChange}
                  name="rta"
                />
              }
              label="RTA"
            />
          </Grid>
          <Grid item>
            <FormControlLabel
              control={
                <Checkbox
                  checked={checkedItems.workRelated}
                  onChange={handleCheckboxChange}
                  name="workRelated"
                />
              }
              label="Work related"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={checkedItems.vaccination}
                  onChange={handleCheckboxChange}
                  name="vaccination"
                />
              }
              label="Vaccination"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={checkedItems.checkup}
                  onChange={handleCheckboxChange}
                  name="checkup"
                />
              }
              label="Checkup"
            />
          </Grid>
          <Grid item>
            <FormControlLabel
              control={
                <Checkbox
                  checked={checkedItems.psychiatric}
                  onChange={handleCheckboxChange}
                  name="psychiatric"
                />
              }
              label="Psychiatric"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={checkedItems.infertility}
                  onChange={handleCheckboxChange}
                  name="infertility"
                />
              }
              label="Infertility"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={checkedItems.pregnancy}
                  onChange={handleCheckboxChange}
                  name="pregnancy"
                />
              }
              label="Pregnancy"
            />
          </Grid>
        </Grid>

        <TextField
          label="LMP"
          variant="standard"
          margin="normal"
          name="lmp"
          value={checkedItems.lmp}
          onChange={handleInputChange}
          fullWidth
        />
      </FormGroup>
    </div>
  );
};

export default DiagnosisChecklist;
