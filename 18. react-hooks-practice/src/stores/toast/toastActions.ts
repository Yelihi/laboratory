import { type, Action, Toast } from "./toastTypes";

/**
 * @description 토스트 추가
 * @param toast - 추가할 토스트 정보
 */
export const addToast = (toast: Toast): Action => {
  return { type: type.ADD_TOAST, payload: toast };
};

/**
 * @description 토스트 삭제
 * @param id - 삭제할 토스트의 ID
 */
export const removeToast = (id: number): Action => {
  return { type: type.REMOVE_TOAST, payload: id };
};
