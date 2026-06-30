import pandas as pd
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent
DATA_PATH = BASE_DIR / "Final_Dataset" / "climate_data_2010_2025.csv"

def get_analytics():

    total_records = 0
    rainfall_sum = 0
    max_sum = 0
    min_sum = 0

    year_temp = {}
    year_rain = {}
    year_count = {}

    first_date = None
    last_date = None

    for chunk in pd.read_csv(DATA_PATH, chunksize=50000):

        chunk["Date"] = pd.to_datetime(chunk["Date"])
        chunk["Year"] = chunk["Date"].dt.year

        total_records += len(chunk)

        rainfall_sum += chunk["Rainfall"].sum()
        max_sum += chunk["Max_Temperature"].sum()
        min_sum += chunk["Min_Temperature"].sum()

        if first_date is None:
            first_date = chunk["Date"].min()

        last_date = chunk["Date"].max()

        grouped = chunk.groupby("Year").agg({
            "Rainfall": "sum",
            "Max_Temperature": "sum",
            "Year": "count"
        })

        for y, row in grouped.iterrows():

            year_temp[y] = year_temp.get(y, 0) + row["Max_Temperature"]
            year_rain[y] = year_rain.get(y, 0) + row["Rainfall"]
            year_count[y] = year_count.get(y, 0) + row["Year"]

    avg_rainfall = round(rainfall_sum / total_records, 2)
    avg_max = round(max_sum / total_records, 2)
    avg_min = round(min_sum / total_records, 2)

    hottest_year = max(
        year_temp,
        key=lambda y: year_temp[y] / year_count[y]
    )

    wettest_year = max(
        year_rain,
        key=lambda y: year_rain[y] / year_count[y]
    )

    return {
        "total_records": total_records,
        "date_range": {
            "start": str(first_date.date()),
            "end": str(last_date.date())
        },
        "average_rainfall": avg_rainfall,
        "average_max_temperature": avg_max,
        "average_min_temperature": avg_min,
        "hottest_year": int(hottest_year),
        "wettest_year": int(wettest_year)
    }