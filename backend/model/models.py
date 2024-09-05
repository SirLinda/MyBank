# models.py

from pydantic import BaseModel, EmailStr
from typing import Optional, List
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

class PanicAlert(BaseModel):
    id: int
    user_id: int
    message: Optional[str] = "Help! Emergency!"
    timestamp: datetime
    latitude: Optional[float] = None
    longitude: Optional[float] = None

    class Config:
        orm_mode = True

class Group(BaseModel):
    id: int
    group_name: str
    members: List[int]
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        orm_mode = True

class Notification(BaseModel):
    id: int
    user_id: int
    panic_alert_id: int
    sent_at: datetime
    status: str

    class Config:
        orm_mode = True

class SignUpRequest(BaseModel):
    name: str
    email: EmailStr
    phone_number: str
    password: str

class SignUpResponse(BaseModel):
    message: str
    user_id: int

class LoginRequest(BaseModel):
    email: EmailStr
    password: str

class LoginResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
