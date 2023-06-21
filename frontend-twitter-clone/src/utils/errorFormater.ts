export const formatErrorMessage = (error: any): string => {
  const err = error?.response?.data;
  if (err?.message) {
    return err.message;
  }
  if (err?.data?.errors?.detail && typeof err?.data?.errors?.detail === 'string') {
    return err?.data?.errors?.detail;
  }
  if (err?.errors?.[0] && typeof err?.errors?.[0] === 'object') {
    return err?.errors?.[0].detail;
  }
  if (err?.data?.errors?.detail && typeof err?.data?.errors?.detail === 'object') {
    const errorObject = err?.data?.errors?.detail;
    let message = '';
    Object.keys(errorObject).forEach((key) => {
      message += `${key} ${errorObject[key][0]} `;
    });
    return message;
  }
  return error.message;
};
