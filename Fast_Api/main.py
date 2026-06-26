from fastapi import FastAPI
from pydantic import BaseModel
import pandas as pd
import joblib

# CSV load
history_df = pd.read_csv(
    r"C:\Users\HP\ISRO_Project\Final_Dataset\climate_data_2010_2025.csv"
)
history_df["Date"] = pd.to_datetime(history_df["Date"])

app = FastAPI(title="ISRO Climate Prediction API")