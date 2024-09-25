import React from 'react'

const cities = [
    {
        id:1,
        title:'Mumbai',
    },
    {
        id:2,
        title:'Delhi',
    },
    {
        id:3,
        title:'Kolkata',
    },
    {
        id:4,
        title:'Chennai',
    },
    {
        id:5,
        title:'Ahmedabad',
    },
]
function TopButtons({setQuery}) {
  return (
    <div className='flex items-center justify-center my-6 space-x-5'>
        {cities.map((city,id)=>
          <button className='text-white text-lg font-medium'
          onClick={() => setQuery({q:city.title}) }
          >
            {city.title} 

          </button>

        )}
      
    </div>
  );
}

export default TopButtons