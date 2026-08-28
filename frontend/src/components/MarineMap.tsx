import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
} from "react-leaflet";

import L from "leaflet";

import "leaflet/dist/leaflet.css";


const userIcon = new L.Icon({
  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",

  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",

  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",

  iconSize: [25, 41],

  iconAnchor: [12, 41],

});


function MarineMap() {

  const latitude = 20.26;

  const longitude = 86.70;


  return (
    <div className="marine-map">

      <MapContainer
        center={[latitude, longitude]}
        zoom={8}
        scrollWheelZoom={true}
        style={{
          height: "400px",
          width: "100%",
        }}
      >

        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />


        <Marker
          position={[
            latitude,
            longitude,
          ]}
          icon={userIcon}
        >

          <Popup>

            📍 Your selected location

            <br />

            Near Paradip

          </Popup>

        </Marker>

      </MapContainer>

    </div>
  );
}


export default MarineMap;