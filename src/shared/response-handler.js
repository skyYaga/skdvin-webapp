const handleError = (error) => {
  let localError = {
    success: false,
    message: error,
  };
  if (error.response?.data?.message) {
    localError.message = error.response.data.message;
  }
  return localError;
};

const handleResponse = (response, code) => {
  if (response.status !== code) throw Error(response.data.message);
  if (!response.data.success) {
    throw Error(response.data.message);
  }
  return response.data;
};

const handleNoContent = (response) => {
  if (response.status !== 204) throw Error(response.data.message);
  return response.data;
};

export const responseHandler = {
  handleError,
  handleResponse,
  handleNoContent,
};
