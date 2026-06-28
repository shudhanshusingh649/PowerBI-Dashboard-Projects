from .simulation import simulate_city


def generate_recommendation(data):

    result = simulate_city(data)

    recommendations = []

    if result["predicted_max_temperature"] >= 40:
        recommendations.append(
            "Extreme Heat Alert: Increase tree plantation and cooling centers."
        )

    elif result["predicted_max_temperature"] >= 35:
        recommendations.append(
            "High Heat: Promote cool roofs and reduce outdoor exposure."
        )

    if result["predicted_rainfall"] >= 100:
        recommendations.append(
            "Heavy Rainfall Alert: Prepare drainage and flood response."
        )

    elif result["predicted_rainfall"] <= 5:
        recommendations.append(
            "Low Rainfall: Promote water conservation."
        )

    if not recommendations:
        recommendations.append(
            "Climate conditions are within the normal range."
        )

    return {
        "prediction": result,
        "recommendations": recommendations
    }