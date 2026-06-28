import joblib
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent

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