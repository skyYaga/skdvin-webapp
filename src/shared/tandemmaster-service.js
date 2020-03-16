import * as axios from "axios";

const apiPath = process.env.VUE_APP_API;

const addTandemmaster = async function(tandemmaster, token) {
  try {
    const response = await axios.post(apiPath + "/tandemmaster", tandemmaster, {
      headers: {
        Authorization: `Bearer ${token}` // send the access token through the 'Authorization' header
      }
    });
    return handleResponse(response, 201);
  } catch (error) {
    return handleError(error);
  }
};

const getTandemmaster = async function(token) {
  try {
    const response = await axios.get(apiPath + "/tandemmaster", {
      headers: {
        Authorization: `Bearer ${token}` // send the access token through the 'Authorization' header
      }
    });
    return handleResponse(response, 200);
  } catch (error) {
    return handleError(error);
  }
};

const updateTandemmaster = async function(tandemmaster, token) {
  try {
    const response = await axios.put(
      apiPath + "/tandemmaster/" + tandemmaster.id,
      tandemmaster,
      {
        headers: {
          Authorization: `Bearer ${token}` // send the access token through the 'Authorization' header
        }
      }
    );
    return handleResponse(response, 200);
  } catch (error) {
    return handleError(error);
  }
};

const deleteTandemmaster = async function(id, token) {
  try {
    const response = await axios.delete(apiPath + "/tandemmaster/" + id, {
      headers: {
        Authorization: `Bearer ${token}` // send the access token through the 'Authorization' header
      }
    });
    return handleResponse(response, 200);
  } catch (error) {
    return handleError(error);
  }
};

const handleError = error => {
  let localError = {
    success: false,
    message: error
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

export const tandemmasterService = {
  addTandemmaster,
  getTandemmaster,
  updateTandemmaster,
  deleteTandemmaster
};
