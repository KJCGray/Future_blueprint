import React from 'react';
import SearchBar from '../components/mainpage/searchbar';
import Recommand from '../components/recommandpage/recommand';
const page = () => {
  return (
    <div className='flex flex-col w-screen h-screen m-0 bg-white'>
      <SearchBar/>
        <div className='flex flex-col'>
            <div>
                <Recommand/>
            </div>
        </div>
    </div>
  )
}

export default page;