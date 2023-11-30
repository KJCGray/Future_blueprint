import React from 'react';
import Userdata from "../components/personalpage/userdata";
import Btnbar from "../components/personalpage/btnbar";
import SearchBar from '../components/mainpage/searchbar';

const page = () => {
  return (
    <div className='w-screen h-screen m-0 bg-white'>
      <SearchBar/>
      <Userdata/>             
    </div>
  )
}

export default page;