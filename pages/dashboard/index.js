import React, { useEffect } from 'react';
import Sidebar from "../../components/sidebar";
import Header from "../../components/Header";
import Container from "../../components/Container";
import { useRouter } from "next/router";
import authService from '../../services/authServices';
import blogServices from '../../services/blogServices';
import { STATUS_CODE } from '../../utils/systemSettings';

export default function Dashboard() {
  const router = useRouter();

  useEffect(() => {

    let isDone = false

    const getDate = async() => {
      try {
        const res = await blogServices.getUserInfo({})
        if (res?.status === STATUS_CODE.SUCCESS){
          if (!(res?.data?.data?.user?.is_superuser)){
            router.push("/")
          }
        }
      }catch(err) {
        const refresh = authService.refreshToken({})
        const res = await blogServices.getUserInfo({})
        if (res?.status === STATUS_CODE.SUCCESS){
          if (!(res?.data?.data?.user?.is_superuser)){
            router.push("/")
          }
        }
      }
    }

    if (!(isDone)){
      getDate();
    }

    return () => {
      isDone = true
    }
  }, [])

  return (
    <div>
      <div className="flex w-screen h-fit">
        <Sidebar />
        <div className="w-screen">
          <Header />
          <Container />
        </div>
      </div>
    </div>
  )

}
