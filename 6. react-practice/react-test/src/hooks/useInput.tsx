import { useEffect, useContext, useState } from "react";
import {
  InfoContext,
  Info,
  PartialInfo,
  ErrorInfo,
  PartialErrorInfo,
} from "../pages/LoginForm";

type UseInput = {
  source: keyof Info;
  validate: any;
};

const useInput = ({ source, validate }: UseInput) => {
  const { value, setValue, error, setError } = useContext(InfoContext);

  useEffect(() => {
    const errors: ErrorInfo[] = validate.map((validationFunc: any) => {
      if (value[source] !== undefined) {
        return validationFunc(value[source]);
      }
    });
    const err = errors.find((error) => error); // undefined 가 아닌거 찾기
    setError({ [source]: err } as PartialErrorInfo);
  }, [value[source]]);

  const onChange = (v: any) => {
    setValue({ [source]: v } as PartialInfo);
  };

  return { error: error[source], value: value[source], onChange };
};

export default useInput;
