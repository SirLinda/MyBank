from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class PanicAlert(BaseModel):
    id: int
    user_id: int  # Refers to the User who triggered the alert
    message: Optional[str] = "Help! Emergency!"  # Optional custom message
    timestamp: datetime
    latitude: Optional[float] = None  # If GPS is available
    longitude: Optional[float] = None  # If GPS is available

    class Config:
        orm_mode = True
