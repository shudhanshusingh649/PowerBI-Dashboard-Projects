from .simulation import simulate_city


def run_digital_twin(data):

    prediction = simulate_city(data)

    current_temp = data.Max_Temperature
    current_rain = data.Rainfall

    future_temp = prediction["predicted_max_temperature"]
    future_rain = prediction["predicted_rainfall"]

    temperature_change = round(
        future_temp - current_temp,
        2
    )

    rainfall_change = round(
        future_rain - current_rain,
        2
    )

    if temperature_change > 2:
        climate_status = "Warming"

    elif temperature_change < -2:
        climate_status = "Cooling"

    else:
        climate_status = "Stable"

    return {

        "current":{

            "temperature":current_temp,

            "rainfall":current_rain

        },

        "prediction":prediction,

        "temperature_change":temperature_change,

        "rainfall_change":rainfall_change,

        "climate_status":climate_status

    }