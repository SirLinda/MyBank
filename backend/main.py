import firebase_admin
from firebase_admin import credentials, auth, firestore
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, EmailStr
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# CORS middleware configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust this to your frontend's origin
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

# Initialize Firebase Admin SDK
cred = credentials.Certificate("sosplus-c0ae8-firebase-adminsdk-y99g3-c00e48f482.json")
firebase_admin.initialize_app(cred)
db = firestore.client()

@app.get("/test-firebase")
async def test_firebase():
    try:
        # Test if Firebase is correctly initialized
        app_info = firebase_admin.get_app()  # Check if Firebase is initialized
        return {"message": "Firebase initialized successfully", "app_name": app_info.name}
    except Exception as e:
        return {"error": str(e)}

@app.get("/test-firestore")
async def test_firestore():
    try:
        # Test fetching a sample document from Firestore
        test_ref = db.collection("users").limit(1).get()
        if test_ref:
            return {"status": "Firestore connection is working!"}
        else:
            return {"status": "No documents found in users collection."}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error connecting to Firestore: {str(e)}")

@app.get("/")
async def read_root():
    return {"message": "Welcome to the Panic Button API connected to Firebase"}

# Define Pydantic model for the signup request
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
            password=user.password,  # You might not need this if you are handling passwords in Firestore
            display_name=user.name,
            phone_number=user.phone
        )

        # Hash the password before storing it in Firestore
        hashed_password = bcrypt.hashpw(user.password.encode('utf-8'), bcrypt.gensalt())

        # Create a user document in Firestore
        user_data = {
            "uid": new_user.uid,
            "email": new_user.email,
            "name": user.name,
            "phone": user.phone,
            "groups": [],  # Initialize with an empty groups list
            "password": hashed_password.decode('utf-8')  # Store the hashed password
        }

        # Add the user data to Firestore
        db.collection("users").document(new_user.uid).set(user_data)

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
        
        # If user is found, fetch user document from Firestore
        user_doc_ref = db.collection("users").document(user_record.uid)
        user_doc = user_doc_ref.get()
        
        if not user_doc.exists:
            raise HTTPException(status_code=404, detail="User not found in Firestore.")

        # Get user data
        user_data = user_doc.to_dict()
        
        # Retrieve the emergency contacts
        emergency_contacts = user_data.get("emergency_contacts", [])

        return {
            "message": "User signed in successfully",
            "uid": user_record.uid,
            "email": user_record.email,
            "name": user_data["name"],
            "phone": user_data["phone"],
            "emergency_contacts": emergency_contacts
        }
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Error signing in: {str(e)}")

@app.get("/users")
async def get_all_users():
    try:
        users = []
        # Query the users collection in Firestore
        users_ref = db.collection("users")
        query = users_ref.stream()  # Stream all documents in the users collection

        for user_doc in query:
            user_data = user_doc.to_dict()  # Convert the document to a dictionary

            users.append({
                "uid": user_doc.id,  # Firestore document ID as uid
                "email": user_data.get("email"),
                "phone_number": user_data.get("phone"),
                "display_name": user_data.get("name"),
                "disabled": False,  # Firestore does not have a disabled field
                "emergency_contacts": user_data.get("emergency_contacts", [])  # Include emergency contacts
            })

        return {"users": users}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error retrieving users: {str(e)}")

@app.get("/users/{user_id}/groups")
async def get_user_groups(user_id: str):
    try:
        # Fetch the user document from Firestore
        user_ref = db.collection("users").document(user_id)
        user_doc = user_ref.get()
        
        if not user_doc.exists:
            raise HTTPException(status_code=404, detail="User not found")
        
        user_data = user_doc.to_dict()
        
        return {
            "user_id": user_id,
            "name": user_data["name"],
            "emergency_contacts": user_data.get("emergency_contacts", [])
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching user groups: {str(e)}")


class AddEmergencyContactRequest(BaseModel):
    email: EmailStr
    phone: str

@app.post("/emergency_contacts/add")
async def add_emergency_contact(phone: str, contact_data: AddEmergencyContactRequest):
    try:
        # Find user by phone number
        users_ref = db.collection("users")
        query = users_ref.where("phone", "==", phone).limit(1).get()

        if not query:
            raise HTTPException(status_code=404, detail="User not found with the given phone number.")

        # Assuming the user document exists, fetch the first result
        user_doc = query[0]
        user_id = user_doc.id

        # Update the user's emergency contacts in Firestore
        user_ref = db.collection("users").document(user_id)
        user_ref.update({
            "emergency_contacts": firestore.ArrayUnion([{
                "email": contact_data.email,
                "phone": contact_data.phone
            }])  # Add emergency contact details to the user's emergency contacts
        })

        return {"message": f"Emergency contact {contact_data.phone} added for user with phone number {phone}."}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error adding emergency contact: {str(e)}")

@app.get("/users/contacts/{phone}")
async def get_user_contacts(phone: str):
    try:
        # Find user by phone number
        users_ref = db.collection("users")
        query = users_ref.where("phone", "==", phone).limit(1).get()

        if not query:
            raise HTTPException(status_code=404, detail="User not found with the given phone number.")

        # Assuming the user document exists, fetch the first result
        user_doc = query[0]
        user_data = user_doc.to_dict()

        # Retrieve the emergency contacts
        emergency_contacts = user_data.get("emergency_contacts", [])

        return {
            "user_id": user_doc.id,
            "name": user_data["name"],
            "emergency_contacts": emergency_contacts
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error retrieving user contacts: {str(e)}")
