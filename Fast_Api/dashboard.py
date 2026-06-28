from .simulation import simulate_city


def dashboard_data(data):

    result = simulate_city(data)

    avg_temp = (
        result["predicted_max_temperature"] +
        result["predicted_min_temperature"]
    ) / 2

    if avg_temp >= 40:
        heat_status = "Extreme"

    elif avg_temp >= 35:
        heat_status = "High"

    elif avg_temp >= 30:
        heat_status = "Moderate"

    else:
        heat_status = "Low"

    return {

        "project": "AI Powered Digital Twin of India's Climate",

        "prediction": result,

        "average_temperature": round(avg_temp,2),

        "heat_risk": heat_status,

        "model_status": "Running",

        "forecast_days":7,

        "dashboard_status":"Ready"

    }