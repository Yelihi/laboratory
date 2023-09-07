import React, { useContext, useState, useEffect } from "react";
import { Info, InfoContext, PartialInfo } from "../pages/LoginForm";
import { Object } from "ts-toolbelt";
import useInput from "../hooks/useInput";

// Omit<type, key>
// type 중에서 key 를 제거한 type 을 반환한다. 객체에서 특정 type 만 적용시키기 좋은 유틸리티

export type StringKeys = Object.SelectKeys<Info, string>;

type TextFieldProps = {
  label: string;
  source: StringKeys;
  validate: any;
};

const TextField = ({ label, source, validate }: TextFieldProps) => {
  const { error, value, onChange } = useInput({ source, validate }); // ex . minInput, maxInput

  return (
    <>
      {label}
      <input
        data-testid={source}
        onChange={(e) => onChange(e.target.value)}
        value={value.toString()}
      />
      {error && <p style={{ color: "crimson " }}>{error}</p>}
    </>
  );
};

export default TextField;
