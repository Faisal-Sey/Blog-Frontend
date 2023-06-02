import React from 'react';
import Sidebar from "/components/sidebar";
import Header from "/components/Header";
import Comments from "/components/comments";

export default function Dashboard() {

  
  return (
    <div>
      <div className="flex w-screen h-fit">
        <Sidebar />
        <div className="w-screen">
          <Header />
          <Comments />
        </div>
      </div>
    </div>
  );
}
