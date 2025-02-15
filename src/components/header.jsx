import React, { useState } from "react";

import { useQuery, gql } from "@apollo/client";



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

function Header() {


  return (
    <div class="fixed top-0 z-50 w-screen px-7 py-4 flex 2xl:px-[10vw] bg-[#F3FFC2] justify-between items-center drop-shadow-xl">
        <p class="font-black text-sm">hackathonglobal.</p>
        <button onClick={() => {
          alert(`coming soon!`);
        }} class="px-6 py-3 bg-[#232ED1]">login</button>
    </div>
  );
}

export default Header;

