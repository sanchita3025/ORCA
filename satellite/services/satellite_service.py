import json
import os


BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA_DIR = os.path.join(BASE_DIR, "data")


def load_json(path):
    with open(path, "r", encoding="utf-8") as file:
        return json.load(file)


def get_satellite_data(latitude, longitude, time=None):

    # Load SST
    sst_path = os.path.join(DATA_DIR, "sst", "sst.json")
    sst = load_json(sst_path)

    # Load Chlorophyll
    chlorophyll_path = os.path.join(
        DATA_DIR, "chlorophyll", "chlorophyll.json"
    )
    chlorophyll = load_json(chlorophyll_path)

    # Load PFZ
    pfz_path = os.path.join(DATA_DIR, "pfz", "pfz.geojson")
    pfz = load_json(pfz_path)

    # Check whether PFZ data exists
    pfz_available = len(pfz.get("features", [])) > 0

    return {
        "status": "available",

        "pfz": {
            "available": pfz_available
        },

        "sst": {
            "value": sst.get("value"),
            "unit": sst.get("unit")
        },

        "chlorophyll": {
            "value": chlorophyll.get("value"),
            "unit": chlorophyll.get("unit")
        },

        "source": {
            "pfz": pfz.get("features", [{}])[0].get("properties", {}).get("source"),
            "sst": sst.get("source"),
            "chlorophyll": chlorophyll.get("source")
        },

        "timestamp": time
    }