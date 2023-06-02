import React from 'react'
import Trending from './cards/trending'


function Recommended() {
    return (
        < div >
            <div className="section-header my-8">
                Recommended for you
            </div>
            <div className='flex'>
                <div className='h-64 w-1/3 mr-8'>
                    <Trending/>
                </div>
            </div>
        </div >
    )
}

export default Recommended