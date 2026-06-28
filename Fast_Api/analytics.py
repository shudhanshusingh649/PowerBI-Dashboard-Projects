import pandas as pd
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent
DATA_PATH = BASE_DIR / "Final_Dataset" / "climate_data_2010_2025.csv"

def get_analytics():

    df = pd.read_csv(DATA_PATH)

    # Date se Year nikalo
    df["Date"] = pd.to_datetime(df["Date"])
    df["Year"] = df["Date"].dt.year

    total_records = len(df)

    avg_rainfall = round(df["Rainfall"].mean(), 2)
    avg_max_temp = round(df["Max_Temperature"].mean(), 2)
    avg_min_temp = round(df["Min_Temperature"].mean(), 2)

    hottest_year = (
        df.groupby("Year")["Max_Temperature"]
        .mean()
        .idxmax()
    )

    wettest_year = (
        df.groupby("Year")["Rainfall"]
        .mean()
        .idxmax()
    )

    return {
        "total_records": total_records,
        "date_range": {
            "start": str(df["Date"].min().date()),
            "end": str(df["Date"].max().date())
        },
        "average_rainfall": avg_rainfall,
        "average_max_temperature": avg_max_temp,
        "average_min_temperature": avg_min_temp,
        "hottest_year": int(hottest_year),
        "wettest_year": int(wettest_year)
    }