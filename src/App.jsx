import { useState } from 'react'
import './App.css'

import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import EventList from "./Events"; // Create this component next

const client = new ApolloClient({
  uri: "https://api.hackthenorth.com/v3/frontend-challenge",
  cache: new InMemoryCache(),
});

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <ApolloProvider client={client}>
      <EventList />
    </ApolloProvider>
    </>
  )
}

export default App
