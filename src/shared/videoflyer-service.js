import * as axios from "axios";
import { responseHandler } from "./response-handler";

const apiPath = process.env.VUE_APP_API;

const addVideoflyer = async function (videoflyer, token) {
  try {
    const response = await axios.post(apiPath + "/videoflyer", videoflyer, {
      headers: {
        Authorization: `Bearer ${token}`, // send the access token through the 'Authorization' header
      },
    });
    return responseHandler.handleResponse(response, 201);
  } catch (error) {
    return responseHandler.handleError(error);
  }
};

const getVideoflyer = async function (token) {
  try {
    const response = await axios.get(apiPath + "/videoflyer", {
      headers: {
        Authorization: `Bearer ${token}`, // send the access token through the 'Authorization' header
      },
    });
    return responseHandler.handleResponse(response, 200);
  } catch (error) {
    return responseHandler.handleError(error);
  }
};

const getVideoflyerDetails = async function (videoflyerId, token) {
  try {
    const response = await axios.get(apiPath + "/videoflyer/" + videoflyerId, {
      headers: {
        Authorization: `Bearer ${token}`, // send the access token through the 'Authorization' header
      },
    });
    return responseHandler.handleResponse(response, 200);
  } catch (error) {
    return responseHandler.handleError(error);
  }
};

const updateVideoflyer = async function (videoflyer, token) {
  try {
    const response = await axios.put(
      apiPath + "/videoflyer/" + videoflyer.id,
      videoflyer,
      {
        headers: {
          Authorization: `Bearer ${token}`, // send the access token through the 'Authorization' header
        },
      }
    );
    return responseHandler.handleResponse(response, 200);
  } catch (error) {
    return responseHandler.handleError(error);
  }
};

const deleteVideoflyer = async function (id, token) {
  try {
    const response = await axios.delete(apiPath + "/videoflyer/" + id, {
      headers: {
        Authorization: `Bearer ${token}`, // send the access token through the 'Authorization' header
      },
    });
    return responseHandler.handleResponse(response, 200);
  } catch (error) {
    return responseHandler.handleError(error);
  }
};

const updateVideoflyerAssigments = async function (videoflyerDetails, token) {
  try {
    const response = await axios.patch(
      apiPath + "/videoflyer/" + videoflyerDetails.id + "/assign",
      videoflyerDetails,
      {
        headers: {
          Authorization: `Bearer ${token}`, // send the access token through the 'Authorization' header
        },
      }
    );
    return responseHandler.handleResponse(response, 200);
  } catch (error) {
    return responseHandler.handleError(error);
  }
};

export const videoflyerService = {
  addVideoflyer,
  getVideoflyer,
  updateVideoflyer,
  deleteVideoflyer,
  getVideoflyerDetails,
  updateVideoflyerAssigments,
};
