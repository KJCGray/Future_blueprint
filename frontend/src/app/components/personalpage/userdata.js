'use client';
import React, { useState, useEffect } from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import {parseCookies} from "nookies";
import { useRouter } from "next/navigation";
import axios from "axios";

const Userdata = () => {
  const [isUD, setIsUD] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const router=useRouter();
  const { token, userid,username } = parseCookies();
  const [certificate,setcertificate]=useState("");
  const [language,setlanguage]=useState("");
  const [edu,setedu]=useState("");
  const [major,setmajor]=useState("");
  const [certificateArray,setcertificateArray] = useState([]);
  
  async function userpage() {
    //e.preventDefault();
    console.log(username,token);
    try {
      const response = await axios.post(`http://localhost:5000/api/userpage`, {
        username: username,
        token: token,
      });
      console.log(response);
      setcertificate(response.data.certificate);
      setlanguage(response.data.language);
      setedu(response.data.edu);
      setmajor(response.data.exp);
      console.log("顯示:",certificate,language,exp,major);
    } catch (error) {
      console.log(error);
    }
  }

  async function updatepage() {
    try {
      const response = await axios.post(`http://localhost:5000/api/updatepage`, {
        username: username,
        token: token,
        userid:userid,
        certificate:certificate,
        language:language,
        edu:edu,
        exp:major,
      });
      console.log(response);
      console.log("更新:",certificate,language,exp,major);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (!token || !userid) {
      setIsLoggedIn(false);
    }
    userpage();
    console.log(isUD,certificate,language,edu,major);
  }, []);

  const handleUDClick =  () => {
    setIsUD(true);
  }
  const handleUpdateClick =  () => {
    updatepage();
    setIsUD(false);
  }
  const handleCertificateChange = (e) => {
    setcertificate(e.target.value);
    setcertificateArray(certificate.split(','));
    // ertificateArray包含使用者輸入資料的陣列
    console.log(certificateArray);
    //進一步處理 certificateArray
  };
  const handleLanguageChange = (e) => {
    setlanguage(e.target.value);
  };
  const handleEduChange = (e) => {
    setedu(e.target.value);
  };
  const handleMajorChange = (e) => {
    setmajor(e.target.value);
  };
 
  const handleSave = () => {
    const certificateArray = certificate.split(',');
    // ertificateArray包含使用者輸入資料的陣列
    console.log(certificateArray);
    //進一步處理 certificateArray
  };

  if (!isLoggedIn) {
    return (
      <div>
        <div className={`bg-orange-100 rounded-xl w-[600px] h-[400px] ${!isLoggedIn ? 'blur' : '5px'}`}>
          <div className='flex flex-col w-3/5 pt-4 ml-16'>          
            <div className='flex items-center'>
                <div
                className='flex items-center justify-center w-20 h-8 my-6 font-semibold text-yellow-900 bg-orange-200 rounded'>
                  證   照
                </div>           
              <div className='ml-8'>
                <TextField disabled id="standard-basic" label="Certificate" variant="standard"/>
              </div>
            </div>   
            
            <div className='flex items-center'>
                <div 
                className='flex items-center justify-center w-20 h-8 my-6 font-semibold text-yellow-900 bg-orange-200 rounded'>
                  語   言
                </div>           
              <div className='ml-8'>
                <TextField disabled id="standard-basic" label="Language" variant="standard"/>
              </div>
            </div>   

            <div className='flex items-center'>
                <div 
                className='flex items-center justify-center w-20 h-8 my-6 font-semibold text-yellow-900 bg-orange-200 rounded'>
                  學   歷
                </div>           
              <div className='ml-8'>
                <TextField disabled id="standard-basic" label="Educational" variant="standard"/>
              </div>
            </div>   
            
            <div className='flex items-center'>
                <div 
                className='flex items-center justify-center w-20 h-8 my-6 font-semibold text-yellow-900 bg-orange-200 rounded'>
                  專業能力
                </div>           
              <div className='ml-8'>
                <TextField disabled  id="standard-basic" label="Major" variant="standard"/>
              </div>
            </div>     
          </div>  
          <div className='flex justify-center'>
            <div>
              <Button disabled className='mt-4 w-[480px] font-semibold text-yellow-900 bg-orange-200 '>個人化工作推薦</Button>
            </div>  
          </div>
        </div>
        
        <div className="fixed top-0 left-0 flex flex-col items-center justify-center w-screen h-screen bg-black bg-opacity-50">
          <div className="mb-5 text-2xl text-white">
            你尚未登入
          </div>
          <div className="flex mt-4">
              <Button className={`w-auto p-2 font-semibold text-yellow-900 bg-orange-200 mr-2`}
              onClick={() => router.push("/")}>馬上登入!</Button>
              <Button className={`w-auto mr-2 p-2 font-semibold text-yellow-900 bg-orange-200 ml-2` }
              onClick={() => router.push("/searchpage")}>回首頁</Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className=' bg-orange-100 rounded-xl w-[600px] h-[400px]'>      
      <div className='flex flex-col w-3/5 pt-4 ml-16'>
      
        <div className='flex items-center'>
            <div
            className='flex items-center justify-center w-20 h-8 my-5 font-semibold text-yellow-900 bg-orange-200 rounded'>
              證   照
            </div>           
          <div className='ml-8'>
            {isUD ?  
            (<TextField id="standard-basic" label="Certificate" variant="standard" value={certificate} 
            onChange={handleCertificateChange}/>)
            :
            <div className="w-2/5 overflow-x-auto whitespace-nowrap no-scrollbar">
              {certificate}
            </div>}
          </div>
        </div>   
        <div className="-mt-4 -ml-3 text-xs font-bold text-yellow-900">每筆證照請用逗號區隔</div>
        <div className='flex items-center'>
            <div
            className='flex items-center justify-center w-20 h-8 my-5 font-semibold text-yellow-900 bg-orange-200 rounded'>
              語   言
            </div>           
          <div className='ml-8'>
            {isUD ? 
            (<TextField id="standard-basic" label="Language" variant="standard" value={language}
              onChange={handleLanguageChange}/>)
            :language}
          </div>
        </div>   

        <div className='flex items-center'>
            <div
            className='flex items-center justify-center w-20 h-8 my-5 font-semibold text-yellow-900 bg-orange-200 rounded'>
              學   歷
            </div>           
          <div className='ml-8'>
            {isUD ? 
            (<TextField id="standard-basic" label="Education" variant="standard" value={edu}
              onChange={handleEduChange}/>)
            : edu}
          </div>
        </div>   
      
        <div className='flex items-center'>
            <div
            className='flex items-center justify-center w-20 h-8 my-5 font-semibold text-yellow-900 bg-orange-200 rounded'>
              專業能力
            </div>           
          <div className='ml-8'>
            {isUD ? 
            (<TextField id="standard-basic" label="Major" variant="standard" value={major}
            onChange={handleMajorChange}
            />)
            : major}
          </div>
        </div>     
      </div>  

      <div className='flex mt-4 ml-16'>
        {isUD?(
          <Button onClick={handleUpdateClick} className={`w-11/12 mr-2 p-2 font-semibold text-yellow-900 bg-orange-200 ml-2` }>
            更新資料
          </Button>):(<div>
          <Button className={`w-60 p-2 font-semibold text-yellow-900 bg-orange-200 mr-2`}
          component="a" href="\personalwork">
            個人化工作推薦
          </Button>
            
          <Button onClick={handleUDClick} className={`w-60 mr-2 p-2 font-semibold text-yellow-900 bg-orange-200 ml-2` }>
            編輯資料
          </Button>
        </div>)}  
      </div>      
    </div>
  );
}

export default Userdata;
