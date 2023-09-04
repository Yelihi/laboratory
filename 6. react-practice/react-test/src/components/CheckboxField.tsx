import React, { useContext, useState, useEffect } from "react";
import { Info, InfoContext, PartialInfo } from "../pages/LoginForm";

import useInput from "../hooks/useInput";

export type BooleanKey = {
  [K in keyof Info]: Info[K] extends boolean ? K : never;
}[keyof Info];

const CheckboxField: React.FC<{
  source: BooleanKey;
  label: string;
  validate: any;
}> = ({ label, source, validate }) => {
  const { error, value, onChange } = useInput({ source, validate });

  return (
    <>
      {label}
      <input
        type='checkbox'
        value={value.toString()}
        onChange={(e) => onChange(e.target.checked)}
      />
      {error && <p style={{ color: "crimson " }}>{error}</p>}
    </>
  );
};

export default CheckboxField;
