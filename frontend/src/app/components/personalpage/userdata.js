'use client';
import React, { useState, useEffect } from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import {parseCookies } from "nookies";
import { useRouter } from "next/navigation";
import axios from "axios";

const Userdata = () => {
  const [isCer, setIsCer] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const router=useRouter();
  const { token, userid,username } = parseCookies();
  useEffect(() => {
    if (!token || !userid) {
      setIsLoggedIn(false);
    }
    userdata();
  }, []);

  async function userdata() {
    //e.preventDefault();
    try {
      const response = await axios.post(`http://localhost:5000/api/userpage`, {
        username: username,
        token: token,
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

  const handleCerClick = () => {
    setIsCer(!isCer);
  }

  const [isLanguage, setIsLanguage] = useState(false);

  const handleLanguageClick = () => {
    setIsLanguage(!isLanguage);
  }

  const [isEducational, setIsEducational] = useState(false);

  const handleEducationalClick = () => {
    setIsEducational(!isEducational);
  }

  const [isMajor, setIsMajor] = useState(false);

  const handleMajorClick = () => {
    setIsMajor(!isMajor);
  }
 
  if (!isLoggedIn) {
    return (
      <div>
        <div className={`bg-orange-100 rounded-xl w-[600px] h-[400px] ${!isLoggedIn ? 'blur' : '5px'}`}>
          <div className='flex flex-col w-3/5 pt-4 ml-16'>          
            <div className='flex items-center'>
                <Button disabled onClick={handleCerClick} 
                className='flex items-center justify-center w-20 h-8 my-6 font-semibold text-yellow-900 bg-orange-200 rounded'>
                  證   照
                </Button>           
              <div className='ml-8'>
                <TextField disabled id="standard-basic" label="Certificate" variant="standard"/>
              </div>
            </div>   
            
            <div className='flex items-center'>
                <Button disabled onClick={handleLanguageClick} 
                className='flex items-center justify-center w-20 h-8 my-6 font-semibold text-yellow-900 bg-orange-200 rounded'>
                  語   言
                </Button>           
              <div className='ml-8'>
                <TextField disabled id="standard-basic" label="Language" variant="standard"/>
              </div>
            </div>   

            <div className='flex items-center'>
                <Button disabled onClick={handleEducationalClick} 
                className='flex items-center justify-center w-20 h-8 my-6 font-semibold text-yellow-900 bg-orange-200 rounded'>
                  學   歷
                </Button>           
              <div className='ml-8'>
                <TextField disabled id="standard-basic" label="Educational" variant="standard"/>
              </div>
            </div>   
            
            <div className='flex items-center'>
                <Button disabled onClick={handleMajorClick} 
                className='flex items-center justify-center w-20 h-8 my-6 font-semibold text-yellow-900 bg-orange-200 rounded'>
                  專業能力
                </Button>           
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
            <Button onClick={handleCerClick} 
            className='flex items-center justify-center w-20 h-8 my-6 font-semibold text-yellow-900 bg-orange-200 rounded'>
              證   照
            </Button>           
          <div className='ml-8'>
            {isCer ?  (<TextField id="standard-basic" label="Certificate" variant="standard" />): '未輸入'}
          </div>
        </div>   
        
        <div className='flex items-center'>
            <Button onClick={handleLanguageClick} 
            className='flex items-center justify-center w-20 h-8 my-6 font-semibold text-yellow-900 bg-orange-200 rounded'>
              語   言
            </Button>           
          <div className='ml-8'>
            {isLanguage ? (<TextField id="standard-basic" label="Language" variant="standard"/>): '未輸入'}
          </div>
        </div>   

        <div className='flex items-center'>
            <Button onClick={handleEducationalClick} 
            className='flex items-center justify-center w-20 h-8 my-6 font-semibold text-yellow-900 bg-orange-200 rounded'>
              學   歷
            </Button>           
          <div className='ml-8'>
            {isEducational ? (<TextField id="standard-basic" label="Educational" variant="standard"/>): '未輸入'}
          </div>
        </div>   
        
        <div className='flex items-center'>
            <Button onClick={handleMajorClick} 
            className='flex items-center justify-center w-20 h-8 my-6 font-semibold text-yellow-900 bg-orange-200 rounded'>
              專業能力
            </Button>           
          <div className='ml-8'>
            {isMajor ? (<TextField id="standard-basic" label="Major" variant="standard"/>): '未輸入'}
          </div>
        </div>     
      </div>  

      <div className='flex justify-center'>
        <div>
          <Button className='mt-4 w-[480px] font-semibold text-yellow-900 bg-orange-200 '>個人化工作推薦</Button>
        </div>  
      </div>

    </div>
    
  );
}

export default Userdata;
