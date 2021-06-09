import * as axios from "axios";
import { responseHandler } from "./response-handler";

const apiPath = process.env.VUE_APP_API;

const getUsers = async function (page, itemsPerPage, token) {
  try {
    const response = await axios.get(apiPath + "/users", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        page: page,
        per_page: itemsPerPage,
      },
    });
    return responseHandler.handleResponse(response, 200);
  } catch (error) {
    return responseHandler.handleError(error);
  }
};

const updateUser = async function (user, token) {
  try {
    const response = await axios.put(apiPath + "/users", user, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return responseHandler.handleNoContent(response);
  } catch (error) {
    return responseHandler.handleError(error);
  }
};

const getRoles = async function (token) {
  try {
    const response = await axios.get(apiPath + "/users/roles", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return responseHandler.handleResponse(response, 200);
  } catch (error) {
    return responseHandler.handleError(error);
  }
};

export const userService = {
  getUsers,
  updateUser,
  getRoles,
};
