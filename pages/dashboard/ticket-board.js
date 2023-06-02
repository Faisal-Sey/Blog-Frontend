import Sidebar from "/components/sidebar";
import Header from "/components/Header";
import Ticket from "/components/Ticket";
import React from 'react';


export default function Dashboard() {

  return (
    <div>
      <div className="flex w-screen h-fit">
        <Sidebar />
        <div className="w-screen">
          <Header />
          <Ticket />
        </div>
      </div>
    </div>
  );
}
