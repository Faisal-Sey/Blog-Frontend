import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Spin } from "antd";
import Middle from "./Middle";
import { EyeIcon } from "@heroicons/react/solid";
import { UserIcon } from "@heroicons/react/solid";
import { CursorClickIcon } from "@heroicons/react/solid";
import { ChatAlt2Icon } from "@heroicons/react/solid";
import blogServices from "../services/blogServices";
import { STATUS_CODE, BACKEND_DOMAIN } from "../utils/systemSettings";

const Stats = () => {

  const [state, setState] = useState({});

  const [type, setType] = useState("days");

  const [activeTab, setActiveTab] = useState("views")

  const [active, setActive] = useState({
    days: true,
    week: false,
    month: false,
    year: false
  });

  const [mainActive, setMainActive] = useState({
    views: true,
    visitors: false,
    urlClicks: false,
    comments: false,
  });

  useEffect(async() => {
    setState(false)
  })
  
  return (
    <div className=" bg-white w-full h-full">
      <div className="px-8 py-1 mt-4 md:ml-6">
        <p className="md:text-3xl text-xl transform-translate-y-2">Stats</p>
      </div>
      <div className="md:shadow-2xl w-5/6 md:ml-14 mt-1 bg-white rounded-md">
        <div className="md:ml-14 ml-4">
          <h3 className="md:text-xl text-md text-gray-600 font-medium md:ml-2 mt-3">
            Page Analytics
          </h3>
          <div className="flex md:p-4 p-1 md:space-x-16 space-x-10">
            {/* Traffics card */}
            <div className="flex md:w-full w-fit shadow-md space-x-4 cursor-pointer border-2 rounded-md">
              <h3 className="md:text-xl text-md mt-5 md:ml-8 ml-2 md:tracking-wide">
                Traffic
              </h3>

              <div className="flex md:ml-80 ml-8 mt-3 mb-3 space-x-6 md:mr-1 p-2 md:w-full w-fit">
                <button 
                  className={`${active.days ? "bg-primary text-white" : "shadow-md shadow-gray-400" } p-1 md:px-4 md:text-md text-xs rounded ${active.days ? "hover:bg-secondary" : ""}`}
                  onClick={() => {setActive({...active, days:true, week: false, month:false, year:false}), setType("days")}}
                >
                  Days
                </button>

                <button 
                  type="button"
                  className={`${active.week ? "bg-primary text-white" : "shadow-md shadow-gray-400" } p-1 md:px-4 md:text-md text-xs rounded ${active.week ? "hover:bg-secondary" : ""}`}
                  onClick={() => {setActive({...active, days:false, week: true, month:false, year:false}), setType("week")}}
                >
                  Weeks
                </button>

                <button 
                  type="button"
                  class={`${active.month ? "bg-primary text-white" : "shadow-md shadow-gray-400" } p-1 md:px-4 md:text-md text-xs rounded ${active.month ? "hover:bg-secondary" : ""}`}
                  onClick={() => {setActive({...active, days:false, week: false, month:true, year:false}), setType("month")}}
                >
                  Months
                </button>

                <button 
                  type="button"
                  class={`${active.year ? "bg-primary text-white" : "shadow-md shadow-gray-400" } p-1 md:px-4 md:text-md text-xs rounded ${active.year ? "hover:bg-secondary" : ""}`}
                  onClick={() => {setActive({...active, days:false, week: false, month:false, year:true}), setType("year")}}
                >
                  Years
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-3 shadow-xl w-5/6 md:ml-14 ml-4 bg-white rounded-md">
        <Middle type={type} active={activeTab}/>
      </div>

      <div className="shadow-md w-full md:ml-14 ml-1 mt-2 bg-white rounded-md">
        <div className="md:ml-14 ml-6 mt-1">
          <div className="flex p-1 md:space-x-16 space-x-2">
            {/* Traffics card */}
            <div className="flex w-max cursor-pointer rounded-md">
              <div className="flex ml-2 mt-3 mb-3 md:space-x-20 space-x-10 md:p-2 md:w-full">
                <button 
                  className={`flex ${mainActive.views ? "bg-primary text-white" : "shadow-md shadow-gray-400" } p-1 md:px-5 md:p-2 p-1 md:text-md text-xs rounded ${mainActive.views ? "hover:bg-secondary" : ""}`}
                  onClick={() => {setMainActive({...mainActive, views:true, urlClicks: false, visitors:false, comments:false}), setActiveTab("views")}}
                >
                  <EyeIcon className="h-5 w-5" />
                  <p className="md:text-sm text-xs hidden md:block text-center">
                    Views
                  </p>
                </button>

                <button 
                  className={`flex ${mainActive.visitors ? "bg-primary text-white" : "shadow-md shadow-gray-400" } p-1 md:px-5 md:p-2 p-1 md:text-md text-xs rounded ${mainActive.visitors ? "hover:bg-secondary" : ""}`}
                  onClick={() => {setMainActive({...mainActive, views:false, urlClicks: false, visitors:true, comments:false}), setActiveTab("visitors")}}
                >
                  <UserIcon className="h-5 w-5 " />
                  <p className="md:text-sm text-xs hidden md:block text-center">
                    Visitors
                  </p>
                </button>

                <button 
                  className={`flex ${mainActive.urlClicks ? "bg-primary text-white" : "shadow-md shadow-gray-400" } p-1 md:px-5 md:p-2 p-1 md:text-md text-xs rounded ${mainActive.urlClicks ? "hover:bg-secondary" : ""}`}
                  onClick={() => {setMainActive({...mainActive, views:false, urlClicks: true, visitors:false, comments:false}), setActiveTab("urlClicks")}}
                >
                  <CursorClickIcon className="h-5 w-5" />
                  <p className="md:text-sm text-xs hidden md:block text-center">
                    URL Clicks
                  </p>
                </button>

                <button 
                  className={`flex ${mainActive.comments ? "bg-primary text-white" : "shadow-md shadow-gray-400" } p-1 md:px-5 md:p-2 p-1 md:text-md text-xs rounded ${mainActive.comments ? "hover:bg-secondary" : ""}`}
                  onClick={() => {setMainActive({...mainActive, views:false, urlClicks: false, visitors:false, comments:true}), setActiveTab("comments")}}
                >
                  <ChatAlt2Icon className="h-5 w-5" />
                  <p className="md:text-sm text-xs hidden md:block text-center">
                    Comments
                  </p>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stats;
