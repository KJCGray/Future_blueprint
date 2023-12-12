'use client';
import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
const Userdata = () => {
  const [isCer, setIsCer] = useState(false);

  const handleCerClick = () => {
    setIsCer(!isCer);
  }
  const [isLanguage, setIsLanguage] = useState(false);

  const handleLanguageClick = () => {
    setIsLanguage(!isLanguage);
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
            {isCer ? '未輸入' : (<TextField id="standard-basic" label="Certificate" variant="standard"/>)}
          </div>
        </div>   
        
        <div className='flex items-center'>
            <Button onClick={handleLanguageClick} 
            className='flex items-center justify-center w-20 h-8 my-6 font-semibold text-yellow-900 bg-orange-200 rounded'>
              語   言
            </Button>           
          <div className='ml-8'>
            {isLanguage ? '未輸入' : (<TextField id="standard-basic" label="Language" variant="standard"/>)}
          </div>
        </div>   

        <div>
          <Button className='flex items-center justify-center w-20 h-8 my-6 font-semibold text-yellow-900 bg-orange-200 rounded'>學   歷</Button>
        </div>   
        <div>
          <Button className='flex items-center justify-center w-20 h-8 my-6 font-semibold text-yellow-900 bg-orange-200 rounded'>專業能力</Button>
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
