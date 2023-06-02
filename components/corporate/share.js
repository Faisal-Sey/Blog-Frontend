import React from 'react'
import Image from 'next/image'
function Share() {
    return (
        < div className='w-full' >
            <div className='font-bold text-xl my-8'>Share</div>
            <button className='mx-2 rounded-full bg-primary w-12 lg:w-18 share-icon'>
                <Image width="25" layout="responsive" height="25" src={"/svgs/twitter.svg"} alt="twitter" />
            </button>
            <button className='mx-2 rounded-full bg-primary w-12 lg:w-18 share-icon'>
                <Image width="25" layout="responsive" height="25" src={"/svgs/facebook.svg"} alt="twitter" />
            </button>
            <button className='mx-2 rounded-full bg-primary w-12 lg:w-18 share-icon'>
                <Image width="25" layout="responsive" height="25" src={"/svgs/linkedin.svg"} alt="twitter" />
            </button>
            <button className='mx-2 rounded-full bg-primary w-12 lg:w-18 share-icon'>
                <Image width="25" layout="responsive" height="25" src={"/svgs/google.svg"} alt="twitter" />
            </button>
        </div >
    )
}

export default Share