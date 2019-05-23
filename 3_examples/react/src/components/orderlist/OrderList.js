import React from "react";
import { Query } from "react-apollo";

import Card from "../card/Card";

import { ORDERS } from "../../apollo/queries";
import Spinner from "../spinner/Spinner";

import css from "./OrderList.module.css";

const ListLoading = () => (
  <div className={css.listLoading}>
    <Spinner />
  </div>
);

const Orders = ({ title, orders }) => (
  <div>
    <h3>{title}</h3>
    {orders.map(({ orderId, delivery }) => (
      <div key={orderId}>
        <p>
          {orderId}: {delivery}
        </p>
      </div>
    ))}
  </div>
);

const OrderList = () => (
  <Card className={css.orderListContainer}>
    <Query query={ORDERS}>
      {({ loading, error, data }) => {
        if (loading) return <ListLoading />;
        if (error) return <p>Error :(</p>;

        return (
          <>
            <Orders title="Undelivered" orders={data.orders} />
            <Orders title="Finished deliveries" orders={data.orders} />
          </>
        );
      }}
    </Query>
  </Card>
);

export default OrderList;
