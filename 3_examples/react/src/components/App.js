import React from "react";
import { ApolloProvider } from "react-apollo";

import client from "../apollo/client";

import Header from "./header/Header";
import OrderSystem from "./ordersystem/OrderSystem";
import OrderList from "./orderlist/OrderList";

import css from "./App.module.css";

const App = () => (
  <ApolloProvider client={client}>
    <Header />
    <div className={css.appContainer}>
      <OrderSystem />
      <OrderList />
    </div>
  </ApolloProvider>
);

export default App;
