import * as axios from "axios";
import { responseHandler } from "./response-handler";

const apiPath = import.meta.env.VITE_API;

const getJumpdays = async function (yearMonth, token) {
  try {
    const response = await axios.get(apiPath + "/jumpday", {
      headers: {
        Authorization: `Bearer ${token}`, // send the access token through the 'Authorization' header
      },
      params: { month: yearMonth },
    });
    return parseList(response);
  } catch (error) {
    if (error.response.status === 403) {
      return error.response.status;
    }
    return [];
  }
};

const addJumpday = async function (jumpday, token) {
  try {
    const response = await axios.post(
      apiPath + "/jumpday",
      createJumpday(jumpday),
      {
        headers: {
          Authorization: `Bearer ${token}`, // send the access token through the 'Authorization' header
        },
      }
    );
    return responseHandler.handleResponse(response, 201);
  } catch (error) {
    return responseHandler.handleError(error);
  }
};

const updateJumpday = async function (jumpday, token) {
  try {
    const response = await axios.put(
      apiPath + "/jumpday/" + jumpday.date,
      jumpday,
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

const deleteJumpday = async function (date, token) {
  try {
    const response = await axios.delete(apiPath + "/jumpday/" + date, {
      headers: {
        Authorization: `Bearer ${token}`, // send the access token through the 'Authorization' header
      },
    });
    return responseHandler.handleResponse(response, 200);
  } catch (error) {
    return responseHandler.handleError(error);
  }
};

const parseList = (response) => {
  if (response.status !== 200) {
    throw Error(response.message);
  }

  if (!response.data) return [];

  if (!response.data.success) {
    throw Error(response.data.message);
  }

  let list = response.data.payload;
  if (typeof list !== "object") {
    list = [];
  }
  return list;
};

const createJumpday = (jumpday) => {
  let newJumpday = {
    date: jumpday.date,
    jumping: jumpday.jumping,
    freeTimes: false,
    slots: [],
    tandemmaster: [],
    videoflyer: [],
  };
  jumpday.slots.forEach((s) => {
    newJumpday.slots.push({
      time: s.time,
      tandemTotal: s.tandemTotal,
      picOrVidTotal: s.picOrVidTotal,
      picAndVidTotal: s.picAndVidTotal,
      handcamTotal: s.handcamTotal,
      appointments: [],
      tandemBooked: 0,
      tandemAvailable: s.tandemTotal,
      picOrVidBooked: 0,
      picOrVidAvailable: s.picOrVidTotal,
      picAndVidBooked: 0,
      picAndVidAvailable: s.picAndVidTotal,
      handcamBooked: 0,
      handcamAvailable: s.handcamTotal,
    });
  });
  return newJumpday;
};

export const jumpdayService = {
  getJumpdays,
  addJumpday,
  updateJumpday,
  deleteJumpday,
};
