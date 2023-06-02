import React, { useEffect, useState } from "react";
import Image from "next/image";
import { EyeIcon } from "@heroicons/react/solid";
import { ChatAlt2Icon } from "@heroicons/react/solid";
import postimage from "../assets/images/postimage.png";
import authService from '../services/authServices'
import blogServices from "../services/blogServices";
import { STATUS_CODE } from "../utils/systemSettings";
import { BACKEND_DOMAIN } from "../utils/systemSettings";

const Card = () => {

  const [mapTickets, setMapTickets] = useState(null);

  const tickets = []

  useEffect(() => {

    let isDone = false

    const getData = async() => {

    try {
      const res = await blogServices.getTickets({})
      if (res?.status === STATUS_CODE.SUCCESS){
        for (const values of Object.entries(res?.data.data)) {
          tickets.push(values[1])
        }
        
        if (tickets.length > 2){
          setMapTickets(tickets.slice(0, 1).map((ticket) => 
            <div
                className={`transform hover:scale-110 cursor-pointer transition delay-100 w-80 p-2 py-4 shadow-xl rounded-xl bg-gradient-to-r`}
                key={ticket.id}
              >
                <div className="flex md:space-x-2 space-x-4">
                  <div className="md:w-2/4 w-fit mt-5">
                    <Image
                      src={`${BACKEND_DOMAIN}${ticket.image}`}
                      width="140"
                      height="60"
                      className="rounded-md"
                    />
                  </div>

                  <div className="text-left space-y-1 mt-7 w-2/4">
                    <h3 className="md:text-sm text-xs">{ticket.name}</h3>
                    <div className="flex md:space-x-6 space-x-4 mt-2">
                      <div className="flex space-x-2">
                        <EyeIcon className="text-black h-4 w-4" />
                        <p className="text-xs">{ticket.view}</p>
                      </div>
                      <div className="flex space-x-2">
                        <ChatAlt2Icon className="text-black h-4 w-4" />
                        <p className="text-xs">{ticket.clicks}</p>
                      </div>
                    </div>
                  </div>
                </div>
            </div>

          ))
        } else {
          setMapTickets(tickets.map((ticket) => 
            <div
                className={`transform hover:scale-110 cursor-pointer transition delay-100 w-80 p-2 py-4 shadow-xl rounded-xl bg-gradient-to-r`}
                key={ticket.id}
              >
                <div className="flex md:space-x-2 space-x-4">
                  <div className="md:w-2/4 w-fit mt-5">
                    <Image
                      src={`${BACKEND_DOMAIN}${ticket.image}`}
                      width="140"
                      height="60"
                      className="rounded-md"
                    />
                  </div>

                  <div className="text-left space-y-1 mt-7 w-2/4">
                    <h3 className="md:text-sm text-xs">{ticket.name}</h3>
                    <div className="flex md:space-x-6 space-x-4 mt-2">
                      <div className="flex space-x-2">
                        <EyeIcon className="text-black h-4 w-4" />
                        <p className="text-xs">{ticket.view}</p>
                      </div>
                      <div className="flex space-x-2">
                        <ChatAlt2Icon className="text-black h-4 w-4" />
                        <p className="text-xs">{ticket.clicks}</p>
                      </div>
                    </div>
                  </div>
                </div>
            </div>
          ))
        }
      }
      }catch(err){
        const refresh = await authService.refreshToken({})
        const res = await blogServices.getTickets({})
        if (res?.status === STATUS_CODE.SUCCESS){
            for (const values of Object.entries(res?.data.data)) {
              tickets.push(values[1])
            }
            
            if (tickets.length > 2){
              setMapTickets(tickets.slice(0, 1).map((ticket) => 
                <div
                    className={`transform hover:scale-110 cursor-pointer transition delay-100 w-80 p-2 py-4 shadow-xl rounded-xl bg-gradient-to-r`}
                    key={ticket.id}
                  >
                    <div className="flex md:space-x-2 space-x-4">
                      <div className="md:w-2/4 w-fit mt-5">
                        <Image
                          src={`${BACKEND_DOMAIN}${ticket.image}`}
                          width="140"
                          height="60"
                          className="rounded-md"
                        />
                      </div>

                      <div className="text-left space-y-1 mt-7 w-2/4">
                        <h3 className="md:text-sm text-xs">{ticket.name}</h3>
                        <div className="flex md:space-x-6 space-x-4 mt-2">
                          <div className="flex space-x-2">
                            <EyeIcon className="text-black h-4 w-4" />
                            <p className="text-xs">{ticket.view}</p>
                          </div>
                          <div className="flex space-x-2">
                            <ChatAlt2Icon className="text-black h-4 w-4" />
                            <p className="text-xs">{ticket.clicks}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                </div>
              ))
            } else {
              setMapTickets(tickets.map((ticket) => 
                <div
                    className={`transform hover:scale-110 cursor-pointer transition delay-100 w-80 p-2 py-4 shadow-xl rounded-xl bg-gradient-to-r`}
                    key={ticket.id}
                  >
                    <div className="flex md:space-x-2 space-x-4">
                      <div className="md:w-2/4 w-fit mt-5">
                        <Image
                          src={`${BACKEND_DOMAIN}${ticket.image}`}
                          width="140"
                          height="60"
                          className="rounded-md"
                        />
                      </div>

                      <div className="text-left space-y-1 mt-7 w-2/4">
                        <h3 className="md:text-sm text-xs">{ticket.name}</h3>
                        <div className="flex md:space-x-6 space-x-4 mt-2">
                          <div className="flex space-x-2">
                            <EyeIcon className="text-black h-4 w-4" />
                            <p className="text-xs">{ticket.view}</p>
                          </div>
                          <div className="flex space-x-2">
                            <ChatAlt2Icon className="text-black h-4 w-4" />
                            <p className="text-xs">{ticket.clicks}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                </div>
              ))
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
    <>{mapTickets}</>
  );
};

export default Card;
