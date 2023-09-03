import React, { useContext } from "react";
import { Info, InfoContext } from "../pages/LoginForm";

type TextFieldProps = {
  label: string;
  source: keyof Info;
};

const TextField = ({ label, source }: TextFieldProps) => {
  const { value, setValue } = useContext(InfoContext);
  return (
    <>
      {label}
      <input
        onChange={(e) => setValue({ ...value, [source]: e.target.value })}
        value={value[source].toString()}
      />
    </>
  );
};

export default TextField;
