import React from "react";
import cn from "classnames";

import css from "./Spinner.module.css";

// Spinner from https://loading.io/css/

const Spinner = ({ smoll }) => (
  <div className={cn(css.spinner, { [css.smoll]: smoll })}>
    <div className={css.heart}>
      <div />
    </div>
  </div>
);

export default Spinner;
