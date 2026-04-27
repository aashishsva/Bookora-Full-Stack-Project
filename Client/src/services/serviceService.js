import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/services",
});

const authHeader = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export const getServices = () =>
  API.get("/", authHeader());

export const createService = (data) =>
  API.post("/", data, authHeader());

export const updateService = (id, data) =>
  API.put(`/${id}`, data, authHeader());

export const deleteService = (id) =>
  API.delete(`/${id}`, authHeader());