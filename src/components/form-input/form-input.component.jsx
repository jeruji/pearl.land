import React from "react";
import "./form-input.styles.scss";

const FormInput = ({ handleChange, label, error, ...otherProps }) => {
  return (
    <div className="group">
      <input
        className="form-input"
        aria-label={label}
        onChange={handleChange}
        {...otherProps}
      />
      {label ? (
        <label
          className={`${
            otherProps.value.length ? "shrink" : ""
          } form-input-label`}
        >
          {label}
        </label>
      ) : null}
      {typeof error !== "undefined" && error.length > 0 && (
        <span data-testid="formErrors" className="error">
          {error}
        </span>
      )}
    </div>
  );
};

export default FormInput;
