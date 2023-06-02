import React from 'react';
import Sidebar from "/components/sidebar";
import Header from "/components/Header";
import TextEditor from "/components/TextEditor";

export default function Dashboard() {
  
  return (
    <div>
      <div className="flex w-screen h-fit">
        <Sidebar />
        <div className="w-screen">
          <Header />
          <TextEditor />
        </div>
      </div>
    </div>
  );
}
