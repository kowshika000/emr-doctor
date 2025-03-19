import React, { useState } from "react";
import {
  TextField,
  Box,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  FormHelperText,
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
  const [error, setError] = useState(false);

  const handleBlur = () => {
    if (required && !value) {
      setError(true);
    } else {
      setError(false);
    }
  };

  return (
    <Box sx={{ width: "100%" }}>
      {type === "select" ? (
        <FormControl
          required={required}
          error={error}
          size="small"
          sx={{ width: "100%" }}
        >
          <InputLabel>{label}</InputLabel>
          <Select
            value={value || ""}
            onChange={(e) => {
              const selectedOption = options.find(
                (option) => option.label === e.target.value
              );
              onChange(selectedOption?.label || "");
              setError(required && !selectedOption?.label);
            }}
            onBlur={handleBlur}
            label={label}
            sx={{ width: "100%" }}
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
          {error && <FormHelperText>{label} is required</FormHelperText>}
        </FormControl>
      ) : (
        <TextField
          label={label}
          value={value}
          onChange={(e) => {
            const newValue = e.target.value;
            onChange(newValue);
            setError(required && !newValue);
          }}
          onBlur={handleBlur}
          size="small"
          fullWidth
          required={required}
          type={type === "textarea" ? undefined : type}
          multiline={type === "textarea"}
          rows={type === "textarea" ? 2 : undefined}
          error={error}
          helperText={error ? `${label} is required` : ""}
          InputLabelProps={{
            shrink: type === "date" ? true : undefined,
          }}
          inputProps={{
            ...(type === "date" && { pattern: "\\d{4}-\\d{2}-\\d{2}" }),
          }}
          {...props}
        />
      )}
    </Box>
  );
};

export default FormInput;
