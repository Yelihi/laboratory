import React, { useContext, useState, useEffect } from "react";
import { Info, InfoContext, PartialInfo } from "../pages/LoginForm";

type BooleanKey = {
  [K in keyof Info]: Info[K] extends boolean ? K : never;
}[keyof Info];

const CheckboxField: React.FC<{
  source: BooleanKey;
  label: string;
  validate: any;
}> = ({ label, source, validate }) => {
  const { value, setValue } = useContext(InfoContext);
  const [error, setError] = useState<string>();

  useEffect(() => {
    const errors: (string | undefined)[] = validate.map(
      (validationFunc: any) => {
        return validationFunc(value[source]);
      }
    );
    const err = errors.find((error) => error);
    setError(err);
  }, [value[source]]);

  return (
    <>
      {label}
      <input
        type='checkbox'
        value={value[source].toString()}
        onChange={(e) =>
          setValue({ [source]: e.target.checked } as PartialInfo)
        }
      />
      {error && <p style={{ color: "crimson " }}>{error}</p>}
    </>
  );
};

export default CheckboxField;
