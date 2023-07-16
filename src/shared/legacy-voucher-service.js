import * as axios from "axios";
import { responseHandler } from "./response-handler";

const apiPath = process.env.VUE_APP_API;

const searchVoucher = async function (id, token) {
  try {
    const response = await axios.get(apiPath + "/legacy-voucher/" + id, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return responseHandler.handleResponse(response, 200);
  } catch (error) {
    return responseHandler.handleError(error);
  }
};

const redeemVoucher = async function (id, token) {
  try {
    const response = await axios.patch(
      apiPath + "/legacy-voucher/" + id + "/redeem",
      {},
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

export const legacyVoucherService = {
  searchVoucher,
  redeemVoucher,
};
