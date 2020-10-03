import axios from "axios";
import Config from "./Config";

export const addDelivery = (data, token) => {
  return new Promise((resolve, reject) => {
    return axios
      .post(`${Config.host}${Config.port}/delivery/add`, data)
      .then((result) => {
        console.log(result.data);
        resolve({ code: 200, message: result.data.message });
      })
      .catch((err) => {
        reject({ code: 0, error: err });
      });
  });
};
