import api from "./api";

export const healthCheck = () => api.get("/health");

export const predictAll = (data) =>
    api.post("/predict/all", data);

export const predictRainfall = (data) =>
    api.post("/predict/rainfall", data);

export const predictMaxTemp = (data) =>
    api.post("/predict/max-temperature", data);

export const predictMinTemp = (data) =>
    api.post("/predict/min-temperature", data);

export const getForecast = () =>
    api.get("/forecast");

export const getAnalytics = () =>
    api.get("/analytics");

export const getInsights = () =>
    api.get("/insights");