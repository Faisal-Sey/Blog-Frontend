import React from 'react';
import Sidebar from "/components/sidebar";
import Header from "/components/Header";
import NewTicket from "/components/add-ticket";

export default function Dashboard() {

  
  return (
    <div>
      <div className="flex w-screen h-fit">
        <Sidebar />
        <div className="w-screen">
          <Header />
          <NewTicket />
        </div>
      </div>
    </div>
  );
}
