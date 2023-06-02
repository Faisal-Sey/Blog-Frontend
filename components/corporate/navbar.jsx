import React from 'react'
import Image from 'next/image'
function CorporateNavbar() {
  return (
    <>
    <div className="font-extrabold uppercase text-corporate px-4 text-5xl">BrandName</div>
        {/* Hero icons */}
        <div className="flex justify-end items-center text-white">
          <div className='mx-4 flex items-center'>
            <Image src={"/svgs/search.svg"} width="25" alt="search" height="25" />
          </div>
          <div className='mx-4'>Item 1</div>
          <div className='mx-4'>Item 1</div>
          <div className='mx-4'>Item 1</div>
          <button className='mx-4'>
            <Image src={"/svgs/user-circle.svg"} width="40" alt="user" height="40" />
          </button>
        </div>
    </>
  )
}

export default CorporateNavbar