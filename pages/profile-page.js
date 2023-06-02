import React from 'react';
import Profile from "../components/profile";
import Navbar from "../components/navbar";


export default function Profilepage() {

  return (
    <div>
      <Navbar/>
      <Profile theme="secondary" />
    </div>
  );
}