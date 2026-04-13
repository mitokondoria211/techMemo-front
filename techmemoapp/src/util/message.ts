export const validationMinMessage = (label: string, min: number) => {
  return `${label}は${min}文字以上にしてください`;
};
export const validationMaxMessage = (label: string, max: number) => {
  return `${label}は${max}文字以内にしてください`;
};
export const validationSizeMessage = (
  label: string,
  min: number,
  max: number,
) => {
  return `${label}は${min}文字以上${max}文字以内にしてください`;
};

export const validationRequiredMessaege = (label: string) => {
  return `${label}は必須です`;
};
