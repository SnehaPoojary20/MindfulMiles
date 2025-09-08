from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd
import ast

app = FastAPI()

# Enable CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# User input model
class UserInput(BaseModel):
    budget: str  # currently optional; you can use later
    time: str    # month, e.g., 'may'
    mood: str    # adventure, relax, cultural, nightlife, foodie

# Load cleaned dataset
df = pd.read_csv("cleaned_travel_dataset.csv")

# Convert string representations of lists back to actual lists
df["category"] = df["category"].apply(ast.literal_eval)
df["best_time_to_travel"] = df["best_time_to_travel"].apply(ast.literal_eval)

# Map moods to dataset category keywords
mood_map = {
    "adventure": ["adventure", "hiking", "rafting", "trekking", "skiing", "sports"],
    "relax": ["beach", "spa", "resorts", "nature", "backwaters"],
    "cultural": ["history", "culture", "museums", "art", "temples", "landmarks"],
    "nightlife": ["nightlife", "clubs", "bars"],
    "foodie": ["food", "restaurants", "cuisine"]
}

@app.get("/")
def read_root():
    return {"message": "Hello, FastAPI is working!"}

@app.post("/recommendations")
def get_recommendations(input: UserInput):
    mood_keywords = mood_map.get(input.mood.lower(), [])

    # Filter dataset based on mood categories and travel month
    filtered = df[
        df["category"].apply(lambda cats: any(k in cats for k in mood_keywords)) &
        df["best_time_to_travel"].apply(lambda months: input.time.lower() in months)
    ]

    # Prepare results as a list of dictionaries
    results = []
    for _, row in filtered.iterrows():
        results.append({
            "name": row["city"],
            "country": row["country"],
            "categories": row["category"],
            "best_time_to_travel": row["best_time_to_travel"],
            "estimated_cost": row.get("estimated_cost", "N/A")
        })

    return {"places": results}



#python -m uvicorn main:app --reload
