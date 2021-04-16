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

export const waiverService = {
  saveWaiver,
};
