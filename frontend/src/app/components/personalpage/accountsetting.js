'use client';
import React, { useState,useEffect } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { parseCookies } from "nookies";
import axios from 'axios';
import Swal from 'sweetalert2';
import { Alert } from '@mui/material';

const Accountsetting = () => {
    const {username,token,userid}=parseCookies();
    const [isName, setIsName] = useState(false);
    const [password, setPassword] = useState("");

    const handleNameClick = () => {
      setIsName(!isName);
    }  
    const [isMail, setIsMail] = useState(false);
    const handleMailClick = () => {
      setIsMail(!isMail);
    }

    const [isPassword, setIsPassword] = useState(false);
    const handlePasswordClick = () => {
      setIsPassword(!isPassword);
      //if isPassword==true -----修改密碼
      if (isPassword) {
        updatepass();
      }
    }

    const [email,setemail]=useState(null);
    async function userpage() {
      //e.preventDefault();
      try {
        const response = await axios.post(`http://localhost:5000/api/userpage`, {
          username: username,
          token: token,
      });
        console.log(response);
        setemail(response.data.email);
      } catch (error) {
        console.log(error);
      }
    }

    async function updatepass() {
      const passwordRule = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
      if (password && !passwordRule.test(password)) {
        Swal.fire("密碼格式不符", "須含1個大寫和1個小寫字母及數字且長度必須超過8", "error");
        return;
      }
      try {
        const response = await axios.post(`http://localhost:5000/api/updatepass`, {
          id: userid,
          token: token,
          password:password,
      });
        Swal.fire("密碼更新成功", "", "success");
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    }

    
    useEffect(() => {
      userpage();
    }, []);    
    
  return (
    <div className=' bg-orange-100 rounded-xl w-[600px] h-[400px]'>
        <div className='flex flex-col w-3/5 pt-4 ml-16'>
            <div className='flex items-center mt-6'>
                <div 
                className='flex items-center justify-center w-20 h-8 my-6 font-semibold text-yellow-900 bg-orange-200 rounded'>
                姓   名 
                </div>   
                <div className='p-8'>
                  {username}  
                </div>        
            </div> 
            <div className='flex items-center mt-10'>
                <div
                className='flex items-center justify-center w-20 h-8 my-6 font-semibold text-yellow-900 bg-orange-200 rounded'>
                信   箱
                </div>   
                <div className='p-8'>
                  {email}  
                </div>   
            </div> 
            <div className='flex items-center mt-10'>
                <Button onClick={handlePasswordClick} 
                className='flex items-center justify-center w-20 h-8 my-6 font-semibold text-yellow-900 bg-orange-200 rounded'>
                密   碼
                </Button>           
                <div className='ml-8'>
                    {isPassword ?  
                    (<TextField 
                    type="password" id="standard-basic" label="Password" variant="standard"
                    onChange={(e) => setPassword(e.target.value)}/>)
                    : '🐇🐇🐇🐇🐇🐇'}
                </div>
            </div> 
        </div>
    </div>
    
  )
}

export default Accountsetting;
