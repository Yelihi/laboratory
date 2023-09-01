import React from "react";

type TextFieldProps = {
  value: string;
  setValue: (v: string) => void;
  label: string;
};

const TextField = ({ value, setValue, label }: TextFieldProps) => {
  return (
    <>
      {label}
      <input onChange={(e) => setValue(e.target.value)} value={value} />
    </>
  );
};

export default TextField;
