from pydantic import BaseModel, Field

class ClimateInput(BaseModel):

    Latitude: float = Field(
        ...,
        ge=-90,
        le=90,
        description="Latitude must be between -90 and 90"
    )

    Longitude: float = Field(
        ...,
        ge=-180,
        le=180,
        description="Longitude must be between -180 and 180"
    )

    Date: str = Field(
        ...,
        description="Format: YYYY-MM-DD"
    )

    Max_Temperature: float = Field(
        ...,
        ge=-50,
        le=60,
        description="Maximum Temperature in °C"
    )

    Min_Temperature: float = Field(
        ...,
        ge=-60,
        le=50,
        description="Minimum Temperature in °C"
    )

    Rainfall: float = Field(
        ...,
        ge=0,
        le=1000,
        description="Rainfall in mm"
    )