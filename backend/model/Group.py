from pydantic import BaseModel
from typing import List
from datetime import datetime

class Group(BaseModel):
    id: int
    group_name: str
    members: List[int]  # List of user IDs
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        orm_mode = True
