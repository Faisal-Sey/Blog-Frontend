import { Menu } from '@headlessui/react'
import {Link, Image} from 'next'
function MyDropdown({ userInfo, getImage}) {
    return (
        <Menu>
            <Menu.Button className='mx-4 w-8 lg:w-12'>
                <Link href="/profile-page" className="w-8 lg:w-12">
                    <Image src={userInfo.profileImage ? getImage(userInfo.profileImage) : "/svgs/user.svg"} layout="responsive" width="50" height="50" alt="user" />
                </Link>
            </Menu.Button>
            <Menu.Items>
                <Menu.Item>
                    {({ active }) => (
                        <a
                            className={`${active && 'bg-blue-500'}`}
                            href="/account-settings"
                        >
                            Account settings
                        </a>
                    )}
                </Menu.Item>
                <Menu.Item>
                    {({ active }) => (
                        <a
                            className={`${active && 'bg-blue-500'}`}
                            href="/account-settings"
                        >
                            Documentation
                        </a>
                    )}
                </Menu.Item>
                <Menu.Item disabled>
                    <span className="opacity-75">Invite a friend (coming soon!)</span>
                </Menu.Item>
            </Menu.Items>
        </Menu>
    )
}