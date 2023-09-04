import React, { useContext, useState, useEffect } from "react";
import { Info, InfoContext, PartialInfo } from "../pages/LoginForm";
import { Object } from "ts-toolbelt";

// Omit<type, key>
// type 중에서 key 를 제거한 type 을 반환한다. 객체에서 특정 type 만 적용시키기 좋은 유틸리티

type StringKeys = Object.SelectKeys<Info, string>;

type TextFieldProps = {
  label: string;
  source: StringKeys;
  validate: any;
};

const TextField = ({ label, source, validate }: TextFieldProps) => {
  const { value, setValue } = useContext(InfoContext);
  const [error, setError] = useState<string>();

  useEffect(() => {
    const errors: (string | undefined)[] = validate.map(
      (validationFunc: any) => {
        if (value[source]) {
          return validationFunc(value[source]);
        }
      }
    );
    const err = errors.find((error) => error); // undefined 가 아닌거 찾기
    setError(err);
  }, [value[source]]);

  return (
    <>
      {label}
      <input
        data-testid={source}
        onChange={(e) => setValue({ [source]: e.target.value } as PartialInfo)}
        value={value[source].toString()}
      />
      {error && <p style={{ color: "crimson " }}>{error}</p>}
    </>
  );
};

export default TextField;
