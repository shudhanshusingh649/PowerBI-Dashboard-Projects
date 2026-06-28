from .schemas import ClimateInput
from .feature_engineering import create_features
from .model_loader import (
    rainfall_model,
    max_temp_model,
    min_temp_model
)


def simulate_city(data: ClimateInput):

    df = create_features(data)

    rainfall_features = df[
        [
            "Latitude","Longitude","Max_Temperature","Min_Temperature",
            "Year","Month","Day","DayOfYear","Season",
            "Temp_Difference","Avg_Temperature","Temp_Range",
            "Month_sin","Month_cos","Day_sin","Day_cos",
            "Latitude_Square","Longitude_Square","Lat_Long","Monsoon"
        ]
    ]

    temperature_features = df[
        [
            "Latitude","Longitude","Max_Temperature","Min_Temperature",
            "Rainfall","Year","Month","Day","DayOfYear",
            "Season","Temp_Difference","Avg_Temperature",
            "Temp_Range","Month_sin","Month_cos",
            "Day_sin","Day_cos","Latitude_Square",
            "Longitude_Square","Lat_Long","Monsoon"
        ]
    ]

    rainfall = float(rainfall_model.predict(rainfall_features)[0])

    max_temp = float(max_temp_model.predict(temperature_features)[0])

    min_temp = float(min_temp_model.predict(temperature_features)[0])

    return {
        "predicted_rainfall": round(rainfall,2),
        "predicted_max_temperature": round(max_temp,2),
        "predicted_min_temperature": round(min_temp,2),
        "temperature_reduction": round(data.Max_Temperature-max_temp,2),
        "rainfall_change": round(rainfall-data.Rainfall,2)
    }