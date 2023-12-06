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
import Searchresult from "./searchresult";
import Recommendskills from "./recommendskills";

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
const Jobdata = [
  {
    job_num: 1,
    job_name: "【太陽蕃茄拉麺】外場營運主管(薪45000元起）",
    serial_name: "綠洲餐飲管理顧問股份有限公司",
    company_type: "餐館業",
    area: "台北市中正區",
    exp: "3年以上",
    edu: "高中",
    job_L_class: "經營／人資類",
    job_M_class: "經營／幕僚類人員",
    job_S_class: "經營管理主管",
    job_content: "",
    update_date: "11/18",
  },
  {
    job_num: 2,
    job_name: "大埔鐵板燒-公館店 店長/儲備幹部",
    serial_name: "鍋in/大埔鐵板燒_鍋癮有限公司",
    company_type: "餐館業",
    area: "台北市中正區",
    exp: "經歷不拘",
    edu: "學歷不拘",
    job_L_class: "經營／人資類",
    job_M_class: "經營／幕僚類人員",
    job_S_class: "經營管理主管",
    job_content: "",
    update_date: "11/18",
  },
  {
    job_num: 3,
    job_name: "鍋in 百元風味火鍋 店長/儲備幹部 公館店",
    serial_name: "鍋in/大埔鐵板燒_鍋癮有限公司",
    company_type: "餐館業",
    area: "台北市中正區",
    exp: "經歷不拘",
    edu: "學歷不拘",
    job_L_class: "經營／人資類",
    job_M_class: "經營／幕僚類人員",
    job_S_class: "經營管理主管",
    job_content: "",
    update_date: "11/18",
  },
];
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
  "經營／人資類",
"行政／總務／法務類",
"財會／金融專業類",
"行銷／企劃／專案管理類",
"客服／門市／業務／貿易類",
"餐飲／旅遊 ／美容美髮類",
"資訊軟體系統類",
"研發相關類",
"生產製造／品管／環衛類",
"資材／物流／運輸類",
"營建／製圖類",
"傳播藝術／設計類",
"醫療／保健服務類",
"學術／教育／輔導類",
"軍警消／保全類",
"其他職類",
"操作／技術／維修類",
"文字／傳媒工作類",
];
const skills = [
  "丙級電腦軟體設計術士",
  "CPE大學程式能力檢定",
  "SSE C程式語言國際認證",
  "乙級電腦軟體設計技術士-C++ | Level B technician for computer software application - C++",
  "OCP Java Dev.",
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
    <div className="w-auto h-auto">
      <FormControl sx={{ m: 1, width: 400 }}>
        <TextField label="輸入職缺" />
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
      <div className="grid w-auto h-auto justify-items-end">
        <Searchresult Jobdata={Jobdata} />
        <Recommendskills skills={skills} className="" />
      </div>
    </div>
  );
};

export default Jobsearch;
