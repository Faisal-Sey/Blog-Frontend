import Sidebar from "/components/sidebar";
import Header from "/components/Header";
import Stats from "/components/stats";
import React, { useState } from 'react';
import { Spin } from 'antd';


export default function Dashboard() {

  return (
    <div>
      <div className="flex w-screen h-fit">
        <Sidebar />
        <div className="w-screen">
          <Header />
          <Stats />
        </div>
      </div>
    </div>
  );
}
