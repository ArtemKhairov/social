export type FieldValidatorType = (value: string) => string | undefined
export const required:FieldValidatorType = (value) => {
  if (value) return undefined;

  return "Поле не может быть пустым";
}

export const maxLengthCreator = (maxLength:number):FieldValidatorType => (value) => {
  if (value.length > maxLength) return `Максимальная длина ${maxLength} символов`;
  return undefined;
}