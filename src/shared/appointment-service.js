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

const verifyAppointment = async function(id, token, locale) {
  try {
    const response = await axios.get(
      apiPath + "/appointment/" + id + "/confirm/" + token,
      {
        headers: {
          "Accept-Language": `${locale}`
        }
      }
    );
    if (!response.data.success) {
      return response.data.message;
    }
    return "";
  } catch (error) {
    return error.response.data.message;
  }
};

const saveAppointment = async function(appointment, locale) {
  try {
    convertDate(appointment);
    const response = await axios.post(apiPath + "/appointment", appointment, {
      headers: {
        "Accept-Language": `${locale}`
      }
    });
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

const getAppointment = async function(appointmentId, token) {
  try {
    const response = await axios.get(
      apiPath + "/appointment/" + appointmentId,
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
    return response.data.payload;
  } catch (error) {
    if (error?.response?.status === 403) {
      return error.response.status;
    }
    return error;
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

const updateAppointment = async function(appointment, token, locale) {
  try {
    const response = await axios.put(apiPath + "/appointment/", appointment, {
      headers: {
        Authorization: `Bearer ${token}`, // send the access token through the 'Authorization' header
        "Accept-Language": `${locale}`
      }
    });
    if (response.status !== 200) throw Error(response.data.message);
    if (!response.data.success) {
      throw Error(response.data.message);
    }
    return response.data;
  } catch (error) {
    error = {
      success: false,
      message: error
    };
    if (error.response?.data?.message) {
      error.message = error.response.data.message;
    }
    return error;
  }
};

const deleteAppointment = async function(appointmentId, token, locale) {
  try {
    const response = await axios.delete(
      apiPath + "/appointment/" + appointmentId,
      {
        headers: {
          Authorization: `Bearer ${token}`, // send the access token through the 'Authorization' header
          "Accept-Language": `${locale}`
        }
      }
    );
    if (response.status !== 200) throw Error(response.data.message);
    if (!response.data.success) {
      throw Error(response.data.message);
    }
    return response.data;
  } catch (error) {
    error = {
      success: false,
      message: error
    };
    if (error.response?.data?.message) {
      error.message = error.response.data.message;
    }
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

export const appointmentService = {
  searchSlots,
  saveAppointment,
  verifyAppointment,
  getAppointment,
  getAppointments,
  updateAppointmentState,
  updateAppointment,
  deleteAppointment
};
