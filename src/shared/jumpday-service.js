import * as axios from "axios";

const apiPath = process.env.VUE_APP_API;

const getJumpdays = async function(token) {
  try {
    const response = await axios.get(apiPath + "/jumpday", {
      headers: {
        Authorization: `Bearer ${token}` // send the access token through the 'Authorization' header
      }
    });
    return parseList(response);
  } catch (error) {
    if (error.response.status === 403) {
      return error.response.status;
    }
    return [];
  }
};

const addJumpday = async function(jumpday, token) {
  try {
    const response = await axios.post(
      apiPath + "/jumpday",
      createJumpday(jumpday),
      {
        headers: {
          Authorization: `Bearer ${token}` // send the access token through the 'Authorization' header
        }
      }
    );
    return parseItem(response, 201);
  } catch (error) {
    return null;
  }
};

const parseList = response => {
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

export const parseItem = (response, code) => {
  if (response.status !== code) throw Error(response.message);
  if (!response.data.success) {
    throw Error(response.data.message);
  }
  let item = response.data.payload;
  if (typeof item !== "object") {
    item = undefined;
  }
  return item;
};

const createJumpday = jumpday => {
  let newJumpday = {
    date: jumpday.date,
    jumping: jumpday.jumping,
    freeTimes: false,
    slots: [],
    tandemmaster: [],
    videoflyer: []
  };
  jumpday.slots.forEach(s => {
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
      handcamAvailable: s.handcamTotal
    });
  });
  return newJumpday;
};

export const jumpdayService = {
  getJumpdays,
  addJumpday
};
