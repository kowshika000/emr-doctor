import React from "react";
import {
  TextField,
  Box,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";

const FormInput = ({
  label,
  value,
  onChange,
  type = "text",
  options = [],
  required = false,
  ...props
}) => {
  return (
    <Box>
      {type === "select" ? (
        <FormControl required={required} variant="standard">
          <InputLabel
            // shrink={true}
            sx={{
              color: "rgb(14, 14, 14)",
              fontSize: "12px",
              "&.Mui-focused": { color: "rgb(20, 20, 20)" },
            }}
          >
            {label}
          </InputLabel>
          <Select
            value={
              options.some((option) => option.label === value) ? value : ""
            } // Only show label if value matches an option's label
            onChange={(e) => {
              const selectedOption = options.find(
                (option) => option.label === e.target.value
              );
              onChange(selectedOption?.label || "");
            }}
            label={label}
            sx={{
              width: "100%",
              minWidth: "180px",
              fontSize: "12px",
              border: "1px solid #ccc",
              borderRadius: "4px",
              "&:before": {
                borderBottom: "1px solid rgb(129, 129, 129)",
              },
              "&:after": {
                borderBottom: "1px solid rgb(129, 129, 129)",
              },
              "&.Mui-focused:before": {
                borderBottom: "1px solid rgb(129, 129, 129) !important",
              },
            }}
            {...props}
          >
            <MenuItem value="" disabled>
              Select {label}
            </MenuItem>
            {options.map((option, index) => (
              <MenuItem
                key={index}
                value={option.label}
                sx={{ fontSize: "12px" }}
              >
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      ) : (
        <TextField
          label={label}
          value={value}
          onChange={onChange}
          variant="standard"
          fullWidth
          required={required}
          type={type === "textarea" ? undefined : type}
          multiline={type === "textarea"}
          rows={type === "textarea" ? 2 : undefined}
          InputLabelProps={{
            shrink: type === "date" ? true : undefined,
            sx: {
              color: "rgb(22, 22, 22)",
              fontSize: "12px", // Font size for label
              "&.Mui-focused": { color: "rgb(24, 24, 24)" },
              minWidth: "300px",
            },
          }}
          inputProps={{
            style: { fontSize: "12px" },
          }}
          sx={{
            // fontSize: "16px",
            "& .MuiInput-underline:before": {
              borderBottom: "1px solid rgb(129, 129, 129)",
            },
            "& .MuiInput-underline:hover:before": {
              borderBottom: "1px solid rgb(129, 129, 129)",
            },
            "& .MuiInput-underline:after": {
              borderBottom: "1px solid rgb(129, 129, 129)",
            },
            "& .css-1yrc8ca-MuiInputBase-input-MuiInput-input": {
              backgroundColor: "rgb(236, 238, 238)",
              borderRadius: "4px",
            },
          }}
          {...props}
        />
      )}
    </Box>
  );
};

export default FormInput;
