import api from "./api";

export const predictAll = async (data) => {
    const res = await api.post("/predict/all", data);
    return res.data;
};

export const predictRainfall = async (data) => {
    const res = await api.post("/predict/rainfall", data);
    return res.data;
};

export const predictMaxTemperature = async (data) => {
    const res = await api.post("/predict/max-temperature", data);
    return res.data;
};

export const predictMinTemperature = async (data) => {
    const res = await api.post("/predict/min-temperature", data);
    return res.data;
};