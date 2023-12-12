'use client';
import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
const Accountsetting = () => {
    const [isName, setIsName] = useState(false);

    const handleNameClick = () => {
      setIsName(!isName);
    }
  
    const [isMail, setIsMail] = useState(false);

    const handleMailClick = () => {
      setIsMail(!isMail);
    }
  
    const [isEducational, setIsEducational] = useState(false);

    const handleEducationalClick = () => {
      setIsEducational(!isEducational);
    }
  
    const [isPassword, setIsPassword] = useState(false);

    const handlePasswordClick = () => {
      setIsPassword(!isPassword);
    }
  
  return (
    <div className=' bg-orange-100 rounded-xl w-[600px] h-[400px]'>
      <div className='flex flex-col w-4/5 pt-4 ml-16'>

        <div className='flex items-center mt-5'>
          <Button onClick={handleNameClick} 
          className='flex items-center justify-center w-20 h-8 my-6 font-semibold text-yellow-900 bg-orange-200 rounded'>
          姓   名
          </Button>           
          <div className='flex-shrink-0 ml-8 overflow-y-auto no-scrollbar' style={{ whiteSpace: 'nowrap', maxWidth: '300px' }}>
              {isName ?  (<TextField id="standard-basic" label="Name" variant="standard"/>):'未輸入'}
          </div>
        </div> 
        <div className='flex items-center'>
          <Button onClick={handleMailClick} 
          className='flex items-center justify-center w-20 h-8 my-6 font-semibold text-yellow-900 bg-orange-200 rounded'>
          信   箱
          </Button>           
          <div className='flex-shrink-0 ml-8 overflow-y-auto no-scrollbar' style={{ whiteSpace: 'nowrap', maxWidth: '300px' }}>
              {isMail ? (<TextField id="standard-basic" label="Mail" variant="standard"/>):'未輸入'}
          </div>
        </div> 
        <div className='flex items-center'>
          <Button onClick={handleEducationalClick} 
          className='flex items-center justify-center w-20 h-8 my-6 font-semibold text-yellow-900 bg-orange-200 rounded'>
          學   歷
          </Button>           
          <div className='flex-shrink-0 ml-8 overflow-y-auto no-scrollbar' style={{ whiteSpace: 'nowrap', maxWidth: '300px' }}>
              {isEducational ?(<TextField id="standard-basic" label="Educational" variant="standard"/>):'未輸入'}
          </div>
        </div> 
        <div className='flex items-center'>
          <Button onClick={handlePasswordClick} 
          className='flex items-center justify-center w-20 h-8 my-6 font-semibold text-yellow-900 bg-orange-200 rounded'>
          密   碼
          </Button>           
          <div className='flex-shrink-0 ml-8 overflow-y-auto no-scrollbar' style={{ whiteSpace: 'nowrap', maxWidth: '300px' }}>
              {isPassword ? (<TextField id="standard-basic" label="Password" variant="standard"/>):'未輸入'}
          </div>
        </div> 
      </div>
    </div>
    
  )
}

export default Accountsetting;
