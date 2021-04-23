import React from "react";
import styles from "../css/FormInput.module.css";
const FormInput = (props) => {
  const { labelText, type, name } = props;

  if (type !== "checkbox")
    return (
      <>
        <label class={styles.label} for="first-name">
          {labelText}
        </label>

        <input
          class={styles.input}
          type={type}
          name={name}
          onChange={props.onChange}
        />
      </>
    );
  else
    return (
      <>
        <input
          class={styles.input}
          type={type}
          name={name}
          onChange={props.onChange}
        />
      </>
    );
};

export default FormInput;