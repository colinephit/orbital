// front end design (only) of the pop up that will be displayed when a user ticks the task off the to do list
// consists of a dropdown where users can select the number of hours spent
"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

interface SelectHoursProps {
  hours: string;
  onHoursChange: (hours: string) => void;
}

export default function SelectHours({
  hours,
  onHoursChange,
}: SelectHoursProps) {
  const handleChange = (event: SelectChangeEvent) => {
    onHoursChange(event.target.value as string);
  };

  const hourOptions = [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
    "12",
    "13",
    "14",
    "15",
    "16",
    "17",
    "18",
    "19",
    "20",
    "21",
    "22",
    "23",
    "24",
  ];

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl required sx={{ width: "100%" }}>
        <InputLabel id="demo-simple-select-label">Hours</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={hours}
          label="Hours"
          onChange={handleChange}
        >
          {hourOptions.map((hour, index) => (
            <MenuItem key={index} value={hour}>
              {hour}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
