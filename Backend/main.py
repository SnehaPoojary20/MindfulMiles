from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class UserInput(BaseModel):
    budget: str
    time: str
    mood: str

@app.get("/")
def read_root():
    return {"message": "Hello, FastAPI is working!"}

@app.post("/recommendations")
def get_recommendations(input: UserInput):
    data = {
        "relax": [
            {"name": "Bali", "description": "Beaches & spas", "cost": "Medium"},
            {"name": "Kerala", "description": "Backwaters & houseboats", "cost": "Low"},
        ],
        "adventure": [
            {"name": "Rishikesh", "description": "Rafting & trekking", "cost": "Low"},
            {"name": "Swiss Alps", "description": "Skiing & hiking", "cost": "High"},
        ],
        "cultural": [
            {"name": "Kyoto", "description": "Temples & tea", "cost": "Medium"},
            {"name": "Rome", "description": "History & architecture", "cost": "High"},
        ],
    }
    return {"places": data.get(input.mood, [])}

