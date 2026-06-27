from fastapi import FastAPI
from pydantic import BaseModel, Field
import joblib
import pandas as pd
import numpy as np
from pathlib import Path
from fastapi import HTTPException
import traceback
BASE_DIR = Path(__file__).resolve().parent.parent
app = FastAPI(
    title="ISRO Climate Prediction API",
    description="Climate Prediction using XGBoost Models",
    version="3.0"
)
rainfall_model = joblib.load(
    BASE_DIR / "Models" / "rainfall_model.pkl"
)

max_temp_model = joblib.load(
    BASE_DIR / "Models" / "max_temperature_model.pkl"
)

min_temp_model = joblib.load(
    BASE_DIR / "Models" / "min_temperature_model.pkl"
)
print(type(rainfall_model))
print(type(max_temp_model))
print(type(min_temp_model))
@app.get("/")
def home():

    return {

        "Project": "ISRO Climate Prediction API",

        "Status": "Running Successfully",

        "Models": [

            "Rainfall",

            "Maximum Temperature",

            "Minimum Temperature"

        ]
    }
class ClimateInput(BaseModel):

    Latitude: float = Field(
        ...,
        ge=-90,
        le=90,
        description="Latitude must be between -90 and 90"
    )

    Longitude: float = Field(
        ...,
        ge=-180,
        le=180,
        description="Longitude must be between -180 and 180"
    )

    Date: str = Field(
        ...,
        description="Format: YYYY-MM-DD"
    )

    Max_Temperature: float = Field(
        ...,
        ge=-50,
        le=60,
        description="Maximum Temperature in °C"
    )

    Min_Temperature: float = Field(
        ...,
        ge=-60,
        le=50,
        description="Minimum Temperature in °C"
    )

    Rainfall: float = Field(
        ...,
        ge=0,
        le=1000,
        description="Rainfall in mm"
    )
def create_features(data: ClimateInput):

    input_date = pd.to_datetime(data.Date)

    year = input_date.year
    month = input_date.month
    day = input_date.day
    day_of_year = input_date.dayofyear

    if month in [12, 1, 2]:
        season = 0
    elif month in [3, 4, 5]:
        season = 1
    elif month in [6, 7, 8, 9]:
        season = 2
    else:
        season = 3

    temp_difference = (
        data.Max_Temperature -
        data.Min_Temperature
    )

    avg_temperature = (
        data.Max_Temperature +
        data.Min_Temperature
    ) / 2

    temp_range = temp_difference

    month_sin = np.sin(
        2 * np.pi * month / 12
    )

    month_cos = np.cos(
        2 * np.pi * month / 12
    )

    day_sin = np.sin(
        2 * np.pi * day_of_year / 365
    )

    day_cos = np.cos(
        2 * np.pi * day_of_year / 365
    )

    latitude_square = data.Latitude ** 2

    longitude_square = data.Longitude ** 2

    lat_long = (
        data.Latitude *
        data.Longitude
    )

    monsoon = 1 if month in [6,7,8,9] else 0

    return pd.DataFrame([{

        "Latitude": data.Latitude,

        "Longitude": data.Longitude,

        "Max_Temperature": data.Max_Temperature,

        "Min_Temperature": data.Min_Temperature,

        "Rainfall": data.Rainfall,

        "Year": year,

        "Month": month,

        "Day": day,

        "DayOfYear": day_of_year,

        "Season": season,

        "Temp_Difference": temp_difference,

        "Avg_Temperature": avg_temperature,

        "Temp_Range": temp_range,

        "Month_sin": month_sin,

        "Month_cos": month_cos,

        "Day_sin": day_sin,

        "Day_cos": day_cos,

        "Latitude_Square": latitude_square,

        "Longitude_Square": longitude_square,

        "Lat_Long": lat_long,

        "Monsoon": monsoon

    }])
@app.post("/predict/rainfall", tags=["Prediction"])
def predict_rainfall(data: ClimateInput):

    try:

        df = create_features(data)

        rainfall_features = df[[
            "Latitude",
            "Longitude",
            "Max_Temperature",
            "Min_Temperature",
            "Year",
            "Month",
            "Day",
            "DayOfYear",
            "Season",
            "Temp_Difference",
            "Avg_Temperature",
            "Temp_Range",
            "Month_sin",
            "Month_cos",
            "Day_sin",
            "Day_cos",
            "Latitude_Square",
            "Longitude_Square",
            "Lat_Long",
            "Monsoon"
        ]]

        prediction = rainfall_model.predict(rainfall_features)[0]

        return {
            "status": "success",
            "Predicted_Rainfall_Next_Day": round(float(prediction), 2),
            "Unit": "mm"
        }

    except Exception as e:

        print(traceback.format_exc())

        raise HTTPException(
            status_code=500,
            detail=str(e)
        )
    
# MAXIMUM TEMPERATURE PREDICTION API
@app.post("/predict/max-temperature", tags=["Prediction"])
def predict_max_temperature(data: ClimateInput):

    try:

        df = create_features(data)

        temperature_features = df[[
            "Latitude",
            "Longitude",
            "Max_Temperature",
            "Min_Temperature",
            "Rainfall",
            "Year",
            "Month",
            "Day",
            "DayOfYear",
            "Season",
            "Temp_Difference",
            "Avg_Temperature",
            "Temp_Range",
            "Month_sin",
            "Month_cos",
            "Day_sin",
            "Day_cos",
            "Latitude_Square",
            "Longitude_Square",
            "Lat_Long",
            "Monsoon"
        ]]

        prediction = max_temp_model.predict(temperature_features)[0]

        return {
            "status": "success",
            "Predicted_Max_Temperature_Next_Day": round(float(prediction), 2),
            "Unit": "°C"
        }

    except Exception as e:

        print(traceback.format_exc())

        raise HTTPException(
            status_code=500,
            detail=str(e)
        )

# MINIMUM TEMPERATURE PREDICTION API
@app.post("/predict/min-temperature", tags=["Prediction"])
def predict_min_temperature(data: ClimateInput):

    try:

        df = create_features(data)

        temperature_features = df[[
            "Latitude",
            "Longitude",
            "Max_Temperature",
            "Min_Temperature",
            "Rainfall",
            "Year",
            "Month",
            "Day",
            "DayOfYear",
            "Season",
            "Temp_Difference",
            "Avg_Temperature",
            "Temp_Range",
            "Month_sin",
            "Month_cos",
            "Day_sin",
            "Day_cos",
            "Latitude_Square",
            "Longitude_Square",
            "Lat_Long",
            "Monsoon"
        ]]

        prediction = min_temp_model.predict(temperature_features)[0]

        return {
            "status": "success",
            "Predicted_Min_Temperature_Next_Day": round(float(prediction), 2),
            "Unit": "°C"
        }

    except Exception as e:

        print(traceback.format_exc())

        raise HTTPException(
            status_code=500,
            detail=str(e)
        )

# ALL CLIMATE PREDICTION API
@app.post("/predict/all")
def predict_all(data: ClimateInput):

    df = create_features(data)

    rainfall_features = df[[
        "Latitude",
        "Longitude",
        "Max_Temperature",
        "Min_Temperature",
        "Year",
        "Month",
        "Day",
        "DayOfYear",
        "Season",
        "Temp_Difference",
        "Avg_Temperature",
        "Temp_Range",
        "Month_sin",
        "Month_cos",
        "Day_sin",
        "Day_cos",
        "Latitude_Square",
        "Longitude_Square",
        "Lat_Long",
        "Monsoon"
    ]]

    temperature_features = df[[
        "Latitude",
        "Longitude",
        "Max_Temperature",
        "Min_Temperature",
        "Rainfall",
        "Year",
        "Month",
        "Day",
        "DayOfYear",
        "Season",
        "Temp_Difference",
        "Avg_Temperature",
        "Temp_Range",
        "Month_sin",
        "Month_cos",
        "Day_sin",
        "Day_cos",
        "Latitude_Square",
        "Longitude_Square",
        "Lat_Long",
        "Monsoon"
    ]]

    rainfall_prediction = rainfall_model.predict(rainfall_features)[0]

    max_temp_prediction = max_temp_model.predict(temperature_features)[0]

    min_temp_prediction = min_temp_model.predict(temperature_features)[0]

    return {

        "Predicted_Rainfall_Next_Day": round(float(rainfall_prediction), 2),

        "Predicted_Max_Temperature_Next_Day": round(float(max_temp_prediction), 2),

        "Predicted_Min_Temperature_Next_Day": round(float(min_temp_prediction), 2),

        "Units": {

            "Rainfall": "mm",

            "Temperature": "°C"

        }

    }


# HEALTH CHECK API
@app.get("/health", tags=["Health"])
def health_check():

    return {

        "status": "Healthy",

        "message": "ISRO Climate Prediction API is running successfully.",

        "models_loaded": {

            "Rainfall": True,

            "Maximum_Temperature": True,

            "Minimum_Temperature": True

        }

    }
