import axios from "axios";
import Config from "./Config";

export const markRecevied = (data) => {
  return new Promise((resolve, reject) => {
    return axios
      .post(`${Config.host}${Config.port}/delivery/received`, data)
      .then((result) => {
        console.log(result.data);
        resolve({ code: 200, message: result.data.message });
      })
      .catch((err) => {
        reject({ code: 0, error: err });
      });
  });
};

export const getAllOrdersWithDelivery = () => {
  return new Promise((resolve, reject) => {
    return axios
      .get(`${Config.host}${Config.port}/delivery/GetAll/`)
      .then((result) => {
        if ((result.data.code = 200)) {
          resolve(result.data.data);
        } else {
          resolve([]);
        }
      })
      .catch((err) => {
        reject(err);
      });
  });
};
