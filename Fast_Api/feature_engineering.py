import pandas as pd
import numpy as np
from .schemas import ClimateInput
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