"use client";
import * as React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { parseCookies } from "nookies";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import Fab from "@mui/material/Fab";
import NavigationIcon from "@mui/icons-material/Navigation";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Box from "@mui/material/Box";
import Searchresult from "./searchresult";
import Recommendskills from "./recommendskills";
import Reclanguage from "./reclanguage";
import Reccertificate from "./reccertificate";
import { Engineering } from "@mui/icons-material";
import LanguageIcon from "@mui/icons-material/Language";
import BadgeIcon from "@mui/icons-material/Badge";
import axios from "axios";
import Pagination from "@mui/material/Pagination";
import Image from "next/image";
import { parse } from "postcss";

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
const styles = ["工讀", "全職", "兼職", "長期工讀", "假日工讀", "外場", "高階"];
const itemsPerPage = 20;
const Jobsearch = () => {
  const [areaName, setAreaName] = useState([]);
  const [jobName, setJobName] = useState([]);
  const [styleName, setStyleName] = useState([]);
  const [jobdata, setjobdata] = useState([]);
  const [language, setLanguage] = useState([]);
  const [skills, setSkill] = useState([]);
  const [certificate, setCertificate] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totaljob, settotaljob] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // 資料更新後重新計算分頁資料
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedData = totaljob.slice(startIndex, endIndex);
    setjobdata(paginatedData);
  }, [currentPage, totaljob]);

  async function fetchjobs() {
    setLoading(true);
    try {
      const response = await axios.post(`http://localhost:5000/api/searchwork`, {
        job_L_class: jobName,
        job_type: styleName,
        area: areaName,
      });
      console.log(response);
      settotaljob(response.data);
      setCurrentPage(1);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  }
  async function fetchlanguage() {
    try {
      const response = await axios.post(`http://localhost:5000/api/searchlanguage`, {
        job_L_class: jobName,
        job_type: styleName,
        area: areaName,
      });
      setLanguage(response.data);
      console.log("Language");
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }
  async function fetchskill() {
    try {
      const response = await axios.post(`http://localhost:5000/api/searchskill`, {
        job_L_class: jobName,
        job_type: styleName,
        area: areaName,
      });
      setSkill(response.data);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }
  async function fetchCertificate() {
    try {
      const response = await axios.post(`http://localhost:5000/api/searchCertificate`, {
        job_L_class: jobName,
        job_type: styleName,
        area: areaName,
      });
      setCertificate(response.data);
      console.log(certificate);
    } catch (error) {
      console.log(error);
    }
  }

  const handleSearch = () => {
    fetchjobs();
    fetchlanguage();
    fetchskill();
    fetchCertificate();
    setCurrentPage(1);
  };

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

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  async function forumnHandler(name) {
    const forumid = encodeURIComponent(name);
    console.log(forumid);
    router.push(`/forum/${forumid}`);
  }
  return (
    <div className="w-auto h-auto">
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
          <Fab variant="extended" onClick={handleSearch}>
            <NavigationIcon sx={{ fontSize: "1.2rem", mr: 1 }} />
            搜尋
          </Fab>
        </Box>
      </div>
      <div className="w-full h-auto mt-4">
        {jobdata.length > 0 ? ( // 如果有 jobdata
          <div className="h-auto">
            {loading && <Image src="/giphy.gif" alt="loggingif" height={150} width={150} />}
            <div className="flex">
              <Searchresult Jobdata={jobdata} className="flex-1 w-3/4 h-auto" />
              <div className="w-1/4 h-[600px]">
                <div className="flex flex-col items-center mb-4">
                  <p className="mb-2 font-semibold">討論區</p>
                  <ButtonGroup orientation="vertical" aria-label="vertical outlined button group">
                    {jobName.map((name, index) => (
                      <Button key={name} onClick={() => forumnHandler(name)}>
                        {name}
                      </Button>
                    ))}
                  </ButtonGroup>
                </div>
                <div className="flex items-center mb-2">
                  <Engineering />
                  <span className="ml-2 font-semibold">技能推薦</span>
                </div>
                <Recommendskills Skills={skills} className="" />
                <div className="flex items-center my-2">
                  <LanguageIcon />
                  <span className="ml-2 font-semibold">語言推薦</span>
                </div>
                <Reclanguage Language={language} />
                <div className="flex items-center my-2">
                  <BadgeIcon />
                  <span className="ml-2 font-semibold">證照推薦</span>
                </div>
                <Reccertificate Certificates={certificate} />
              </div>
            </div>
            <Pagination
              count={Math.ceil(totaljob.length / itemsPerPage)}
              page={currentPage}
              onChange={handlePageChange}
              variant="outlined"
              color="primary"
              className="mt-4 ml-12"
            />
          </div>
        ) : (
          <div className="flex items-center justify-center w-full h-auto mt-24">
            {loading ? (
              <Image src="/giphy.gif" alt="loggingif" height={150} width={150} />
            ) : (
              <>
                <Image src="/rabbitgif.gif" alt="rabbit" height={150} width={150} />
                <p className="font-semibold">快搜尋適合你的職缺吧！</p>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Jobsearch;
