import React from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const userdata = () => {
  return (
    <div>
      <AccountCircleIcon sx={{ fontSize: 40 }} className='mx-2.5' />
      <div className='items-center'>
        <div className='flex justify-center w-20 my-2 bg-orange-200 rounded'>
          <div className='font-semibold text-red-950'>
            證  照
          </div>
        </div>     
        <div className='flex justify-center w-20 my-2 bg-orange-200 rounded'>
          <div className='font-semibold text-red-950'>
            語  言
          </div>
        </div>   
        <div className='flex justify-center w-20 my-2 bg-orange-200 rounded'>
          <div className='font-semibold text-red-950'>
            學  歷
          </div>
        </div>   
        <div className='flex justify-center w-20 my-2 bg-orange-200 rounded'>
          <div className='font-semibold text-red-950'>
            專業能力
          </div>
        </div>   
        <div className='flex justify-center w-40 my-2 bg-orange-200 rounded'>
          <div className='font-semibold text-red-950'>
            個人化工作推薦
          </div>
        </div>                                   
      </div>        
    </div>
    
  )
}

export default userdata
