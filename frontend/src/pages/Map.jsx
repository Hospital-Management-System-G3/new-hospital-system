import React, { useEffect, useState, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const Map = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [placeType, setPlaceType] = useState('pharmacy');
  const mapRef = useRef(null);
  const markersRef = useRef([]);

  useEffect(() => {
    if (!mapRef.current) {
      const map = L.map('map').setView([31.9539, 35.9304], 10); // Center around Amman

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
      }).addTo(map);

      mapRef.current = map;

      // Get user location
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation([latitude, longitude]);
        L.marker([latitude, longitude]).addTo(map).bindPopup('You are here!').openPopup();
        map.setView([latitude, longitude], 13);
        
        // Fetch places nearby
        fetchNearbyPlaces(latitude, longitude, placeType);
      });
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  const fetchNearbyPlaces = async (lat, lng, type) => {
    const radius = 5000; // 5 km
    const query = `
      [out:json];
      (
        node["amenity"="${type}"](around:${radius}, ${lat}, ${lng});
      );
      out body;
    `;

    // Clear previous markers
    markersRef.current.forEach(marker => mapRef.current.removeLayer(marker));
    markersRef.current = [];

    const response = await fetch(`https://overpass-api.de/api/interpreter?data=${encodeURIComponent(query)}`);
    const data = await response.json();

    data.elements.forEach(place => {
      const placeLocation = [place.lat, place.lon];
      const marker = L.marker(placeLocation)
        .addTo(mapRef.current)
        .bindPopup(place.tags.name || type.charAt(0).toUpperCase() + type.slice(1));
      
      markersRef.current.push(marker);
    });
  };

  useEffect(() => {
    if (userLocation) {
      fetchNearbyPlaces(userLocation[0], userLocation[1], placeType);
    }
  }, [placeType, userLocation]);

  return (
    <div>
      <select onChange={(e) => setPlaceType(e.target.value)} value={placeType}>
        <option value="pharmacy">Pharmacy</option>
        <option value="hospital">Hospital</option>
        <option value="clinic">Clinic</option>
      </select>
      <div id="map" style={{ height: '400px', width: '100%' }} />
    </div>
  );
};

export default Map;
 