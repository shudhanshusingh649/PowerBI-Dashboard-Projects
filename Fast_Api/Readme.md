# ISRO Climate Prediction API (Urban Heat Platform)

This document describes the available REST endpoints, request/response formats, example payloads, and operational notes for the API implemented in the `Fast_Api` package.

**Quick Start**
- **Install dependencies**: see top-level `requirements.txt`.
- **Run server**: from the workspace root run:

```bash
uvicorn Fast_Api.main:app --reload --host 0.0.0.0 --port 8000
```

**Input Schema (request body for POST endpoints)**
- **Model**: `ClimateInput` (Pydantic)
- **Fields**:
	- **Latitude**: float, required, range [-90, 90]
	- **Longitude**: float, required, range [-180, 180]
	- **Date**: string, required, format `YYYY-MM-DD`
	- **Max_Temperature**: float, required, range [-50, 60] (°C)
	- **Min_Temperature**: float, required, range [-60, 50] (°C)
	- **Rainfall**: float, required, range [0, 1000] (mm)

Example request body (JSON):

```json
{
	"Latitude": 25.62,
	"Longitude": 85.12,
	"Date": "2024-06-01",
	"Max_Temperature": 36.5,
	"Min_Temperature": 27.1,
	"Rainfall": 12.3
}
```

**Behavior and common responses**
- Successful responses typically return HTTP 200 and include `"status": "success"` and endpoint-specific data.
- Validation errors return HTTP 422 (Pydantic/FastAPI auto-handled).
- Internal exceptions return HTTP 500 with error details logged server-side.

**Endpoints**

- **Home**
	- Method: `GET`
	- Path: `/`
	- Description: Project metadata and list of available endpoints.
	- Response: project name, version, status, developer, and `Available_APIs` list.

- **Health Check**
	- Method: `GET`
	- Path: `/health`
	- Description: API health and model load status.
	- Response:
		- `status`: "Healthy"
		- `message`: string
		- `models_loaded`: { `Rainfall`, `Maximum_Temperature`, `Minimum_Temperature` }

- **Predict Rainfall**
	- Method: `POST`
	- Path: `/predict/rainfall`
	- Input: `ClimateInput`
	- Description: Predicts next-day rainfall (mm) using the rainfall model after feature engineering.
	- Success Response:
		- `status`: "success"
		- `Predicted_Rainfall_Next_Day`: number (mm)
		- `Unit`: "mm"

- **Predict Max Temperature**
	- Method: `POST`
	- Path: `/predict/max-temperature`
	- Input: `ClimateInput`
	- Description: Predicts next-day maximum temperature (°C).
	- Success Response:
		- `status`: "success"
		- `Predicted_Max_Temperature_Next_Day`: number (°C)
		- `Unit`: "°C"

- **Predict Min Temperature**
	- Method: `POST`
	- Path: `/predict/min-temperature`
	- Input: `ClimateInput`
	- Description: Predicts next-day minimum temperature (°C).
	- Success Response:
		- `status`: "success"
		- `Predicted_Min_Temperature_Next_Day`: number (°C)
		- `Unit`: "°C"

- **Predict All (Rainfall + Max + Min)**
	- Method: `POST`
	- Path: `/predict/all`
	- Input: `ClimateInput`
	- Description: Returns all three predictions in one call.
	- Success Response:
		- `Predicted_Rainfall_Next_Day`: number (mm)
		- `Predicted_Max_Temperature_Next_Day`: number (°C)
		- `Predicted_Min_Temperature_Next_Day`: number (°C)
		- `Units`: { `Rainfall`, `Temperature` }

- **Heat Index**
	- Method: `POST`
	- Path: `/predict/heat-index`
	- Input: `ClimateInput`
	- Description: Derived metric: average temperature + 0.1 * rainfall.
	- Success Response:
		- `status`: "success"
		- `Average_Temperature`: number (°C)
		- `Heat_Index`: number (°C)
		- `Unit`: "°C"

- **Heat Risk**
	- Method: `POST`
	- Path: `/predict/heat-risk`
	- Input: `ClimateInput`
	- Description: Categorizes risk by average temperature.
	- Logic: avg <30 → Low (Green); 30–34.99 → Moderate (Yellow); 35–39.99 → High (Orange); >=40 → Extreme (Red)
	- Success Response:
		- `status`: "success"
		- `Heat_Risk`: string
		- `Color`: string
		- `Average_Temperature`: number (°C)

- **Urban Heat Island Index (UHI)**
	- Method: `POST`
	- Path: `/predict/uhi`
	- Input: `ClimateInput`
	- Description: `Max_Temperature - Min_Temperature` as UHI index.
	- Success Response:
		- `status`: "success"
		- `Urban_Heat_Island_Index`: number (°C)
		- `Unit`: "°C"

- **Simulation**
	- Method: `POST`
	- Path: `/simulate`
	- Input: `ClimateInput`
	- Description: Predicts rainfall, max/min temps and returns deltas vs current values.
	- Success Response:
		- `status`: "success"
		- `simulation`: { `predicted_rainfall`, `predicted_max_temperature`, `predicted_min_temperature`, `temperature_reduction`, `rainfall_change` }

- **Recommendation**
	- Method: `POST`
	- Path: `/recommendation`
	- Input: `ClimateInput`
	- Description: Produces action recommendations derived from the simulation (tree plantation, cool roofs, drainage prep, water conservation, etc.).
	- Success Response:
		- `status`: "success"
		- `result`: { `prediction`: simulation object, `recommendations`: [strings] }

- **7-Day Forecast**
	- Method: `POST`
	- Path: `/forecast/7-days`
	- Input: `ClimateInput`
	- Description: Iteratively applies models to generate a 7-day forecast.
	- Success Response:
		- `status`: "success"
		- `forecast`: [ { `date` (YYYY-MM-DD), `max_temp`, `min_temp`, `rainfall` }, ... ] (7 items)

- **Dashboard**
	- Method: `POST`
	- Path: `/dashboard`
	- Input: `ClimateInput`
	- Description: Returns combined dashboard data including average temperature, heat risk and simulation.
	- Success Response:
		- `status`: "success"
		- `dashboard`: { `project`, `prediction`, `average_temperature`, `heat_risk`, `model_status`, `forecast_days`, `dashboard_status` }

- **Analytics**
	- Method: `GET`
	- Path: `/analytics`
	- Description: Reads historical dataset and returns aggregated metrics.
	- Success Response:
		- `status`: "success"
		- `analytics`: { `total_records`, `date_range`: {`start`, `end`}, `average_rainfall`, `average_max_temperature`, `average_min_temperature`, `hottest_year`, `wettest_year` }
	- Notes: Uses `Final_Dataset/climate_data_2010_2025.csv` at runtime.

- **Anomaly Detection**
	- Method: `POST`
	- Path: `/anomaly`
	- Input: `ClimateInput` (only `Max_Temperature`, `Min_Temperature`, `Rainfall` used)
	- Description: Labels anomalies by comparing inputs to historical means: `Heat Wave`, `Cold Wave`, `Heavy Rainfall`, `Drought`, or `Normal Climate`.
	- Success Response:
		- `status`: "success"
		- `result`: { `average_max_temperature`, `average_min_temperature`, `average_rainfall`, `anomalies`: [strings] }

- **Digital Twin**
	- Method: `POST`
	- Path: `/digital-twin`
	- Input: `ClimateInput`
	- Description: Returns current vs predicted values, deltas, and `climate_status` (`Warming`/`Cooling`/`Stable`).
	- Success Response:
		- `status`: "success"
		- `digital_twin`: { `current`: {`temperature`,`rainfall`}, `prediction`, `temperature_change`, `rainfall_change`, `climate_status` }

**Operational Notes & Troubleshooting**
- Models are loaded at import time from `Models/*.pkl`. Missing or incompatible model files will raise errors when `Fast_Api` imports.
- Analytics and anomaly endpoints depend on `Final_Dataset/climate_data_2010_2025.csv`. Ensure the CSV exists and has columns `Date`, `Rainfall`, `Max_Temperature`, `Min_Temperature`.
- Feature engineering is performed by `create_features()` in `feature_engineering.py` — ensure dates are in `YYYY-MM-DD` format.

**Extending / Contributing**
- Add or replace model files under the `Models` folder; ensure scikit-learn compatible `predict()` interface.
- Update `schemas.py` to change input validation rules.

If you want, I can also:
- generate a Markdown reference file with example cURL commands for each endpoint,
- or produce an OpenAPI YAML spec extracted from the running app.
