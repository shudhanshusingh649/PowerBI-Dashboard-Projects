from datetime import datetime, timedelta

from .schemas import ClimateInput
from .feature_engineering import create_features
from .model_loader import (
    rainfall_model,
    max_temp_model,
    min_temp_model
)


def generate_forecast(data: ClimateInput):

    forecast = []

    current = data

    for _ in range(7):

        df = create_features(current)

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

        rain = float(rainfall_model.predict(rainfall_features)[0])
        max_temp = float(max_temp_model.predict(temperature_features)[0])
        min_temp = float(min_temp_model.predict(temperature_features)[0])

        next_date = (
            datetime.strptime(current.Date, "%Y-%m-%d")
            + timedelta(days=1)
        ).strftime("%Y-%m-%d")

        forecast.append({
            "date": next_date,
            "max_temp": round(max_temp, 2),
            "min_temp": round(min_temp, 2),
            "rainfall": round(rain, 2)
        })

        current = ClimateInput(
            Latitude=current.Latitude,
            Longitude=current.Longitude,
            Date=next_date,
            Max_Temperature=max_temp,
            Min_Temperature=min_temp,
            Rainfall=rain
        )

    return forecast