import React from 'react';
import Userdata from "../components/personalpage/userdata";
import Btnbar from "../components/personalpage/btnbar";
import SearchBar from '../components/mainpage/searchbar';

const page = () => {
  return (
    <div className='w-screen h-screen m-0 bg-white'>
      <SearchBar/>
      <div className='flex items-center justify-center mt-20'>
        <div className='mr-32'>
          <Btnbar/>  
        </div>
          <Userdata/>
      </div>
    </div>
  )
}

export default page;