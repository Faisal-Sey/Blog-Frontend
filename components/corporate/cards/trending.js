import React, { useEffect, useState } from 'react'
import image2 from '../../../public/images/c_image2.jpg'
import Image from 'next/image'
import blogServices from '../../../services/blogServices';
import { STATUS_CODE, BACKEND_DOMAIN } from '../../../utils/systemSettings';


function Trending({width}) {
    
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
                <div className={`w-full my-4 relative trending-cards`} key={ticket.id}>
                    <Image src={`${BACKEND_DOMAIN}${ticket.image}`} layout="responsive" width={460} height={250} alt="image 2" />
                    <div className='absolute top-2/4 text-white p-4'>
                        <div className="font-medium">
                            An Event you want to attend:
                            {ticket.name}
                        </div>
                        <div>
                        {ticket.date} 
                        </div>
                    </div>
                </div>
              ))
            );
          }
        }
      } catch (err) {
        ;
      }
    })
    
    return (
        <>{ticketContainer}</>
    )
}

export default Trending