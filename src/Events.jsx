import React, { useState } from "react";

import { useQuery, gql } from "@apollo/client";

import defaultPic from "./assets/events/default.jpg";
import microsoft from "./assets/events/microsoft.jpg";
import hootsuite from "./assets/events/hootsuite.jpg";

import splash from "./assets/splash/splash.png";

import Arrow from "./components/arrowbutton";
import EventDetailsModal from "./EventInfo";

import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }, // Delay each child
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const GET_EVENTS = gql`
  query {
    sampleEvents {
      id
      name
      event_type
      permission
      start_time
      end_time
      description
      speakers {
        name
      }
      public_url
      private_url
      related_events
    }
  }
`;

function EventList() {
  const { loading, error, data } = useQuery(GET_EVENTS);
  const [sortBy, setSortBy] = useState("start_time"); // by default the list is sorted based on start time
  const [selectedEvent, setSelectedEvent] = useState(null);


  if (loading) return <p>sit tight, we're fetching the events...</p>;
  if (error) return <p>whoops! that's embarrassing. {error.message}</p>;

  const sortedEvents = [...data.sampleEvents].sort((a, b) => {
    if (sortBy === "event_type") {
      return a.event_type.localeCompare(b.event_type); // sorts events alphabetically
    } else if (sortBy === "start_time") {
      return a.start_time - b.start_time; // sorts events numerically
    }
    return 0; // fallback

  });

  const eventImages = {
    "Microsoft API Workshop" : microsoft,
    "Hootsuite API Workshop" : hootsuite,
  }

  const formatDate = (unixTime) => {
    const date = new Date(unixTime);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  

  return (
    <div class="w-[100vw] flex justify-center">
        <div class="flex flex-col justify-start items-center gap-8 font-[Poppins] mt-30">        
        <div class="relative">
            <motion.div 
            class="w-[90vw] 2xl:w-[1400px] h-[400px] rounded-3xl flex items-center bg-cover bg-center bg-no-repeat" 
            style={{backgroundImage: `url(${splash})` }}
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}>
                <h1 class="mx-16 text-start text-white font-bold">events that inspire <br /> and educate.</h1>
            </motion.div>
            <motion.div 
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            class="w-[75vw] min-w-[430px] max-w-[800px] absolute bottom-0 left-1/2 transform -translate-x-1/2 -mb-28 md:-mb-16 py-8 pl-8 pr-12 lg:pr-24 bg-[#202573] text-black rounded-2xl flex flex-col md:flex-row justify-around">
                <h2 class="font-semibold text-lg lg:text-xl text-white text-start min-w-36 md:max-w-32">let's find an event for you!</h2>
                <div class="flex gap-8">
                    <div class="flex flex-col items-start gap-2">
                        <label class="text-white font-semibold">sort by:</label>
                        <select className="pl-4 pr-12 py-2 border rounded-xl transition duration-150 bg-white hover:bg-gray-300" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                            <option value="start_time">Start Time</option>
                            <option value="event_type">Event Type</option>
                        </select>
                    </div>
                    <div class="flex flex-col items-start gap-2">
                        <label class="text-white font-semibold">sort by:</label>
                        <select className="pl-4 pr-12 py-2 border rounded-xl transition duration-150 bg-white hover:bg-gray-300" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                            <option value="start_time">Start Time</option>
                            <option value="event_type">Event Type</option>
                        </select>
                    </div>
                    
                </div>
                
            </motion.div>

        </div>
        

        <div class="flex justify-around items-center gap-4">
                
            </div>

      <motion.div 
        class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 my-20"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.7 }}>
        {sortedEvents.map(event => (
            <div key={event.id} class="w-[350px] bg-white rounded-2xl shadow-md flex justify-between gap-12 items-center transition duration-200 hover:scale-105 hover:rotate-3 hover:bg-gray-200">
                <div class="w-full h-full flex flex-col items-start gap-6">
                    <div className="w-full h-48 bg-cover bg-center rounded-2xl" 
                        style={{ backgroundImage: `url(${eventImages[event.name] || defaultPic})` }}>
                        <div class="flex justify-between m-4">
                            <div class="eventType px-5 py-2 bg-green-200 rounded-lg font-bold flex items-center">
                                <p>{event.event_type}</p>
                            </div>
                            
                            <button onClick={() => setSelectedEvent(event)} class="p-3 bg-[#E2FADB] transition duration-300 hover:bg-[#BFF5B0] hover:scale-90">
                              <Arrow />
                            </button>
                        </div>
                        
                    </div>

                        <div class="eventInfo flex w-full px-12 pb-8 pt-2 gap-6">
                            <div class="p-3 bg-red-400 rounded-lg max-h-18">
                                <p class="max-w-8 text-wrap font-bold text-white">{formatDate(event.start_time)}</p>
                            </div>
                            <div class="flex flex-col h-full justify-between items-start">
                                <h2 class="text-start text-wrap font-semibold max-w-52">{event.name}</h2>
                                {event.speakers.length > 0 && (
                                <p class="text-gray-500">{event.speakers.map(s => s.name).join(", ")}</p>
                                )}
                            </div>
                        </div>

                    
                </div>
                
           </div>
            ))}
      </motion.div>
        
    </div>

    {selectedEvent && (
        <EventDetailsModal
          event={selectedEvent}
          events={data.sampleEvents}
          onClose={() => setSelectedEvent(null)} // Close modal function
          onSelectEvent={setSelectedEvent} // Update event when a related event is clicked
        />
      )}

    </div>

  );
}

export default EventList;
