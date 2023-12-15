import React from 'react';
import SearchBar from '../../components/mainpage/searchbar';
import Personaltotal from "../../components/personalpage/personaltotal";
const page = () => {
  return (
    <div className='w-screen h-screen m-0 bg-white'>
      <SearchBar/>
      <div className='flex items-center justify-center mt-20'>
          <Personaltotal/>
      </div>
    </div>
  )
}

export default page;