import * as axios from "axios";
import { responseHandler } from "./response-handler";

const apiPath = process.env.VUE_APP_API;

const getUsers = async function (token) {
  try {
    const response = await axios.get(apiPath + "/users", {
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
};
