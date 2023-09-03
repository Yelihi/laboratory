import React, { createContext, useState } from "react";

import TextField from "../components/TextField";
import Form from "../components/Form";
import CheckboxField from "../components/CheckboxField";

// 공통된 부분을 찾는다
// 차이나는 부분을 찾고 이를 지운다
// 코드가 동작하도록 리펙토링

export type Info = {
  name: string;
  confirm: boolean;
};

const defaultInfo: Info = {
  name: "",
  confirm: false,
};

export const InfoContext = createContext({
  value: defaultInfo,
  setValue: (v: any) => {},
});

export default function LoginForm() {
  const [info, setInfo] = useState<Info>({
    name: "",
    confirm: false,
  });

  const onSubmit = () => {
    if (info.confirm) {
      alert(`name ${info.name}`);
    }
  };

  return (
    <InfoContext.Provider value={{ value: info, setValue: setInfo }}>
      <Form onSubmit={onSubmit}>
        <TextField label='이름' source='name' />
        <CheckboxField
          label='위 내용이 제출됩니다. 동의하십니까?'
          source='confirm'
        />
      </Form>
    </InfoContext.Provider>
  );
}
