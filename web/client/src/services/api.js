import axios from "axios";

export default axios.create({
    baseURL: "https://urban-heat-platform-av05.onrender.com",
    headers: {
        "Content-Type": "application/json",
    },
});