import * as axios from "axios";
import { responseHandler } from "./response-handler";

const apiPath = process.env.VUE_APP_API;

const saveWaiver = async function (waiver) {
  try {
    const response = await axios.post(apiPath + "/waivers", waiver);
    return responseHandler.handleResponse(response, 201);
  } catch (error) {
    return responseHandler.handleError(error);
  }
};

const getWaiver = async function (token) {
  try {
    const response = await axios.get(apiPath + "/waivers", {
      headers: {
        Authorization: `Bearer ${token}`, // send the access token through the 'Authorization' header
      },
    });
    return responseHandler.handleResponse(response, 200);
  } catch (error) {
    return responseHandler.handleError(error);
  }
};

const updateWaiver = async function (waiver, token) {
  try {
    const response = await axios.put(apiPath + "/waivers", waiver, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return responseHandler.handleResponse(response, 200);
  } catch (error) {
    return responseHandler.handleError(error);
  }
};

export const waiverService = {
  saveWaiver,
  getWaiver,
  updateWaiver,
};
