import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
const Accountsetting = () => {
    
  return (
    <div className=' bg-orange-100 rounded-xl w-[600px] h-[400px]'>
        <div className='flex flex-col items-center w-auto pt-10'>
            <div className='flex items-center'>
                <div>
                <Button className='flex items-center justify-center w-auto h-8 p-4 my-6 mr-10 font-semibold bg-orange-200 rounded text-red-950'>姓   名</Button>
                </div>
                <div className='mb-5'>
                    <TextField id="standard-basic" label="Name" variant="standard"/>
                </div>
            </div>
            <div className='flex items-center'>
                <div>
                <Button className='flex items-center justify-center w-auto h-8 p-4 my-6 mr-10 font-semibold bg-orange-200 rounded text-red-950'>信   箱</Button>
                </div>
                <div className='mb-5'>
                    <TextField id="standard-basic" label="Mail" variant="standard" />
                </div>
            </div>
            <div className='flex items-center'>
                <div>
                <Button className='flex items-center justify-center w-auto h-8 p-4 my-6 mr-10 font-semibold bg-orange-200 rounded text-red-950'>學   歷</Button>
                </div>
                <div className='mb-5'>
                    <TextField id="standard-basic" label="Educational" variant="standard" />
                </div>
            </div>
            <div className='flex items-center justify-center'>
                <div>
                <Button className='flex items-center justify-center w-auto h-8 p-4 my-6 mr-10 font-semibold bg-orange-200 rounded text-red-950'>密   碼</Button>
                </div>
                <div>
                    <TextField id="standard-basic" label="Password" variant="standard" />
                </div>
            </div>

        </div>
    </div>
    
  )
}

export default Accountsetting;
