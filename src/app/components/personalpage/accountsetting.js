import React from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
const userdata = () => {
    
  return (
    <div className=' bg-orange-100 rounded-xl w-[600px] h-[400px]'>
        <div className='flex flex-col justify-center mt-8 ml-20'>
            <div className='flex items-center'>
                <div className='flex items-center justify-center w-20 h-8 my-6 mr-10 bg-orange-200 rounded'>
                    姓名
                </div>
                <div className='mb-5'>
                    <TextField id="standard-basic" label="Name" variant="standard" />
                </div>
            </div>
            <div className='flex items-center'>
                <div className='flex items-center justify-center w-20 h-8 my-6 mr-10 bg-orange-200 rounded'>
                    信箱
                </div>
                <div className='mb-5'>
                    <TextField id="standard-basic" label="Mail" variant="standard" />
                </div>
            </div>
            <div className='flex items-center'>
                <div className='flex items-center justify-center w-20 h-8 my-6 mr-10 bg-orange-200 rounded'>
                    學歷
                </div>
                <div className='mb-5'>
                    <TextField id="standard-basic" label="Educational" variant="standard" />
                </div>
            </div>
            <div className='flex items-center'>
                <div className='flex items-center justify-center w-20 h-8 my-6 mr-10 bg-orange-200 rounded'>
                    密碼
                </div>
                <div className='mb-5'>
                    <TextField id="standard-basic" label="Password" variant="standard" />
                </div>
            </div>

        </div>
    </div>
    
  )
}

export default userdata
