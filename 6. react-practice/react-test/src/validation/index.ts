export function minLength(length: number) {
  return (v: string) => {
    return v.length < length ? `${length}자 이상 입력해주세요` : undefined;
  };
}

export function maxLength(length: number) {
  return (v: string) => {
    return v.length > length ? `${length}자 이하 입력해주세요` : undefined;
  };
}

export function checked(checked: boolean) {
  return checked ? undefined : "반드시 체크해주세요";
}
