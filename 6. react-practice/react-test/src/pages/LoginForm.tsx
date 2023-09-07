import React, { createContext, useState, useReducer } from "react";
import { minLength, maxLength, checked } from "../validation";

import TextField from "../components/TextField";
import Form from "../components/Form";
import CheckboxField from "../components/CheckboxField";

// 공통된 부분을 찾는다
// 차이나는 부분을 찾고 이를 지운다
// 코드가 동작하도록 리펙토링

export type Info = {
  // 언제든지 원하는 요소를 추가할 수 있다.
  name: string;
  confirm: boolean;
  password: string;
  checked: boolean;
};

const defaultInfo: Info = {
  // Type Info 에 맞게 조정하기
  name: "",
  confirm: false,
  password: "",
  checked: false,
};

export type ErrorInfo = { [key in keyof Info]: string | undefined }; // 위 defaultErrorInfo 에 대한 타입

const defaultErrorInfo = Object.keys(defaultInfo).reduce((acc, key) => {
  // ['name','confirm','password','checked'].reduce
  acc[key as keyof ErrorInfo] = undefined; // ex) { name: undefined } ... reduce 로 합쳐감.
  return acc;
}, {} as ErrorInfo); // 초기값 {}

export type PartialInfo = {
  // reducer 를 통한 부분 객체 업데이트를 위한 부분 객체 타입. { name : string } | { }
  [key in keyof Info]: Record<key, Info[key]>;
}[keyof Info]; // 순회를 돌아주면서 PatialInfo 만들기

export type PartialErrorInfo = {
  // 마찬가지로 ErrorInfo 에 대한 부분 partial
  [key in keyof ErrorInfo]: Record<key, ErrorInfo[key]>;
}[keyof ErrorInfo];

export const InfoContext = createContext<{
  // ContextAPI 의 Store 부분
  value: Info; // 타입 지정
  setValue: (v: PartialInfo) => void;
  error: ErrorInfo; // 에러 지정
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
      // 초기 상태값에 변경사항인 partialInfo 를 적용하여 새로운 상태값 return
      return {
        ...prevInfo,
        ...partialInfo,
      };
    },
    defaultInfo
  );
  const [error, setError] = useReducer(
    (prevError: ErrorInfo, partialError: PartialErrorInfo) => {
      return {
        ...prevError,
        ...partialError,
      };
    },
    defaultErrorInfo
  );

  // const [error, setError] = useState<ErrorInfo>(defaultErrorInfo);

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
        error: error,
        setError: setError,
      }}
    >
      <Form onSubmit={onSubmit}>
        <TextField
          label='이름'
          source='name'
          validate={[minLength(2), maxLength(6)]} // validation 은 여러가지가 생성될 수 있다.
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
