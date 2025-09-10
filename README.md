MindfulMiles Travel Recommendation

A FastAPI backend that provides personalized travel suggestions and city safety information based on user preferences.

Features

Get recommended cities based on user mood (adventure, relax, cultural)

Each recommendation includes:

City name & country

Categories (e.g., culture, adventure)

Safety status (Safe, Neutral, Unsafe)

City safety endpoint to fetch safety info for any city

CORS enabled for frontend integration

Dataset

Uses cleaned_travel_dataset.csv with the following columns:

city

country

category (list of categories)

best_time_to_travel (list)
