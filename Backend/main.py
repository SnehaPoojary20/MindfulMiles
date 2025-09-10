from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd
import ast
from city_safety import get_safety_status  

app = FastAPI()

# Enable CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# User Input Model for Recommendations
class TravelRequest(BaseModel):
    budget: int
    time: int
    mood: str

# Load Travel Dataset Once
df = pd.read_csv("cleaned_travel_dataset.csv")

# Convert string lists back into Python lists
df["category"] = df["category"].apply(lambda x: ast.literal_eval(x) if x else [])
df["best_time_to_travel"] = df["best_time_to_travel"].apply(lambda x: ast.literal_eval(x) if x else [])


# Recommendations Endpoint
@app.post("/recommendations")
async def recommendations(req: TravelRequest):
    mood = req.mood.lower()

    # Simple filter: checking if mood matches category
    def mood_match(categories, mood):
        mood_map = {
            "adventure": ["adventure", "hiking", "sports", "nature", "skiing"],
            "relax": ["beach", "relaxation", "spa", "nature", "coastline"],
            "cultural": ["culture", "history", "museums", "art", "temples", "landmarks"]
        }
        keywords = mood_map.get(mood, [])
        return any(k.lower() in [c.lower() for c in categories] for k in keywords)

    # Filtering dataset by mood
    filtered = df[df['category'].apply(lambda cats: mood_match(cats, mood))]

    # Building response
    places_list = []
    for _, row in filtered.iterrows():
        places_list.append({
            "name": row['city'],
            "country": row['country'],
            "categories": row['category'],
            "best_time_to_travel": row['best_time_to_travel'],  # keeping actual data if available
            "estimated_cost": "₹Unknown",  # can add real estimates later
            "safety_status": get_safety_status(row['city'])     
        })

    return {"places": places_list}


# Safety Endpoint 
@app.get("/safety/{city}")
def get_safety(city: str):
    try:
        status = get_safety_status(city)  # Safe / Neutral / Unsafe / Unknown
        return {"city": city, "safety_status": status}
    except Exception as e:
        return {"city": city, "safety_status": "Unknown", "error": str(e)}

# Root Endpoint
@app.get("/")
def read_root():
    return {"message": "API running with Travel Recommendations + Safety!"}

