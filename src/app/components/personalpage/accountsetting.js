import React from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
const userdata = () => {
    
  return (
    <div className=' bg-orange-100 rounded-xl w-[600px] h-[400px]'>
        <div className='flex flex-col items-center w-auto pt-10'>
            <div className='flex items-center'>
                <div className='flex items-center justify-center w-auto h-8 p-4 my-6 mr-10 font-semibold bg-orange-200 rounded text-red-950'>
                    姓名
                </div>
                <div className='mb-5'>
                    <TextField id="standard-basic" label="Name" variant="standard"/>
                </div>
            </div>
            <div className='flex items-center'>
                <div className='flex items-center justify-center w-auto h-8 p-4 my-6 mr-10 font-semibold bg-orange-200 rounded text-red-950'>
                    信箱
                </div>
                <div className='mb-5'>
                    <TextField id="standard-basic" label="Mail" variant="standard" />
                </div>
            </div>
            <div className='flex items-center'>
                <div className='flex items-center justify-center w-auto h-8 p-4 my-6 mr-10 font-semibold bg-orange-200 rounded text-red-950'>
                    學歷
                </div>
                <div className='mb-5'>
                    <TextField id="standard-basic" label="Educational" variant="standard" />
                </div>
            </div>
            <div className='flex items-center justify-center'>
                <div className='flex items-center justify-center w-auto h-8 p-4 my-6 mr-10 font-semibold bg-orange-200 rounded text-red-950'>
                    密碼
                </div>
                <div >
                    <TextField id="standard-basic" label="Password" variant="standard" />
                </div>
            </div>

        </div>
    </div>
    
  )
}

export default userdata
