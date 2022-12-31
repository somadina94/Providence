import axios from "axios";

// const axiosInstance = axios.create({
//   baseURL: "http://127.0.0.1:5001/api/v1/",
// });

const axiosInstance = axios.create({
  baseURL: "https://api.provbm.com/api/v1/",
});

export const findUserById = async (id, jwt) => {
  try {
    const res = await axiosInstance({
      method: "GET",
      url: `users/${id}`,
      headers: {
        authorization: `Bearer ${jwt}`,
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
      url: "users/loginAdmin",
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

export const getAllUsers = async (jwt) => {
  try {
    const res = await axiosInstance({
      method: "GET",
      url: `users`,
      headers: {
        authorization: `Bearer ${jwt}`,
      },
    });
    return res.data;
  } catch (err) {
    return err.response.data;
  }
};

export const updateUserByAdmin = async (data, id, jwt) => {
  try {
    const res = await axiosInstance({
      method: "PATCH",
      url: `users/updateUser/${id}`,
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

export const createNewAccount = async (data, jwt) => {
  try {
    const res = await axiosInstance({
      method: "POST",
      url: `users`,
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

export const addTransaction = async (data, id, jwt) => {
  try {
    const res = await axiosInstance({
      method: "PATCH",
      url: `users/transactions/${id}`,
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

export const reverseTransaction = async (data, id, jwt) => {
  try {
    const res = await axiosInstance({
      method: "PATCH",
      url: `users/reversal/${id}`,
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

export const deleteTransaction = async (transId, id, jwt) => {
  try {
    const res = await axiosInstance({
      method: "DELETE",
      url: `users/transactions/${id}`,
      data: {
        transId: transId,
      },
      headers: {
        authorization: `Bearer ${jwt}`,
      },
    });
    return res.data;
  } catch (err) {
    return err.response.data;
  }
};

export const deactiveAccount = async (status, id, jwt) => {
  try {
    const res = await axiosInstance({
      method: "PATCH",
      url: `users/deactivate/${id}`,
      data: {
        status: status,
      },
      headers: {
        authorization: `Bearer ${jwt}`,
      },
    });
    return res.data;
  } catch (err) {
    return err.response.data;
  }
};

export const deleteAccount = async (id, jwt) => {
  try {
    const res = await axiosInstance({
      method: "DELETE",
      url: `users/${id}`,
      headers: {
        authorization: `Bearer ${jwt}`,
      },
    });
    return res.data;
  } catch (err) {
    return err.response.data;
  }
};
