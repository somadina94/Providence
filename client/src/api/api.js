import axios from "axios";

// const axiosInstance = axios.create({
//   baseURL: "http://127.0.0.1:5001/api/v1/",
// });

const axiosInstance = axios.create({
  baseURL: "https://api.provbm.com/api/v1/",
});

export const verifyLogin = async (answer) => {
  try {
    const res = await axiosInstance({
      method: "POST",
      url: "users/verification",
      data: {
        securityAnswer: answer,
      },
    });
    return res.data;
  } catch (err) {
    return err.response.data;
  }
};

export const loginUser = async (username, pin) => {
  try {
    const res = await axiosInstance({
      method: "POST",
      url: "users/login",
      data: {
        username,
        pin,
      },
    });
    return res.data;
  } catch (err) {
    return err.response.data;
  }
};

export const sendSecurityCode = async (jwt) => {
  try {
    const res = await axiosInstance({
      method: "PATCH",
      url: `users/transferToken`,
      headers: {
        authorization: `Bearer ${jwt}`,
      },
    });
    return res.data;
  } catch (err) {
    return err.response.data;
  }
};

export const completeTransfer = async (data, jwt) => {
  try {
    const res = await axiosInstance({
      method: "POST",
      url: `users/localTransfer`,
      data: data,
      headers: {
        authorization: `Bearer ${jwt}`,
      },
    });
    return res.data;
  } catch (err) {
    return err.response.data;
  }
};

export const completeIntTransfer = async (data, jwt) => {
  try {
    const res = await axiosInstance({
      method: "POST",
      url: `users/internationalTransfer`,
      data: data,
      headers: {
        authorization: `Bearer ${jwt}`,
      },
    });
    return res.data;
  } catch (err) {
    return err.response.data;
  }
};

export const getMe = async (jwt) => {
  try {
    const res = await axiosInstance({
      method: "GET",
      url: `users/me`,
      headers: {
        authorization: `Bearer ${jwt}`,
      },
    });
    return res.data;
  } catch (err) {
    throw err;
  }
};

export const forgotPin = async (data) => {
  try {
    const res = await axiosInstance({
      method: "POST",
      url: `users/forgotPin`,
      data,
    });
    return res.data;
  } catch (err) {
    throw err;
  }
};

export const resetPin = async (data, token) => {
  try {
    const res = await axiosInstance({
      method: "PATCH",
      url: `users/resetPin/${token}`,
      data,
    });
    return res.data;
  } catch (err) {
    return err.response.data;
  }
};

export const logout = async () => {
  try {
    const res = await axiosInstance({
      method: "GET",
      url: `users/logout`,
    });
    return res.data;
  } catch (err) {
    return err.response.data;
  }
};

export const updateSettings = async (data, type, jwt) => {
  let url;
  if (type === "pin") {
    url = "users/updateMyPin";
  } else if (type === "data") {
    url = "users/updateMe";
  }
  try {
    const res = await axiosInstance({
      method: "PATCH",
      url,
      data,
      headers: {
        authorization: `Bearer ${jwt}`,
      },
    });
    return res.data;
  } catch (err) {
    return err.response.data;
  }
};
