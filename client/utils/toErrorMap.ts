import { FieldError } from "../generated/graphql";

// export const toErrorMap = (
//   errors: FieldError[],
//   setError: (
//     fieldName: keyof T,
//     error: { type: string; message: string }
//   ) => void
// ) => {
//   const errorMap: Record<string, object> = {};
//   errors.forEach(({ field, message }) => {
//     errorMap[field] = {
//       type: "server",
//       message,
//     };
//   });

//   return errorMap;
// };

// setError(err.field, { message: err.message });

export function toErrorMap<T>(
  errors: FieldError[],
  setError: (
    fieldName: keyof T,
    error: { type: string; message: string }
  ) => void
) {
  return errors.forEach(({ field, message }) => {
    setError(field as keyof T, { type: "server", message: message });
  });
}
