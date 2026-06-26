from fastapi import FastAPI
from pydantic import BaseModel
import pandas as pd
import joblib
from pathlib import Path

# Base Path
BASE_DIR = Path(__file__).resolve().parent.parent

# FastAPI App
app = FastAPI(
    title="ISRO Climate Prediction API",
    description="Rainfall Prediction API",
    version="1.0"
)

# Load Models

rainfall_model = joblib.load(
    BASE_DIR / "Models" / "rainfall_model.pkl"
)

max_temp_model = joblib.load(
    BASE_DIR / "Models" / "max_temperature_model.pkl"
)

min_temp_model = joblib.load(
    BASE_DIR / "Models" / "min_temperature_model.pkl"
)
# Load Dataset
history_df = pd.read_csv(
    BASE_DIR / "Final_Dataset" / "climate_data_engineered.csv"
)

history_df["Date"] = pd.to_datetime(history_df["Date"])

# Home API
@app.get("/")
def home():
    return {
        "message": "ISRO Climate Prediction API Running Successfully"
    }

# Input Model
class RainfallInput(BaseModel):
    Latitude: float
    Longitude: float
    Date: str
    Max_Temperature: float
    Min_Temperature: float
    Rainfall: float
# Rainfall Prediction API
@app.post("/predict/rainfall")
def predict_rainfall(data: RainfallInput):

    input_date = pd.to_datetime(data.Date)

    year = input_date.year
    month = input_date.month

    # Season
    if month in [12, 1, 2]:
        season = 0
    elif month in [3, 4, 5]:
        season = 1
    elif month in [6, 7, 8, 9]:
        season = 2
    else:
        season = 3

    temp_difference = (
        data.Max_Temperature - data.Min_Temperature
    )
    history = history_df[
        (history_df["Latitude"] == data.Latitude) &
        (history_df["Longitude"] == data.Longitude)
    ]

    history = history[
        history["Date"] <= input_date
    ].sort_values("Date")

    if history.empty:
        history = history_df[
            (history_df["Latitude"] == data.Latitude) &
            (history_df["Longitude"] == data.Longitude)
        ].sort_values("Date")

    if history.empty:
        return {
            "success": False,
            "message": "No historical data found for this location."
        }

    latest = history.iloc[-1]

    input_df = pd.DataFrame([{
        "Latitude": data.Latitude,
        "Longitude": data.Longitude,
        "Max_Temperature": data.Max_Temperature,
        "Min_Temperature": data.Min_Temperature,
        "Temp_Difference": temp_difference,
        "Rainfall": data.Rainfall,
        "Rainfall_Lag1": latest["Rainfall_Lag1"],
        "Rainfall_Rolling3": latest["Rainfall_Rolling3"],
        "Rainfall_Rolling7": latest["Rainfall_Rolling7"],
        "MaxTemp_Lag1": latest["MaxTemp_Lag1"],
        "MinTemp_Lag1": latest["MinTemp_Lag1"],
        "Year": year,
        "Month": month,
        "Season": season
    }])

    prediction = rainfall_model.predict(input_df)

    return {
        "success": True,
        "location": {
            "Latitude": data.Latitude,
            "Longitude": data.Longitude
        },
        "date": data.Date,
        "prediction": {
            "Predicted_Rainfall_Next_Day": round(float(prediction[0]), 2),
            "unit": "mm"
        }
    }