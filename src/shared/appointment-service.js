import * as axios from "axios";
import { DateTime } from "luxon";
import { responseHandler } from "./response-handler";

const apiPath = import.meta.env.VITE_API;

const searchSlots = async function (query) {
  try {
    const response = await axios.get(apiPath + "/appointment/slots", {
      params: query,
    });
    return parseList(response);
  } catch (error) {
    return [];
  }
};

const verifyAppointment = async function (id, token, locale) {
  try {
    const response = await axios.get(
      apiPath + "/appointment/" + id + "/confirm/" + token,
      {
        headers: {
          "Accept-Language": `${locale}`,
        },
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

const saveAppointment = async function (appointment, locale) {
  try {
    convertDate(appointment);
    const response = await axios.post(apiPath + "/appointment", appointment, {
      headers: {
        "Accept-Language": `${locale}`,
      },
    });
    return responseHandler.handleResponse(response, 201);
  } catch (error) {
    return responseHandler.handleError(error);
  }
};

const saveAdminAppointment = async function (appointment, token) {
  try {
    convertDate(appointment);
    const response = await axios.post(
      apiPath + "/appointment/admin",
      appointment,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return responseHandler.handleResponse(response, 201);
  } catch (error) {
    return responseHandler.handleError(error);
  }
};

const getAppointments = async function (date, token) {
  try {
    const response = await axios.get(apiPath + "/appointment/date/" + date, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return parseList(response);
  } catch (error) {
    if (error.response.status === 403) {
      return error.response.status;
    }
    return [];
  }
};

const getAppointment = async function (appointmentId, token) {
  try {
    const response = await axios.get(
      apiPath + "/appointment/" + appointmentId,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
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

const updateAppointmentState = async function (
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
          Authorization: `Bearer ${token}`,
        },
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

const updateAppointment = async function (appointment, token, locale) {
  try {
    const response = await axios.put(apiPath + "/appointment/", appointment, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Accept-Language": `${locale}`,
      },
    });
    return responseHandler.handleResponse(response, 200);
  } catch (error) {
    return responseHandler.handleError(error);
  }
};

const updateAdminAppointment = async function (appointment, token) {
  try {
    const response = await axios.put(
      apiPath + "/appointment/admin",
      appointment,
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

const deleteAppointment = async function (appointmentId, token, locale) {
  try {
    const response = await axios.delete(
      apiPath + "/appointment/" + appointmentId,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Accept-Language": `${locale}`,
        },
      }
    );
    return responseHandler.handleResponse(response, 200);
  } catch (error) {
    return responseHandler.handleError(error);
  }
};

const getGroupSlots = async function (query, token) {
  try {
    const response = await axios.get(apiPath + "/appointment/groupslots", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: query,
    });
    return responseHandler.handleResponse(response, 200);
  } catch (error) {
    return responseHandler.handleError(error);
  }
};

const convertDate = (appointment) => {
  let parsedDateTime = DateTime.fromISO(
    appointment.selectedDate + "T" + appointment.selectedTime
  );
  appointment.date = parsedDateTime.toISO();
  delete appointment.selectedDate;
  delete appointment.selectedTime;
};

const parseList = (response) => {
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
  updateAdminAppointment,
  deleteAppointment,
  saveAdminAppointment,
  getGroupSlots,
};
