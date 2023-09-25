import React from "react";

import styles from "./AutoSignInCheckBox.module.scss";
import CheckBox from "../checkBox/CheckBox";
import Tootip from "../tootip/Tootip";

const AutoSignInCheckBox = ({
  label = "자동 로그인",
  checked,
  disabled,
  orientation = "top",
  message = "개인 정보 보호를 위해 본인 기기에서만 사용해 주세요",
  onChnage,
  ...restProps
}) => {
  return (
    <div className={styles.wrapper}>
      <CheckBox
        label={label}
        checked={checked}
        disabled={disabled}
        onChnage={onChnage}
        {...restProps}
      />
      {checked && (
        <Tootip
          left={-5}
          top={24}
          orientation={orientation}
          message={message}
        />
      )}
    </div>
  );
};

export default AutoSignInCheckBox;
