import React, { useState } from "react";
import Card from "./Card";
import TicketCard from "./Ticket-card";
import Middle from "./Middle";
import RightBar from "./RightBar";

const Container = () => {

  return (
    <div className=" bg-white w-full h-full">
      <div className="px-8 py-1 mt-6 md:ml-6">
        <p className="md:text-3xl text-xl transform-translate-y-2">
          Admin Home
        </p>
      </div>
      <div className="shadow-2xl w-5/6 md:ml-14 ml-10 bg-white rounded-md">
        <div className="md:ml-14 mt-1">
          <h3 className="md:text-xl text-md text-gray-600 font-medium ml-2 mt-3">
            Recent Posts
          </h3>
          <div className="md:flex p-2 md:space-x-16">
            <Card />
          </div>
          <h3 className="md:text-xl text-md text-gray-600 font-medium ml-2 md:mt-5 mt-6">
            Ticket Links
          </h3>
          <div className="md:flex p-2 md:space-x-16">
            <TicketCard />
          </div>
        </div>
      </div>
      <div className="flex mt-6 shadow-2xl w-5/6 md:ml-14 ml-10 space-x-18 bg-white rounded-md">
        <Middle type={"days"} active={"views"} />
        <RightBar />
      </div>
    </div>
  );
};

export default Container;
