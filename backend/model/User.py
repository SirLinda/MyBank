from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime

class User(BaseModel):
    id: int
    name: str
    email: EmailStr
    phone_number: str
    password: str
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        orm_mode = True
