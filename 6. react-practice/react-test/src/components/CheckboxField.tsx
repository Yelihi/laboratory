import React from "react";

type CheckboxFieldProps = {
  value: boolean;
  setValue: (v: boolean) => void;
  label: string;
};

const CheckboxField = ({ value, setValue, label }: CheckboxFieldProps) => {
  return (
    <>
      {label}
      <input
        type='checkbox'
        value={value.toString()}
        onChange={(e) => setValue(e.target.checked)}
      />
    </>
  );
};

export default CheckboxField;
