import * as axios from "axios";
import { responseHandler } from "./response-handler";

const apiPath = import.meta.env.VITE_API;

const getSettings = async function (token) {
  try {
    const response = await axios.get(apiPath + "/settings", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return responseHandler.handleResponse(response, 200);
  } catch (error) {
    return responseHandler.handleError(error);
  }
};

const getCommonSettings = async function (locale) {
  try {
    const response = await axios.get(apiPath + "/settings/common", {
      headers: {
        "Accept-Language": `${locale}`,
      },
    });
    return responseHandler.handleResponse(response, 200);
  } catch (error) {
    return responseHandler.handleError(error);
  }
};

const saveSettings = async function (settings, token) {
  try {
    const response = await axios.post(apiPath + "/settings", settings, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return responseHandler.handleResponse(response, 201);
  } catch (error) {
    return responseHandler.handleError(error);
  }
};

const updateSettings = async function (settings, token) {
  try {
    const response = await axios.put(
      apiPath + "/settings/" + settings.id,
      settings,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return responseHandler.handleResponse(response, 200);
  } catch (error) {
    return responseHandler.handleError(error);
  }
};

export const settingsService = {
  getSettings,
  getCommonSettings,
  saveSettings,
  updateSettings,
};
