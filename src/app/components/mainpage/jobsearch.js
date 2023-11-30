"use client";
import * as React from "react";
import { TextField } from "@mui/material";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import Fab from "@mui/material/Fab";
import NavigationIcon from "@mui/icons-material/Navigation";
import Box from "@mui/material/Box";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = [
  "台北市",
  "新北市",
  "桃園市",
  "新竹縣",
  "新竹市",
  "宜蘭縣",
  "台中市",
  "苗栗縣",
  "彰化縣",
  "南投縣",
];
const jobs = [
  "管理幕僚",
  "金融保險",
  "業務員",
  "行銷專員",
  "光電IC",
  "機械模具",
  "前端工程師",
  "後端工程師",
  "全端工程師",
];
const styles = ["短期", "長期", "兼職人員", "假日", "暑期", "寒假", "遠端工作", "周休二日"];

const Jobsearch = () => {
  const [areaName, setAreaName] = React.useState([]);
  const [jobName, setJobName] = React.useState([]);
  const [styleName, setStyleName] = React.useState([]);

  const handleareaChange = (event) => {
    const {
      target: { value },
    } = event;
    setAreaName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };
  const handlejobChange = (event) => {
    const {
      target: { value },
    } = event;
    setJobName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };
  const handleStyleChange = (event) => {
    const {
      target: { value },
    } = event;
    setStyleName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  return (
    <div>
      <FormControl sx={{ m: 1, width: 400 }}>
        <TextField label="搜尋職缺" />
      </FormControl>
      <div className="flex">
        <FormControl sx={{ m: 1, width: 250 }}>
          <InputLabel id="demo-multiple-checkbox-label">地區</InputLabel>
          <Select
            labelId="demo-multiple-checkbox-label"
            id="demo-multiple-checkbox"
            multiple
            value={areaName}
            onChange={handleareaChange}
            input={<OutlinedInput label="Tag" />}
            renderValue={(selected) => selected.join(", ")}
            MenuProps={MenuProps}
          >
            {names.map((name) => (
              <MenuItem key={name} value={name}>
                <Checkbox checked={areaName.indexOf(name) > -1} />
                <ListItemText primary={name} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl sx={{ m: 1, width: 250 }}>
          <InputLabel id="demo-multiple-checkbox-label">職別</InputLabel>
          <Select
            labelId="demo-multiple-checkbox-label"
            id="demo-multiple-checkbox"
            multiple
            value={jobName}
            onChange={handlejobChange}
            input={<OutlinedInput label="Tag" />}
            renderValue={(selected) => selected.join(", ")}
            MenuProps={MenuProps}
          >
            {jobs.map((job) => (
              <MenuItem key={job} value={job}>
                <Checkbox checked={jobName.indexOf(job) > -1} />
                <ListItemText primary={job} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl sx={{ m: 1, width: 250 }}>
          <InputLabel id="demo-multiple-checkbox-label">性質</InputLabel>
          <Select
            labelId="demo-multiple-checkbox-label"
            id="demo-multiple-checkbox"
            multiple
            value={styleName}
            onChange={handleStyleChange}
            input={<OutlinedInput label="Tag" />}
            renderValue={(selected) => selected.join(", ")}
            MenuProps={MenuProps}
          >
            {styles.map((style) => (
              <MenuItem key={style} value={style}>
                <Checkbox checked={styleName.indexOf(style) > -1} />
                <ListItemText primary={style} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Box sx={{ "& > :not(style)": { m: 1 }, width: "120px", height: "30px" }}>
          <Fab variant="extended">
            <NavigationIcon sx={{ fontSize: "1.2rem", mr: 1 }} />
            搜尋
          </Fab>
        </Box>
      </div>
    </div>
  );
};

export default Jobsearch;
