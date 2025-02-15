import { useState } from 'react';
import './App.css';
import Header from './components/header';

import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import EventList from "./Events";

const client = new ApolloClient({
  uri: "https://api.hackthenorth.com/v3/frontend-challenge",
  cache: new InMemoryCache(),
});

function App() {
  
  return (
    
    <>
     <div className="bg-[#ECECFF] w-screen">
    <Header></Header>
    <ApolloProvider client={client}>
      <EventList />
    </ApolloProvider>
    </div>
    
    </>
   
  )
}

export default App;
