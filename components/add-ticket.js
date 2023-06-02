import React, { useRef, useState } from "react";
import { Spin } from "antd";
import authService from "../services/authServices"
import blogServices from "../services/blogServices";
import { STATUS_CODE } from "../utils/systemSettings";
import { useRouter } from "next/router";

function Profile() {
  const [data, setData] = useState({
    image: null,
    name: "",
    location: "",
    url: "",
    date: "",
  });

  const [state, setState] = useState({});

  const router = useRouter();

  const imgRef = useRef(null);

  const handleFileChange = async (e) => {
    const file = e.target.files[0] || null;
    if (file) {
      setData({
        ...data,
        image: file,
      });
      imgRef.current = URL.createObjectURL(file);
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setData({
      ...data,
      [e.target.name]: value,
    });
  };

  const createTicket = async () => {
    const formData = new FormData();
    for (const pair of Object.entries(data)) {
      formData.append(pair[0], pair[1]);
    }
    try {
      const res = await blogServices.createTicket(formData);
      if (res?.status === STATUS_CODE.SUCCESS) {
        router.push("/dashboard/ticket-board");
      }
    } catch (err) {
      const refresh = await authService.refreshToken({})
      const res = await blogServices.createTicket(formData);
      if (res?.status === STATUS_CODE.SUCCESS) {
        router.push("/dashboard/ticket-board");
      }
    }
  };

  window.onload = () => {
    setState(false)
  }
  

  return (
    <div className=" bg-white shadow-md border-2 w-full h-full">
      <div className="flex py-1 mt-6 gap-80 md:ml-14 ml-6 w-5/6">
        <p className="md:text-3xl text-xl transform-translate-y-2 w-fit">
          Tickets
        </p>
      </div>

      <div className="shadow-md shadow-gray-400 w-11/12 md:ml-8 ml-2">
        <h3 className="md:text-xl text-base text-gray-600 font-medium ml-8 mt-5">
          Create new Ticket Post
        </h3>
        <div className="shadow-2xl w-full mt-2 mb-6 bg-white rounded-md new-ticket-box">
          <div className="flex p-2 space-x-16 justify-center py-1 w-full">
            <div className="py-20 bg-white w-full hover:shadow ticket-inner-container">
              <div className="w-full border-2 border-gray-400 rounded-md h-40 text-center">
                <img
                  src={imgRef.current}
                  style={{ width: "100%", height: "100%" }}
                />
              </div>{" "}
              <h3 className="w-full text-gray-400 text-sm"></h3>{" "}
              <input
                type="file"
                onChange={handleFileChange}
                accept=".jpg,.png"
                className="flex items-center mt-5 mb-6 justify-between gap-2"
              />{" "}
              <div className="mt-3">
                <div className="my-3">
                  <h3 className="text-md text-gray-600 text-sm uppercase font-medium">
                    Event name
                  </h3>
                  <input
                    type="text"
                    name="name"
                    onChange={handleInputChange}
                    className="p-2 border border-gray-600 rounded text-gray-600 w-full"
                  />
                </div>
                <div className="my-3">
                  <h3 className="text-md text-gray-600 rounded text-sm uppercase font-medium">
                    Date
                  </h3>
                  <input
                    type="date"
                    name="date"
                    onChange={handleInputChange}
                    className="text-input p-2 border border-gray-600 text-gray-600 w-full"
                  />
                </div>
                <div className="my-3">
                  <h3 className="text-md text-gray-600 rounded text-sm uppercase font-medium">
                    Location
                  </h3>
                  <input
                    type="text"
                    name="location"
                    onChange={handleInputChange}
                    className="text-input p-2 border border-gray-600 text-gray-600 w-full"
                  />
                </div>
                <div className="my-4 w-full">
                  <h3 className="text-md text-gray-600 rounded text-sm uppercase font-medium">
                    Ticket URL
                  </h3>
                  <input
                    type="url"
                    name="url"
                    onChange={handleInputChange}
                    className="text-input p-2 border border-gray-600 text-gray-600 w-full"
                  />
                </div>
                <div className="flex items-center mt-5 mb-6 justify-between gap-2">
                  {" "}
                  <h3 className="w-full text-gray-400 text-sm"></h3>{" "}
                  <button
                    onClick={createTicket}
                    className="w-full h-9 bg-primary text-white text-sm rounded uppercase hover:bg-secondary hover:text-white"
                  >
                    Create post
                  </button>{" "}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
