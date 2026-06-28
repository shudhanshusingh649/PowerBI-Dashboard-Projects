import axios from "axios";

const api = axios.create({
    baseURL: "https://urban-heat-platform-av05.onrender.com",
    headers: {
        "Content-Type": "application/json",
    },
});

export default api;