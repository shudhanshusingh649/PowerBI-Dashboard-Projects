from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi import HTTPException
from .forecast import generate_forecast
from .simulation import simulate_city
from .recommendation import generate_recommendation
from .dashboard import dashboard_data
from .analytics import get_analytics
from .anomaly import detect_anomaly
from .digital_twin import run_digital_twin
import traceback
from .feature_engineering import create_features
from .schemas import ClimateInput
from .model_loader import (
    rainfall_model,
    max_temp_model,
    min_temp_model
)
app = FastAPI(
    title="ISRO Climate Prediction API",
    description="AI Powered Climate Prediction Platform",
    version="4.0"
)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
@app.get("/", tags=["Home"])
def home():

    return {

        "Project": "Urban Heat Platform",

        "Version": "4.0",

        "Status": "Running Successfully",

        "Developer": "IIT Patna",

        "Available_APIs": [

            "/dashboard",

            "/health",

            "/predict/rainfall",

            "/predict/max-temperature",

            "/predict/min-temperature",

            "/predict/all",

            "/predict/heat-index",

            "/predict/heat-risk",

            "/predict/uhi",

            "/simulate",

            "/recommendation",

            "/forecast/7-days"

        ]

    }
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


# DASHBOARD API
@app.post("/dashboard", tags=["Dashboard"])
def dashboard(data: ClimateInput):

    return {

        "status":"success",

        "dashboard": dashboard_data(data)

    }

# HEAT INDEX API
@app.post("/predict/heat-index", tags=["Prediction"])
def predict_heat_index(data: ClimateInput):

    avg_temp = (data.Max_Temperature + data.Min_Temperature) / 2

    heat_index = avg_temp + (0.1 * data.Rainfall)

    return {

        "status": "success",

        "Average_Temperature": round(avg_temp,2),

        "Heat_Index": round(heat_index,2),

        "Unit": "°C"

    }


# HEAT RISK API
@app.post("/predict/heat-risk", tags=["Prediction"])
def predict_heat_risk(data: ClimateInput):

    avg_temp = (data.Max_Temperature + data.Min_Temperature) / 2

    if avg_temp < 30:

        risk = "Low"

        color = "Green"

    elif avg_temp < 35:

        risk = "Moderate"

        color = "Yellow"

    elif avg_temp < 40:

        risk = "High"

        color = "Orange"

    else:

        risk = "Extreme"

        color = "Red"

    return {

        "status":"success",

        "Heat_Risk":risk,

        "Color":color,

        "Average_Temperature":round(avg_temp,2)

    }

# UHI API
@app.post("/predict/uhi", tags=["Prediction"])
def predict_uhi(data: ClimateInput):

    uhi = data.Max_Temperature - data.Min_Temperature

    return {

        "status":"success",

        "Urban_Heat_Island_Index":round(uhi,2),

        "Unit":"°C"

    }


# SIMULATION API
@app.post("/simulate", tags=["Simulation"])
def simulate(data: ClimateInput):

    result = simulate_city(data)

    return {
        "status":"success",
        "simulation":result
    }
# RECOMMENDATION API
@app.post("/recommendation", tags=["Recommendation"])
def recommendation(data: ClimateInput):

    return {
        "status": "success",
        "result": generate_recommendation(data)
    }

# To get real data 
@app.post("/forecast/7-days", tags=["Forecast"])
def forecast(data: ClimateInput):

    return {
        "status": "success",
        "forecast": generate_forecast(data)
    }

# Api for analytics
@app.get("/analytics", tags=["Analytics"])
def analytics():
    try:
        return {
            "status": "success",
            "analytics": get_analytics()
        }

    except Exception as e:
        print(traceback.format_exc())
        raise HTTPException(status_code=500, detail=str(e))
# Api for anomaly
@app.post("/anomaly", tags=["Analytics"])
def anomaly(data: ClimateInput):

    result = detect_anomaly(
        data.Max_Temperature,
        data.Min_Temperature,
        data.Rainfall
    )

    return {
        "status": "success",
        "result": result
    }

# Api for digital_twin 
@app.post("/digital-twin", tags=["Digital Twin"])
def digital_twin(data: ClimateInput):

    return {

        "status":"success",

        "digital_twin":run_digital_twin(data)

    }