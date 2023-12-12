import React from 'react';
import Userdata from "../components/personalpage/userdata";
import SearchBar from '../components/mainpage/searchbar';
import Accountsetting from '../components/personalpage/accountsetting'
import Personaltotal from "../components/personalpage/personaltotal"
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