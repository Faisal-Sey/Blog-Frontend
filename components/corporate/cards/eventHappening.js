import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import image3 from '../../../public/images/c_image3.png'
import { BACKEND_DOMAIN, STATUS_CODE } from '../../../utils/systemSettings';
import blogServices from '../../../services/blogServices';
import { useRouter } from 'next/router'

function EventHappening() {
  
  const router = useRouter()

  const [ticketContainer, setTicketContainer] = useState(null);

  const tickets = [];

  useEffect(async() => {
    try {
      const res = await blogServices.getTickets({});
      if (res?.status === STATUS_CODE.SUCCESS) {
        for (const value of Object.entries(res?.data.data)) {
          tickets.push(value[1]);
        }

        if (tickets.length === 0) {
          setTicketContainer(<h3>No event tickets yet</h3>);
        } else {
          setTicketContainer(
            tickets.map((ticket) => (
                <div className='event bg-card-corporate p-4 my-4 rounded-lg' key={ticket.id}>
                  <Image src={`${BACKEND_DOMAIN}${ticket.image}`} layout="responsive" width={549} height="180" alt="image3" />
                  <div className='event-title font-medium text-white text-xl'>{ticket.name}</div>
                  <div>{ticket.date} | {ticket.location}, Ghana</div>
                  <button className='buy-ticket rounded font-bold text-xl w-full p-2 text-corporate bg-white '>
                      Buy Ticket
                  </button>
                </div>
            ))
          );
        }
      }
    } catch (err) {
      if (err?.response?.status === STATUS_CODE.NOT_CREATED) {
        router.push("/login")
      }    
    }
  })

  return (
    <>{ticketContainer}</>
  )
}

export default EventHappening