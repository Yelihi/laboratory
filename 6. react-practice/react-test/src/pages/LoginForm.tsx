import React, { useState } from "react";

import TextField from "../components/TextField";
import Form from "../components/Form";
import CheckboxField from "../components/CheckboxField";

export default function LoginForm() {
  const [info, setInfo] = useState({
    name: "",
    confirm: false,
  });

  const onSubmit = () => {
    if (info.confirm) {
      alert(`name ${info.name}`);
    }
  };

  return (
    <Form onSubmit={onSubmit}>
      <TextField
        value={info.name}
        setValue={(v) => setInfo({ ...info, name: v })}
        label='이름'
      />
      <CheckboxField
        value={info.confirm}
        setValue={(v) => setInfo({ ...info, confirm: v })}
        label='위 내용이 제출됩니다. 동의하십니까?'
      />
    </Form>
  );
}
