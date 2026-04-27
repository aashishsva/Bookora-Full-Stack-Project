import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/settings",
});

const authHeader = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export const getSettings = () =>
  API.get("/", authHeader());

export const saveSettings = (data) =>
  API.put("/", data, authHeader());