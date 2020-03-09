import * as axios from "axios";
import Vue from "vue";
import moment from "moment";

const searchSlots = async function(query) {
  try {
    const response = await axios.get("/api/appointment/slots", {
      params: query
    });
    return parseList(response);
  } catch (error) {
    console.error(error);
    return [];
  }
};

const verifyAppointment = async function(id, token) {
  try {
    const response = await axios.get(
      "/api/appointment/" + id + "/confirm/" + token
    );
    if (!response.data.success) {
      return response.data.message;
    }
    return "";
  } catch (error) {
    console.error(error);
    console.error(error.response.data.message);
    return error.response.data.message;
  }
};

const saveAppointment = async function(appointment) {
  try {
    convertDate(appointment);
    const response = await axios.post("/api/appointment", appointment);
    if (response.status !== 201) throw Error(response.data.message);
    if (!response.data.success) {
      throw Error(response.data.message);
    }
    return "";
  } catch (error) {
    console.error(error);
    return error;
  }
};

const convertDate = appointment => {
  let parsedMoment = moment(
    appointment.selectedDate + appointment.selectedTime,
    "YYYY-MM-DD HH:mm"
  );
  appointment.date = parsedMoment.format("YYYY-MM-DDTHH:mm:ss");
  delete appointment.selectedDate;
  delete appointment.selectedTime;
};

const parseList = response => {
  if (response.status !== 200) {
    throw Error(response.message);
  }

  if (!response.data) return [];

  if (!response.data.success) {
    return [];
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

export const appointmentService = {
  searchSlots,
  saveAppointment,
  verifyAppointment
};
