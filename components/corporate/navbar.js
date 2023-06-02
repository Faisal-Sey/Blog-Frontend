import React from 'react'
import Link from "next/link";
import Image from 'next/image'
import { Dropdown, Menu , message } from 'antd'
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { BACKEND_DOMAIN, STATUS_CODE } from "../../utils/systemSettings";
import authService from "../../services/authServices";
import { setAuthDataAction } from "../../redux/actions/authActions";


function CorporateNavbar() {
    const status = useSelector((store) => store.authStatus);

    const userInfo = useSelector((store) => store.userInfo);

    const dispatch = useDispatch()

    const router = useRouter()

    const getImage = (img) => {
        return `${BACKEND_DOMAIN}/${img}`
    }
    const logout = async() => {
        try {
          const res = await authService.logout({})
          if (res?.status === STATUS_CODE.LOGGED_OUT) {
            message.success("Logged out successfully", 3)
            dispatch(setAuthDataAction(false))
            router.push("/")
          }
        }catch(err){message.error("Error, please try again", 3)}
      }

    const menu = (
        <Menu>
            <Menu.Item key="1">
                <Link href="/profile" className="w-8 lg:w-12" passHref >Profile</Link>
            </Menu.Item>
            <Menu.Item key="2" onClick={logout}>
                Logout
            </Menu.Item>
        </Menu>
    )

    const notAuthMenu = (
      <Menu>
          <Menu.Item key="1">
              <Link href="/signup" className="w-8 lg:w-12" passHref >Signup</Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link href="/login" className="w-8 lg:w-12" passHref >Login</Link>
          </Menu.Item>
      </Menu>
  )
  return (
    <>
    <div className="font-extrabold uppercase text-corporate px-4 text-5xl">MAVINSPOT</div>
        {/* Hero icons */}
        <div className="flex justify-end items-center text-white">
          <div className='mx-4 flex items-center'>
            <Image src={"/svgs/search.svg"} width="25" alt="search" height="25" />
          </div>
          <div className='mx-4'>Item 1</div>
          <div className='mx-4'>Item 1</div>
          <div className='mx-4'>Item 1</div>
          <>{status.status ?
            (userInfo.is_superuser ?
                  <Link href="/dashboard">
                    <button className='mx-4 w-8 lg:w-12'>
                      <Image src={userInfo.profileImage ? getImage(userInfo.profileImage) : "/svgs/user-circle.svg"} layout="responsive" width="50" height="50" alt="user" />
                    </button>
                  </Link>
                :
                <Dropdown overlay={menu}>
                    <button className='mx-4 w-8 lg:w-12'>
                        <Image src={userInfo.profileImage ? getImage(userInfo.profileImage) : "/svgs/user-circle.svg"} layout="responsive" width="50" height="50" alt="user" />
                    </button>
                </Dropdown>
            )
            :
            <Dropdown overlay={notAuthMenu}>
              <button className='mx-4 w-8 lg:w-12'>
                <Image src={"/svgs/user-circle.svg"} layout="responsive" width="50" height="50" alt="user" />
              </button>
            </Dropdown>
          }
          </>
        </div>
    </>
  )
}

export default CorporateNavbar