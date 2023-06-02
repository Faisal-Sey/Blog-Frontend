import React, { useState, useEffect, useRef } from "react";
// import { Doughnut } from 'react-chartjs-2';
import { EyeIcon } from "@heroicons/react/solid";
import { ChatAlt2Icon } from "@heroicons/react/solid";
import { CursorClickIcon } from "@heroicons/react/solid";
import authService from '../services/authServices'
import blogServices from "../services/blogServices";
import { STATUS_CODE } from "../utils/systemSettings";

const data = {
  labels: [],
  datasets: [
    {
      data: [10, 100],
      backgroundColor: [" rgba(67, 56, 202)", "rgba(229, 231, 235)"],
      hoverBackgroundColor: ["#FF6384", "#36A2EB"],
    },
  ],
};

const RightBar = () => {

  let totalViews = useRef(0)

  let totalClicks = useRef(0)

  let totalComments = useRef(0)

  useEffect(() => {
    let isDone = false

    const getData = async() => {
      try{
        const res = await blogServices.getAnalytics({})
        if (res?.status === STATUS_CODE.SUCCESS){
          for (const value of Object.entries(res?.data.data["year"])){
            totalViews.current += value[1]
          }
        }
      }catch(err){
        const refresh = await authService.refreshToken({})
        const res = await blogServices.getAnalytics({})
        if (res?.status === STATUS_CODE.SUCCESS){
          for (const value of Object.entries(res?.data.data["year"])){
            totalViews.current += value[1]
          }
        }
      }

      try{
        const res = await blogServices.commentAnalytics({})
        if (res?.status === STATUS_CODE.SUCCESS){
          for (const value of Object.entries(res?.data.data["year"])){
            totalComments.current += value[1]
          }
        }
      }catch(err){
        const refresh = await authService.refreshToken({})
        const res = await blogServices.commentAnalytics({})
        if (res?.status === STATUS_CODE.SUCCESS){
          for (const value of Object.entries(res?.data.data["year"])){
            totalComments.current += value[1]
          }
        }
      }

      try{
        const res = await blogServices.clickAnalytics({})
        if (res?.status === STATUS_CODE.SUCCESS){
          for (const value of Object.entries(res?.data.data["year"])){
            totalClicks.current += value[1]
          }
        }
      }catch(err){
        const refresh = await authService.refreshToken({})
        const res = await blogServices.clickAnalytics({})
        if (res?.status === STATUS_CODE.SUCCESS){
          for (const value of Object.entries(res?.data.data["year"])){
            totalClicks.current += value[1]
          }
        }
      }
    }

    if (!(isDone)){
      getData();
    }

    return () => {
      isDone = true
    }
  }, [])
  

  return (
    <div className="bg-white  w-1/4 border border-gray-100">
      <div className="p-3 border-gray-100"></div>
      <div className="md:mt-20 mt-10">
        <div className="flex items-center md:space-x-11 space-x-2 p-3">
          <div className="flex space-x-2">
            <EyeIcon className="md:h-4 md:w-4 h-3 w-3 mt-1" />
            <p className="font-semibold md:text-sm hidden md:block text-xs text-gray-800">
              Total Views
            </p>
          </div>
          <p className="text-gray-600 md:text-sm text-xs font-semibold">
            {totalViews.current}
          </p>
        </div>

        <div className="flex items-center md:space-x-4 space-x-2 p-3">
          <div className="flex space-x-2">
            <ChatAlt2Icon className="md:h-4 md:w-4 h-3 w-3 mt-1" />
            <p className="font-semibold md:text-sm hidden md:block text-xs text-gray-800">
              Total Comments
            </p>
          </div>
          <p className="text-gray-600 md:text-sm text-xs font-semibold">{totalComments.current}</p>
        </div>

        <div className="flex items-center md:space-x-12 space-x-2 p-3">
          <div className="flex space-x-2">
            <CursorClickIcon className="md:h-4 md:w-4 h-3 w-3 mt-1" />
            <p className="font-semibold md:text-sm hidden md:block text-xs text-gray-800">
              Total Clicks
            </p>
          </div>
          <p className="text-gray-600 md:text-sm text-xs font-semibold">
            {totalClicks.current}
          </p>
        </div>
      </div>
    </div>
  );
};

export default RightBar;
