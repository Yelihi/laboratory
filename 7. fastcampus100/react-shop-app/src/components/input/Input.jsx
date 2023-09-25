import React, { useState } from "react";
import classNames from "classnames";
import styles from "./Input.module.scss";

import Icon from "../icon/Icon";

const Input = ({
  id,
  label,
  name = "",
  labelVisible,
  icon,
  email,
  password,
  placeholder = "",
  readOnly,
  disabled,
  value,
  error: errorProps,
  className = "",
  onChange,
  ...restProps
}) => {
  const [inputValue, setInputValue] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const checkType = () => {
    if (email) {
      return "email";
    }
    if (password) {
      return isPasswordVisible ? "text" : "password";
    }

    return "text";
  };

  const handleChange = () => {
    setInputValue(e.target.value);
    onChange(e);
  };

  const iconType = isPasswordVisible ? "show" : "hide";
  const iconLabel = `비밀번호 ${isPasswordVisible ? "표시" : "감춤"}`;

  return (
    <div className={classNames(styles.formControl, className)}>
      <label>{label}</label>

      <div
        className={classNames(
          styles.inputWrapper,
          errorProps && styles.inputWrapperError
        )}
      >
        {icon ? <Icon /> : null}
        <input
          id={id}
          type={checkType()}
          name={name}
          className={classNames(styles.input)}
          placeholder={placeholder}
          readOnly={readOnly}
          disabled={disabled}
          value={inputValue}
          onChange={handleChange}
          {...restProps}
        />

        {password ? (
          <button
            type='button'
            className={styles.button}
            onClick={() => setIsPasswordVisible((prev) => !prev)}
            disabled={disabled}
          >
            <Icon type={iconType} alt={iconLabel} title={iconLabel} />
          </button>
        ) : null}
      </div>

      {errorProps && (
        <span role='alert' className={styles.error}>
          {errorProps.message}
        </span>
      )}
    </div>
  );
};

export default Input;
