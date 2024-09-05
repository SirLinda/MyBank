from pydantic import BaseModel, EmailStr

class SignUpRequest(BaseModel):
    name: str
    email: EmailStr
    phone_number: str
    password: str  # Should be hashed before storing

class SignUpResponse(BaseModel):
    message: str
    user_id: int  # The ID of the newly created user
