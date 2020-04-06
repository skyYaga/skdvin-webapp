import * as axios from "axios";
import { responseHandler } from "./response-handler";

const apiPath = process.env.VUE_APP_API;

const addTandemmaster = async function (tandemmaster, token) {
  try {
    const response = await axios.post(apiPath + "/tandemmaster", tandemmaster, {
      headers: {
        Authorization: `Bearer ${token}`, // send the access token through the 'Authorization' header
      },
    });
    return responseHandler.handleResponse(response, 201);
  } catch (error) {
    return responseHandler.handleError(error);
  }
};

const getTandemmaster = async function (token) {
  try {
    const response = await axios.get(apiPath + "/tandemmaster", {
      headers: {
        Authorization: `Bearer ${token}`, // send the access token through the 'Authorization' header
      },
    });
    return responseHandler.handleResponse(response, 200);
  } catch (error) {
    return responseHandler.handleError(error);
  }
};

const getTandemmasterDetails = async function (tandemmasterId, token) {
  try {
    const response = await axios.get(
      apiPath + "/tandemmaster/" + tandemmasterId,
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

const updateTandemmaster = async function (tandemmaster, token) {
  try {
    const response = await axios.put(
      apiPath + "/tandemmaster/" + tandemmaster.id,
      tandemmaster,
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

const deleteTandemmaster = async function (id, token) {
  try {
    const response = await axios.delete(apiPath + "/tandemmaster/" + id, {
      headers: {
        Authorization: `Bearer ${token}`, // send the access token through the 'Authorization' header
      },
    });
    return responseHandler.handleResponse(response, 200);
  } catch (error) {
    return responseHandler.handleError(error);
  }
};

const updateTandemmasterAssigments = async function (
  tandemmasterDetails,
  token
) {
  try {
    const response = await axios.patch(
      apiPath + "/tandemmaster/" + tandemmasterDetails.id + "/assign",
      tandemmasterDetails,
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

export const tandemmasterService = {
  addTandemmaster,
  getTandemmaster,
  updateTandemmaster,
  deleteTandemmaster,
  getTandemmasterDetails,
  updateTandemmasterAssigments,
};
