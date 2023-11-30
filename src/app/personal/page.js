import React from 'react';
import Userdata from "../components/personalpage/userdata";
import Btnbar from "../components/personalpage/btnbar";
import SearchBar from '../components/mainpage/searchbar';

const page = () => {
  return (
    <div className='w-screen h-screen m-0 bg-white'>
      <SearchBar/>
      <Userdata/>
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

export default page;