import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
} from "react-leaflet";

<<<<<<< HEAD
import {
  useEffect,
} from "react";

=======
import { useEffect } from "react";
>>>>>>> cdaee67237b5c38530c3707a06afebd309e90e38
import L from "leaflet";

import "leaflet/dist/leaflet.css";

type MarineMapProps = {
  latitude: number;
  longitude: number;
  locationName?: string;
};

<<<<<<< HEAD
const userIcon =
  new L.Icon({
    iconUrl:
      "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",

    iconRetinaUrl:
      "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",

    shadowUrl:
      "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",

    iconSize: [
      25,
      41,
    ],

    iconAnchor: [
      12,
      41,
    ],

    popupAnchor: [
      1,
      -34,
    ],
  });

/*
=========================================================
MAP POSITION UPDATER
=========================================================
*/
=======
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

/* -----------------------------------------
   UPDATE MAP WHEN LOCATION CHANGES
----------------------------------------- */
>>>>>>> cdaee67237b5c38530c3707a06afebd309e90e38

function MapUpdater({
  latitude,
  longitude,
}: {
  latitude: number;
  longitude: number;
}) {
<<<<<<< HEAD
  const map =
    useMap();

  useEffect(() => {
    map.flyTo(
      [
        latitude,
        longitude,
      ],
=======
  const map = useMap();

  useEffect(() => {
    map.flyTo(
      [latitude, longitude],
>>>>>>> cdaee67237b5c38530c3707a06afebd309e90e38
      9,
      {
        duration: 1.2,
      }
    );
<<<<<<< HEAD
  }, [
    latitude,
    longitude,
    map,
  ]);
=======
  }, [latitude, longitude, map]);
>>>>>>> cdaee67237b5c38530c3707a06afebd309e90e38

  return null;
}

<<<<<<< HEAD
/*
=========================================================
MARINE MAP
=========================================================
*/
=======
/* -----------------------------------------
   MARINE MAP
----------------------------------------- */
>>>>>>> cdaee67237b5c38530c3707a06afebd309e90e38

function MarineMap({
  latitude,
  longitude,
<<<<<<< HEAD
  locationName =
    "Selected marine location",
}: MarineMapProps) {

  const position:
    [number, number] = [
      latitude,
      longitude,
    ];

=======
  locationName = "Selected marine location",
}: MarineMapProps) {
>>>>>>> cdaee67237b5c38530c3707a06afebd309e90e38
  return (
    <div className="map-wrapper">

      <div className="map-overlay-title">
        📍 {locationName}
      </div>

      <MapContainer
<<<<<<< HEAD
        center={position}
=======
        center={[latitude, longitude]}
>>>>>>> cdaee67237b5c38530c3707a06afebd309e90e38
        zoom={9}
        scrollWheelZoom={true}
        style={{
          height: "480px",
          width: "100%",
        }}
      >

        <MapUpdater
          latitude={latitude}
          longitude={longitude}
        />

        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Marker
<<<<<<< HEAD
          position={position}
          icon={userIcon}
        >

          <Popup>

=======
          position={[
            latitude,
            longitude,
          ]}
          icon={userIcon}
        >
          <Popup>
>>>>>>> cdaee67237b5c38530c3707a06afebd309e90e38
            <strong>
              📍 {locationName}
            </strong>

            <br />

            Selected assessment location

            <br />

<<<<<<< HEAD
            <span>
              {latitude.toFixed(4)},{" "}
              {longitude.toFixed(4)}
            </span>

          </Popup>

=======
            {latitude.toFixed(4)},{" "}
            {longitude.toFixed(4)}
          </Popup>
>>>>>>> cdaee67237b5c38530c3707a06afebd309e90e38
        </Marker>

      </MapContainer>

    </div>
  );
}

export default MarineMap;