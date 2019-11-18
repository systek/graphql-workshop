import React from "react";
import { ApolloProvider } from "@apollo/react-hooks";

import client from "../apollo/client";

import Example from "./example/Example";
import "./App.css";

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <header className="App-header">
          React starter for GraphQL workshop
        </header>
        <p>Example component that fetches some data:</p>
        <Example />
      </div>
    </ApolloProvider>
  );
}

export default App;
