import React from 'react';
import Sidebar from "/components/sidebar";
import Header from "/components/Header";
import Post from "/components/Post";

export default function Dashboard() {
  
  return (
    <div>
      <div className="flex w-screen h-fit">
        <Sidebar />
        <div className="w-screen">
          <Header />
          <Post />
        </div>
      </div>
    </div>
  );
}
