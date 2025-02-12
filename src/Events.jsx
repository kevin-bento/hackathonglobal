import React, { useState } from "react";

import { useQuery, gql } from "@apollo/client";

import defaultPic from "./assets/events/api-test.png";
import microsoft from "./assets/events/microsoft.jpg";
import hootsuite from "./assets/events/hootsuite.jpg";

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

  return (
    <div class="flex flex-col gap-8">
        <div class="flex justify-between">
            <h1>Upcoming Events</h1>
            <div class="flex justify-around items-center gap-4">
                <label class="font-semibold">Sort by:</label>
                <select className="px-4 py-2 border rounded-xl transition duration-150 hover:bg-gray-300" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                    <option value="start_time">Start Time</option>
                    <option value="event_type">Event Type</option>
                </select>
            </div>
            
        </div> 
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {sortedEvents.map(event => (
            <div key={event.id} class="bg-white rounded-2xl shadow-md p-8 flex justify-between gap-12 items-center transition duration-200 hover:scale-105 hover:rotate-3 hover:bg-gray-200">
                <div class="flex flex-col items-start gap-12">
                    <h2 class="text-2xl text-start font-semibold">{event.name}</h2>
                    <div class="flex flex-col items-start">
                        <p>Type: {event.event_type}</p>
                        <p>Starts: {event.start_time}</p>
                        {event.speakers.length > 0 && (
                        <p>Speakers: {event.speakers.map(s => s.name).join(", ")}</p>
                        )}
                    </div>
                </div>
                <div className="w-48 h-48 rounded-xl bg-cover bg-center" 
                    style={{ backgroundImage: `url(${eventImages[event.name] || defaultPic})` }}>
                </div>
           </div>
            ))}
      </div>
        
    </div>
  );
}

export default EventList;

//<p>{event.description}</p>
