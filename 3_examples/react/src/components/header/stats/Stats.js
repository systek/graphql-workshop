import React from "react";
import { Query } from "react-apollo";

import { ORDERS } from "../../../apollo/queries";
import Spinner from "../../spinner/Spinner";

import css from "./Stats.module.css";

const Stats = () => (
  <div className={css.stats}>
    <Query query={ORDERS}>
      {({ data, loading, error }) => {
        if (loading) {
          return <Spinner smoll />;
        }

        const orders = data.orders.length;

        return (
          <div className={css.counter}>
            <div>{orders === 0 ? "No" : orders}</div>
            <div>{orders === 1 ? "order" : "orders"}</div>
          </div>
        );
      }}
    </Query>
  </div>
);

export default Stats;
