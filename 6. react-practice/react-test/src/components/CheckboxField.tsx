import React, { useContext } from "react";
import { Info, InfoContext } from "../pages/LoginForm";

type CheckboxFieldProps = {
  source: keyof Info;
  label: string;
};

const CheckboxField = ({ label, source }: CheckboxFieldProps) => {
  const { value, setValue } = useContext(InfoContext);
  return (
    <>
      {label}
      <input
        type='checkbox'
        value={value[source].toString()}
        onChange={(e) => setValue({ ...value, [source]: e.target.checked })}
      />
    </>
  );
};

export default CheckboxField;
