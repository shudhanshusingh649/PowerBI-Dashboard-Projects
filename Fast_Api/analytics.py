import pandas as pd
from pathlib import Path
import traceback

BASE_DIR = Path(__file__).resolve().parent.parent
DATA_PATH = BASE_DIR / "Final_Dataset" / "climate_data_2010_2025.csv"

def get_analytics():

    try:
        print("BASE_DIR:", BASE_DIR)
        print("DATA_PATH:", DATA_PATH)
        print("FILE EXISTS:", DATA_PATH.exists())

        df = pd.read_csv(DATA_PATH)

        print(df.head())
        print(df.columns.tolist())

        df["Date"] = pd.to_datetime(df["Date"])
        df["Year"] = df["Date"].dt.year

        return {
            "total_records": len(df)
        }

    except Exception:
        print(traceback.format_exc())
        raise