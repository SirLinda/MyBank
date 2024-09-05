from pydantic import BaseModel
from datetime import datetime

class Notification(BaseModel):
    id: int
    user_id: int  # The user who receives the notification
    panic_alert_id: int  # Refers to the PanicAlert
    sent_at: datetime
    status: str  # "sent", "delivered", "read", etc.

    class Config:
        orm_mode = True
