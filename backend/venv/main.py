import firebase_admin
from firebase_admin import credentials, auth
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, EmailStr
import firebase_admin
from firebase_admin import credentials, auth
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust this to your frontend's origin
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)
# Initialize Firebase Admin SDK
cred = credentials.Certificate("sosplus-c0ae8-firebase-adminsdk-y99g3-9d8349de51.json")
firebase_admin.initialize_app(cred)

@app.get("/test-firebase")
async def test_firebase():
    try:
        # This will test if Firebase is correctly initialized
        # We can do a simple operation like fetching users (or check current app name)
        app_info = firebase_admin.get_app()  # Check if Firebase is initialized
        return {"message": "Firebase initialized successfully", "app_name": app_info.name}
    except Exception as e:
        return {"error": str(e)}


@app.get("/")
async def read_root():
    return {"message": "Welcome to the Panic Button API connected to Firebase"}

class SignUpRequest(BaseModel):
    email: EmailStr
    password: str
    name: str
    phone: str

@app.post("/signup")
async def signup(user: SignUpRequest):
    try:
        # Create a new user with Firebase Authentication
        new_user = auth.create_user(
            email=user.email,
            password=user.password,
            display_name=user.name,
            phone_number=user.phone
        )
        return {"message": "User signed up successfully", "uid": new_user.uid}
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Error creating user: {str(e)}")
    
    # Define Pydantic model for the sign-in request
class SignInRequest(BaseModel):
    email: EmailStr
    password: str

@app.post("/signin")
async def signin(user: SignInRequest):
    try:
        # Sign in the user using Firebase Authentication
        user_record = auth.get_user_by_email(user.email)
        
        # Here we would typically verify the password
        # Note: Firebase Admin SDK does not support direct password verification.
        # You need to use Firebase Client SDK on the client side for authentication.
        
        return {"message": "User signed in successfully", "uid": user_record.uid}
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Error signing in: {str(e)}")