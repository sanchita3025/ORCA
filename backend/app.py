from flask import Flask, jsonify, request
from flask_cors import CORS
import sys
import os
from datetime import date

# Add ORCA root directory to Python path
ROOT_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.append(ROOT_DIR)

from satellite.services.satellite_service import get_satellite_data
from reasoning import calculate_risk

app = Flask(__name__)
CORS(app)


@app.route("/")
def home():
    return jsonify({
        "message": "ORCA Backend is running"
    })


@app.route("/api/satellite")
def satellite_data():

    latitude = request.args.get("latitude", type=float)
    longitude = request.args.get("longitude", type=float)

    if latitude is None or longitude is None:
        return jsonify({
            "status": "error",
            "message": "Latitude and longitude are required"
        }), 400

    data = get_satellite_data(
    latitude,
    longitude,
    time=str(date.today())
)

    risk = calculate_risk(
        sst=data["sst"]["value"],
        chlorophyll=data["chlorophyll"]["value"],
        pfz_available=data["pfz"]["available"]
)

    data["risk"] = risk

    return jsonify(data)

if __name__ == "__main__":
    app.run(debug=True, port=5000)