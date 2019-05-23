import React from "react";

import css from "./OrderSystem.module.css";
import Spinner from "../spinner/Spinner";
import Card from "../card/Card";

const OrderSystem = () => (
  <Card className={css.orderSystemContainer}>
    <Spinner />
  </Card>
);

export default OrderSystem;
