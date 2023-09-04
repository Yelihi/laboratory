import React, { createContext, useState, useReducer } from "react";
import { minLength, maxLength, checked } from "../validation";

import TextField from "../components/TextField";
import Form from "../components/Form";
import CheckboxField from "../components/CheckboxField";

// 공통된 부분을 찾는다
// 차이나는 부분을 찾고 이를 지운다
// 코드가 동작하도록 리펙토링

export type Info = {
  name: string;
  confirm: boolean;
  password: string;
  checked: boolean;
};

const defaultInfo: Info = {
  name: "",
  confirm: false,
  password: "",
  checked: false,
};

const defaultErrorInfo = Object.keys(defaultInfo).reduce((acc, key) => {
  acc[key as keyof ErrorInfo] = undefined;
  return acc;
}, {} as ErrorInfo);

export type ErrorInfo = { [key in keyof Info]: string | undefined };

export type PartialInfo = {
  [key in keyof Info]: Record<key, Info[key]>;
}[keyof Info];

export type PartialErrorInfo = {
  [key in keyof ErrorInfo]: Record<key, ErrorInfo[key]>;
}[keyof ErrorInfo];

export const InfoContext = createContext<{
  value: Info;
  setValue: (v: PartialInfo) => void;
  error: ErrorInfo;
  setError: (v: PartialErrorInfo) => void;
}>({
  value: defaultInfo,
  setValue: (v) => {},
  error: defaultErrorInfo,
  setError: (e) => {},
});

export default function LoginForm() {
  const [info, setInfo] = useReducer(
    (prevInfo: Info, partialInfo: PartialInfo) => {
      return {
        ...prevInfo,
        ...partialInfo,
      };
    },
    defaultInfo
  );

  const [error, setError] = useState<ErrorInfo>(defaultErrorInfo);

  const onSubmit = () => {
    if (Object.values(error).every((e) => e === undefined)) {
      alert(`name ${info.name}`);
    }
  };

  return (
    <InfoContext.Provider
      value={{
        value: info,
        setValue: setInfo,
        error,
        setError: (e) => setError((prev) => ({ ...prev, ...e })),
      }}
    >
      <Form onSubmit={onSubmit}>
        <TextField
          label='이름'
          source='name'
          validate={[minLength(2), maxLength(6)]}
        />
        <TextField
          label='비밀번호'
          source='password'
          validate={[minLength(6), maxLength(12)]}
        />
        <CheckboxField
          label='위 내용이 제출됩니다. 동의하십니까?'
          source='confirm'
          validate={[checked]}
        />
      </Form>
    </InfoContext.Provider>
  );
}
