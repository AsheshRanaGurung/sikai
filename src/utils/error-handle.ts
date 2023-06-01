import { toastFail } from "@sikaai/service/service-toast";
import { get } from "lodash";
import { FieldError } from "react-hook-form";

export interface ResponseData {
  errors?: { [key: string]: string[] }[];
  message: string;
}

export interface ErrorResponseData {
  data: ResponseData;
}

interface IFlattenedObject {
  [key: string]: string[] | IFlattenedObject;
}

export function flattenObject(
  obj: IFlattenedObject | undefined,
  prefix = ""
): IFlattenedObject | undefined {
  if (obj) {
    return Object.keys(obj).reduce((acc: IFlattenedObject, key: string) => {
      const pre = prefix.length ? prefix + "." : "";
      if (typeof obj[key] === "object" && obj[key] !== null) {
        Object.assign(
          acc,
          flattenObject(obj[key] as IFlattenedObject, pre + key)
        );
      } else {
        acc[pre + key] = obj[key];
      }
      return acc;
    }, {});
  } else {
    return undefined;
  }
}

type SetFieldError<T> = (name: T, error: FieldError) => void;

export function responseErrorHandler<T>(
  res: ErrorResponseData,
  setError?: SetFieldError<T>
) {
  const flatObject = flattenObject(res?.data.errors?.[0]);
  if (res && res.data && res.data.errors && res.data.errors[0] && flatObject) {
    // set error in field
    if (setError) {
      Object.keys(flatObject).forEach((key: string) => {
        const errors = res.data.errors?.[0] ?? {};
        const error: FieldError = {
          message: get(errors, key).toString(),
          type: "required",
        };
        setError(key as T, error);
      });
      return;
    } else {
      const errorResponse = get(
        res.data.errors[0],
        Object.keys(res.data.errors[0])[0]
      );
      return toastFail(errorResponse as unknown as string);
    }
    // fire alert
  } else if (res && res.data && res.data.message) {
    return toastFail(res.data.message);
  }

  if (res && res.data && res.data.message) {
    return toastFail(res.data.message);
  }

  return toastFail("Something went wrong, please try again.");
}
