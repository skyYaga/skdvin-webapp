import * as axios from "axios";
import moment from "moment";

const apiPath = process.env.VUE_APP_API;

const searchSlots = async function(query) {
  try {
    const response = await axios.get(apiPath + "/appointment/slots", {
      params: query
    });
    return parseList(response);
  } catch (error) {
    return [];
  }
};

const verifyAppointment = async function(id, token) {
  try {
    const response = await axios.get(
      apiPath + "/appointment/" + id + "/confirm/" + token
    );
    if (!response.data.success) {
      return response.data.message;
    }
    return "";
  } catch (error) {
    return error.response.data.message;
  }
};

const saveAppointment = async function(appointment) {
  try {
    convertDate(appointment);
    const response = await axios.post(apiPath + "/appointment", appointment);
    if (response.status !== 201) throw Error(response.data.message);
    if (!response.data.success) {
      throw Error(response.data.message);
    }
    return "";
  } catch (error) {
    return error;
  }
};

const getAppointments = async function(date, token) {
  try {
    const response = await axios.get(apiPath + "/appointment/date/" + date, {
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

const updateAppointmentState = async function(
  appointmentId,
  appointmentState,
  token
) {
  try {
    const response = await axios.patch(
      apiPath + "/appointment/" + appointmentId,
      appointmentState,
      {
        headers: {
          Authorization: `Bearer ${token}` // send the access token through the 'Authorization' header
        }
      }
    );
    if (response.status !== 200) throw Error(response.data.message);
    if (!response.data.success) {
      throw Error(response.data.message);
    }
    return "";
  } catch (error) {
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
  verifyAppointment,
  getAppointments,
  updateAppointmentState
};
