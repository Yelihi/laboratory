import React, { useState, useCallback } from "react";

const useInput = () => {
  const [value, setValue] = useState("");

  const onInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value);
    },
    []
  );

  return [value, setValue, onInputChange] as const;
};

export default useInput;
