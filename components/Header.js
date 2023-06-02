import React from 'react'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

const Header = () => {
    return (
        <div className="flex shadow-sm bg-primary p-4 justify-between">
            <div className="flex space-x-3">
            </div>
            <div className="flex space-x-4 text-gray-400 mr-5">
                <AccountCircleIcon className="text-white" />
            </div>
        </div>
    )
}

export default Header
