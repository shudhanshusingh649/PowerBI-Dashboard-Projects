import pandas as pd
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent

df = pd.read_csv(
    BASE_DIR / "Final_Dataset" / "climate_data_2010_2025.csv"
)


def detect_anomaly(max_temp, min_temp, rainfall):

    avg_max = df["Max_Temperature"].mean()
    avg_min = df["Min_Temperature"].mean()
    avg_rain = df["Rainfall"].mean()

    anomalies = []

    if max_temp > avg_max + 5:
        anomalies.append("Heat Wave")

    if min_temp < avg_min - 5:
        anomalies.append("Cold Wave")

    if rainfall > avg_rain * 2:
        anomalies.append("Heavy Rainfall")

    if rainfall < avg_rain * 0.25:
        anomalies.append("Drought")

    if not anomalies:
        anomalies.append("Normal Climate")

    return {
        "average_max_temperature": round(avg_max, 2),
        "average_min_temperature": round(avg_min, 2),
        "average_rainfall": round(avg_rain, 2),
        "anomalies": anomalies
    }