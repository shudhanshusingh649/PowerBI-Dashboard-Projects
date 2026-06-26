from fastapi import FastAPI
from pydantic import BaseModel
import pandas as pd
import joblib

app = FastAPI(title="ISRO Climate Prediction API")

rainfall_model = joblib.load(
    r"C:\Users\HP\ISRO_Project\Models\rainfall_model.pkl"
)

max_temp_model = joblib.load(
    r"C:\Users\HP\ISRO_Project\Models\max_temperature_model.pkl"
)

min_temp_model = joblib.load(
    r"C:\Users\HP\ISRO_Project\Models\min_temperature_model.pkl"
)

# Home
@app.get("/")
def home():
    return {
        "message": "ISRO Climate Prediction API Running Successfully"
    }
class RainfallInput(BaseModel):
    Latitude: float
    Longitude: float
    Max_Temperature: float
    Min_Temperature: float
    Temp_Difference: float
    Rainfall: float
    Rainfall_Lag1: float
    Rainfall_Rolling3: float
    Rainfall_Rolling7: float
    MaxTemp_Lag1: float
    MinTemp_Lag1: float
    Year: int
    Month: int
    Season: int

# Rainfall Prediction API
@app.post("/predict/rainfall")
def predict_rainfall(data: RainfallInput):

    input_df = pd.DataFrame([{
        "Latitude": data.Latitude,
        "Longitude": data.Longitude,
        "Max_Temperature": data.Max_Temperature,
        "Min_Temperature": data.Min_Temperature,
        "Temp_Difference": data.Temp_Difference,
        "Rainfall": data.Rainfall,
        "Rainfall_Lag1": data.Rainfall_Lag1,
        "Rainfall_Rolling3": data.Rainfall_Rolling3,
        "Rainfall_Rolling7": data.Rainfall_Rolling7,
        "MaxTemp_Lag1": data.MaxTemp_Lag1,
        "MinTemp_Lag1": data.MinTemp_Lag1,
        "Year": data.Year,
        "Month": data.Month,
        "Season": data.Season
    }])

    prediction = rainfall_model.predict(input_df)

    return {
        "Predicted_Rainfall_Next_Day": float(prediction[0])
    }
    # Max Temp prediction API
class MaxTemperatureInput(BaseModel):
    Latitude: float
    Longitude: float
    Max_Temperature: float
    Min_Temperature: float
    Rainfall: float
    MaxTemp_Lag1: float
    Temp_Change: float
    Year: int
    Month: int
    Season: int


@app.post("/predict/max-temperature")
def predict_max_temperature(data: MaxTemperatureInput):

    input_df = pd.DataFrame([{
        "Latitude": data.Latitude,
        "Longitude": data.Longitude,
        "Max_Temperature": data.Max_Temperature,
        "Min_Temperature": data.Min_Temperature,
        "Rainfall": data.Rainfall,
        "MaxTemp_Lag1": data.MaxTemp_Lag1,
        "Temp_Change": data.Temp_Change,
        "Year": data.Year,
        "Month": data.Month,
        "Season": data.Season
    }])

    prediction = max_temp_model.predict(input_df)

    return {
        "Predicted_MaxTemp_Next_Day": float(prediction[0])
    }
    # Min Temp prediction API 
class MinTemperatureInput(BaseModel):
    Latitude: float
    Longitude: float
    Max_Temperature: float
    Min_Temperature: float
    Rainfall: float
    MinTemp_Lag1: float
    Temp_Change: float
    Year: int
    Month: int
    Season: int


@app.post("/predict/min-temperature")
def predict_min_temperature(data: MinTemperatureInput):

    input_df = pd.DataFrame([{
        "Latitude": data.Latitude,
        "Longitude": data.Longitude,
        "Max_Temperature": data.Max_Temperature,
        "Min_Temperature": data.Min_Temperature,
        "Rainfall": data.Rainfall,
        "MinTemp_Lag1": data.MinTemp_Lag1,
        "Temp_Change": data.Temp_Change,
        "Year": data.Year,
        "Month": data.Month,
        "Season": data.Season
    }])

    prediction = min_temp_model.predict(input_df)

    return {
        "Predicted_MinTemp_Next_Day": float(prediction[0])
    }