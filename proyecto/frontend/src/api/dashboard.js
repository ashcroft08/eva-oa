import axios from "./axios";

export const getDashboardRequest = () => axios.get("/dashboard")