import React from "react";
import styles from "./css/selector.module.css";
const Selector = ({ input }) => {
  return (
    <div className={styles.selector}>
      <p>{input}</p>
    </div>
  );
};

export default Selector;
