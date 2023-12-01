import React from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const userdata = () => {
  return (
    <div className=' bg-orange-100 rounded-xl w-[600px] h-[400px]'>

      <div className='flex flex-col items-center w-[200px] pt-4'>
      <AccountCircleIcon sx={{ fontSize: 40 }} />
        <div className='flex items-center justify-center w-20 h-8 mx-5 my-3 bg-orange-200 rounded'>
          <div className='font-semibold text-red-950'>
            證   照
          </div>
        </div>     
        <div className='flex items-center justify-center w-20 h-8 mx-5 my-3 bg-orange-200 rounded'>
          <div className='font-semibold text-red-950'>
            語   言
          </div>
        </div>   
        <div className='flex items-center justify-center w-20 h-8 mx-5 my-3 bg-orange-200 rounded'>
          <div className='font-semibold text-red-950'>
            學   歷
          </div>
        </div>   
        <div className='flex items-center justify-center w-20 h-8 mx-5 my-3 bg-orange-200 rounded'>
          <div className='font-semibold text-red-950'>
            專業能力
          </div>
        </div>                                     
      </div>    
      <div className='flex items-center justify-center w-40 h-8 mx-5 my-3 bg-orange-200 rounded'>
          <div className='font-semibold text-red-950'>
            個人化工作推薦
          </div>
        </div>  
    </div>
    
  )
}

export default userdata
