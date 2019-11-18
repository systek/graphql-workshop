import React from 'react'
import { ApolloProvider } from '@apollo/react-hooks'

import { FlagsProvider } from '../context/DemoFlags'
import client from '../apollo/client'

import Header from './header/Header'
import OrderSystem from './ordersystem/OrderSystem'
import OrderList from './orderlist/OrderList'

import css from './App.module.css'

const App = () => (
  <FlagsProvider>
    <ApolloProvider client={client}>
      <Header />
      <div className={css.appContainer}>
        <OrderSystem />
        <OrderList />
      </div>
    </ApolloProvider>
  </FlagsProvider>
)

export default App
