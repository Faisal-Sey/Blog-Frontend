import React, { useEffect, useState, useRef } from "react";
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { Modal, Upload, message, Form, Input, Button, DatePicker, Spin } from 'antd';
import moment from 'moment'
import Image from "next/image";
import Link from "next/link";
import { ClockIcon } from "@heroicons/react/solid";
import { EyeIcon } from "@heroicons/react/solid";
import { PencilIcon } from "@heroicons/react/solid";
import { TrashIcon } from "@heroicons/react/solid";
import { SearchIcon } from "@heroicons/react/solid";
import { CursorClickIcon } from "@heroicons/react/solid";
import { TicketIcon } from "@heroicons/react/solid";
import authService from '../services/authServices'
import blogServices from "../services/blogServices";
import { STATUS_CODE, BACKEND_DOMAIN } from "../utils/systemSettings";
import { useRouter } from "next/router";


const Ticket = () => {

  const tickets = []

  const [ticketUpdate, setTicketUpdate] = useState(false)

  const totalTicketsRef = useRef(0)

  const router = useRouter();

  const [form] = Form.useForm();

  const [editTicketContainer, setEditTicketContainer] = useState({})

  const [state, setState] = useState({loading: false});

  const [isModalVisible, setIsModalVisible] = useState(false);

  const [isTicketModalVisible, setIsTicketModalVisible] = useState(false)

  const [isWeb, setIsWeb] = useState(false)

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
      setIsModalVisible(false);
  };

  const handleTicketModalOk = () => {
    setIsTicketModalVisible(false);
  };

  const handleTicketModalCancel = () => {
    setIsTicketModalVisible(false);
  };

  function beforeUpload(file) {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
  }

  const handleChange = info => {
    if (info.file.status === 'uploading') {
      setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      setEditTicketContainer({
        ...editTicketContainer,
        image: info.file.originFileObj
      });
      setIsWeb(true)
    }
  };

  const { loading, imageUrl } = state;
  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );


  const [mapTickets, setMapTickets] = useState(null)

  const trashTicket = async(id) => {
    try {
      const res = await blogServices.deleteTicket({
        ticket_id: id
      })
      if (res?.status === STATUS_CODE.SUCCESS) {
        message.success("Ticket deleted successfully", 3)
        setTicketUpdate(true)
      }
    }catch(err){
      const refresh = await authService.refreshToken({})
      const res = await blogServices.deleteTicket({
        ticket_id: id
      })
      if (res?.status === STATUS_CODE.SUCCESS) {
        message.success("Ticket deleted successfully", 3)
      }
    }
  }

  const editTicket = (ticket) => {
    setEditTicketContainer(ticket)
    setIsModalVisible(true)
  }

  const viewTicket = (ticket) => {
    setEditTicketContainer(ticket)
    setIsTicketModalVisible(true)
  }

  const handleChangeInputs = (e) => {
    const value = e.target.value;
    setEditTicketContainer({
      ...editTicketContainer,
      [e.target.name]: value
    })
  }

  const handleDate = (e) => {
    setEditTicketContainer({
      ...editTicketContainer,
      date:moment(e).format("YYYY-MM-DD")
    })
  }

  
  const updateTicket = async() => {
    const formData = new FormData()
    for(const pair of Object.entries(editTicketContainer)){
      formData.append(pair[0], pair[1])
    }
    try {
      const refresh = await authService.refreshToken({})
      const res = await blogServices.updateTicket(formData)
      if (res?.status === STATUS_CODE.SUCCESS){
        setIsModalVisible(false);
      }
    }catch(err){}
  }

  const convertDate = (date) => {
    if (date) {
      const day = date.split(" ")[0];
      let month = date.split(" ")[1];
      const year = date.split(" ")[2]

      const months = ["January", "February", "March", "April", "May", "June", 
      "July", "August", "September", "October", "November", "December"]
      
      month = month.slice(0, month.length-1)
      month = months.indexOf(month) + 1

      let newDay = '';

      if (day.length === 4) {
        newDay = day.slice(0, 2)
      }
      else if (day.length === 3) {
        newDay = "0" + day[0]
      }

      return year + "-" + month + "-" + newDay
    }
  }

  
  useEffect(() => {

    let isDone = false

    const getData = async() => {
      try {
        const refresh = await authService.refreshToken({})
        const res = await blogServices.getTickets({})
        if (res?.status === STATUS_CODE.SUCCESS){
          for (const values of Object.entries(res?.data.data)) {
            tickets.push(values[1])
          }
          
          setMapTickets(tickets.map((ticket) => 
              <div className="flex md:w-full w-max shadow-md cursor-pointer border-2 rounded-md" key={ticket.id}>
              <div className="flex space-x-4 mt-3 mb-6 ml-2 w-full">
                <Image
                  src={`${BACKEND_DOMAIN}${ticket.image}`}
                  width="60"
                  height="60"
                  className="rounded-md"
                />
                <div className="flex flex-col md:w-full w-1/2 h-10">
                  <h3 className="md:text-xl text-sm md:font-normal font-medium md:tracking-wide">
                    <>{ticket.name}</>
                  </h3>
                  <div className="flex md:space-x-3 space-x-2 md:space-y-1">
                    <span className="flex md:text-center mt-1 gap-1">
                      <ClockIcon className="md:h-4 md:w-4 h-3 w-3 text-center hover:text-primary" />
                      <p className="text-xs hidden md:block">{ticket.date}</p>
                    </span>

                    <span className="flex text-center mt-1 gap-1">
                      <EyeIcon className="md:h-4 md:w-4 h-3 w-3 text-center hover:text-primary" />
                      <p className="text-xs hidden md:block">{ticket.view === null ? 0 : ticket.view}</p>
                    </span>

                    <span className="flex text-center mt-1 gap-1">
                      <CursorClickIcon className="md:h-4 md:w-4 h-3 w-3 text-center hover:text-primary" />
                      <p className="text-xs hidden md:block">{ticket.clicks === null ? 0 : ticket.clicks}</p>
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex md:ml-60 ml-20 md:mt-3 mt-5 mb-3 md:space-x-12 space-x-4 mr-3 p-2 w-1/2 md:w-full">
                <span className="flex flex-col" onClick={() => viewTicket(ticket)}>
                  <EyeIcon className="md:h-5 md:w-5 h-4 w-4 ml-1 hover:text-primary" />
                  <p className="hover:text-primary hidden md:block">View</p>
                </span>

                <span className="flex flex-col" onClick={() => editTicket(ticket)}>
                  <PencilIcon className="md:h-5 md:w-5 h-4 w-4 hover:text-primary" />
                  <p className="hover:text-primary hidden md:block">Edit</p>
                </span>

                <span className="flex flex-col" onClick={() => trashTicket(ticket.id)}>
                  <TrashIcon className="md:h-5 md:w-5 h-4 w-4 hover:text-primary" />
                  <p class="hover:text-primary hidden md:block">Delete</p>
                </span>
              </div>
              </div>
          ))
          totalTicketsRef.current.innerText = `Showing 1 to ${tickets.length} of ${tickets.length}`
        }
      }catch(err){}
    }

    if (!(isDone)){
      getData();
    }

    return () => {
      isDone = true
      setTicketUpdate(false)
    }
  }, [ticketUpdate])
  

  return (
    <>
      <div className=" bg-white md:w-full w-fit h-full">
        <div className="flex py-1 mt-6 gap-80 md:ml-14 ml-4 md:w-5/6 w-fit">
          <p className="md:text-3xl text-xl transform-translate-y-2 w-fit">
            Tickets
          </p>

          <div className="border-2 hidden border-gray-400 rounded overflow-hidden md:flex md:ml-80 md:space-x-10">
            <button className="flex items-center justify-center md:px-4 border-l">
              <SearchIcon className="md:h-5 md:w-5 h-4 w-4 text-purple-400" />
              <input
                type="text"
                className="md:py-2 md:ml-3 ml-1"
                placeholder="Search"
              />
            </button>
          </div>
        </div>
        <div className="shadow-2xl md:w-5/6 md:ml-14 bg-white rounded-md ticket-all">
          <div className="md:ml-14 ml-6 mt-3">
            <div className="flex">
              <div className="flex space-x-4 mt-3 mb-3 md:ml-2 md:w-full w-fit">
                <h3 className="md:text-xl text-md text-gray-600 font-medium md:ml-1 mt-3">
                  Recent Ticket Posts
                </h3>
              </div>

              <Link href="/dashboard/new-ticket">
                <button className="flex shadow text-center shadow-gray-600 md:ml-60 ml-64 mt-3 mb-3 bg-primary text-white space-x-2 rounded-md md:mr-3 mr-1 p-2 md:w-2/5 w-fit md:h-10">
                  <span>
                    <TicketIcon className="md:ml-2 md:h-6 md:w-6 h-5 w-5" />
                  </span>
                  <p className="md:text-right hidden md:block">Add new Ticket</p>
                </button>
              </Link>
            </div>

            {/* Blog cards */}
            <div style={{maxHeight: "55vh", overflowY: "scroll"}}>
              {mapTickets}
            </div>

            <div className="flex">
              <div className="flex space-x-4 mt-3 mb-3 md:ml-2 w-full">
                <h3 ref={totalTicketsRef} className="flex text-left md:text-sm text-xs space-x-8 rounded-md p-2 w-full h-10">
                  Showing 1 to 5 of 5 entities
                </h3>
              </div>

            </div>
          </div>
        </div>
        <div className="flex mt-6 shadow-2xl w-4/5 ml-14 space-x-18 bg-white rounded-md"></div>
      </div>
      <Modal 
        title="Edit Ticket Post" 
        visible={isModalVisible} 
        onOk={handleOk} 
        onCancel={handleCancel}
        footer={null}
      >       
        {editTicketContainer.image ? 
        <>
          <Upload
            name="avatar"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            beforeUpload={beforeUpload}
            onChange={handleChange}
          >
            {<img src={isWeb ? URL.createObjectURL(editTicketContainer.image) : `${BACKEND_DOMAIN}${editTicketContainer.image}`} alt="avatar" style={{ width: '100%' }} />}<br/>
          </Upload>
        </>
        :
        <Upload
          name="avatar"
          listType="picture-card"
          className="avatar-uploader"
          showUploadList={false}
          beforeUpload={beforeUpload}
          onChange={handleChange}
        >
          {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
        </Upload>
        } 
        <Form
          form={form}
          layout="vertical"
          className="edit-ticket-form"
        >
          <Form.Item label="Event Name">
            <Input 
              placeholder="Event Name" 
              name="name"
              value={editTicketContainer.name}
              onChange={handleChangeInputs}
            />
          </Form.Item>
          <Form.Item label="Date">
            <DatePicker 
              placeholder="Date" 
              className="date-pick" 
              name="date"
              value={moment(convertDate(editTicketContainer.date), "YYYY-MM-DD")}
              onChange={handleDate}
            />
          </Form.Item>
          <Form.Item label="Location">
            <Input 
              placeholder="Location" 
              name="location"
              value={editTicketContainer.location}
              onChange={handleChangeInputs}
            />
          </Form.Item>
          <Form.Item label="Ticket URL">
            <Input 
              placeholder="Ticket URL" 
              name="url"
              value={editTicketContainer.url}
              onChange={handleChangeInputs}
            />
          </Form.Item>
          <Form.Item>
            <Button 
              type="primary" 
              onClick={updateTicket}
              className="ticket-update-btn"
            >
              Submit
            </Button>
          </Form.Item>
        </Form>

      </Modal>      
      <Modal 
        title="View Ticket Post" 
        visible={isTicketModalVisible} 
        onOk={handleTicketModalOk} 
        onCancel={handleTicketModalCancel}
        footer={null}
      >       
        <Upload
          name="avatar"
          listType="picture-card"
          className="avatar-uploader"
          showUploadList={false}
        >
          {<img src={`${BACKEND_DOMAIN}${editTicketContainer.image}`} alt="avatar" style={{ width: '100%' }} />}
        </Upload>
        <div style={{marginTop: "30px", width:"50%", textAlign:"center", marginLeft:"25%", marginRight:"25%"}}>
          <h3><b>Event Name</b></h3>
          <p>{editTicketContainer.name}</p>
          <div className="splitter"></div>
          <h3><b>Date</b></h3>
          <p>{editTicketContainer.date}</p>
          <div className="splitter"></div>
          <h3><b>Location</b></h3>
          <p>{editTicketContainer.location}</p>
          <div className="splitter"></div>
          <h3><b>Ticket URL</b></h3>
          <a 
            href={editTicketContainer.url} 
          >
            <u>{editTicketContainer.url}</u>
          </a>
          <div className="splitter"></div>
        </div>

      </Modal>   
      </>
  );
};

export default Ticket;