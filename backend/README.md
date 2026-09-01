# 🌊 ORCA – Marine Intelligence API

ORCA (Oceanic Risk & Condition Assessment) is an AI-powered marine intelligence system designed to analyze marine weather and ocean conditions and provide a simplified marine risk assessment.

## 🎯 Objective

The main objective of ORCA is to combine real-time weather and ocean data to help understand marine conditions and identify potential risks for activities such as fishing, navigation and other marine operations.

## ⚙️ Current Backend Features

- 📍 Location name to latitude/longitude conversion
- 🌦️ Real-time weather data
- 🌊 Ocean and marine conditions
- 🔄 Fallback data handling
- 📊 Data quality assessment
- ⚠️ Marine risk assessment
- 🧠 Marine condition reasoning
- 🚦 Decision and recommendation layer
- ✅ Input validation
- 📡 REST API using FastAPI

## 🏗️ Project Structure

```text
backend/
│
├── data/
│   └── fallback_data.json
│
├── services/
│   ├── weather_service.py
│   ├── ocean_service.py
│   ├── marine_service.py
│   ├── location_service.py
│   ├── reasoning_service.py
│   └── decision_service.py
│
├── main.py
├── requirements.txt
├── .gitignore
└── README.md