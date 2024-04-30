"use client";

import { useState, useEffect } from "react";
import {
  APIProvider,
  Map,
  Marker,
  InfoWindow,
} from "@vis.gl/react-google-maps";

const libraries = ["places"]; // Include Places library for location search

export default function Intro() {
  const [position, setPosition] = useState({ lat: 0, lng: 0 });
  const [open, setOpen] = useState(false);
  const [hospitals, setHospitals] = useState([]);
  const YOUR_GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY; // Replace with your API key

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setPosition({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          fetchHospitals(position.coords.latitude, position.coords.longitude);
        },
        (error) => console.error(error)
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);

  const fetchHospitals = async (lat, lng) => {
    const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=5000&type=hospital&key=${YOUR_GOOGLE_MAPS_API_KEY}`;
    const response = await fetch(url);
    const data = await response.json();
    if (data.status === "OK") {
      setHospitals(
        data.results.map((hospital) => ({
          lat: hospital.geometry.location.lat,
          lng: hospital.geometry.location.lng,
          name: hospital.name,
        }))
      );
    } else {
      console.error("Failed to fetch hospitals:", data.error_message);
    }
  };

  return (
    <APIProvider apiKey={YOUR_GOOGLE_MAPS_API_KEY}>
      <div style={{ height: "100vh", width: "100%" }}>
        <Map zoom={13} center={position} mapId={process.env.NEXT_PUBLIC_MAP_ID}>
          {hospitals.map((hospital) => (
            <Marker key={hospital.name} position={hospital}>
              {/* Optionally customize default marker appearance */}
            </Marker>
          ))}
          {open && (
            <InfoWindow position={position} onCloseClick={() => setOpen(false)}>
              <p>I'm in Hamburg</p>
            </InfoWindow>
          )}
        </Map>
      </div>
    </APIProvider>
  );
}
