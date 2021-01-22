import React from 'react';
import { LatLngLiteral } from 'leaflet';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
  useMap,
} from 'react-leaflet';
import * as Types from '../Types';
import styles from '../styles/Map.module.css';

interface Props {
  userPosition: LatLngLiteral;
  mapCenter: LatLngLiteral;
  workouts: Types.Workouts;
  toggleForm: () => void;
  setWorkoutCoords: (coords: LatLngLiteral) => void;
  changeMapCenter: (newCenter: LatLngLiteral) => void;
}

const Map: React.FC<Props> = ({
  userPosition,
  mapCenter,
  workouts,
  toggleForm,
  setWorkoutCoords,
  changeMapCenter,
}) => {
  // Just the click handler on the map
  const HandleClick = () => {
    const map = useMap();
    map.flyTo(mapCenter);

    useMapEvents({
      click({ latlng: { lat, lng } }) {
        toggleForm();
        setWorkoutCoords({ lat, lng });
      },
      dragend() {
        const { lat, lng } = map.getCenter();
        changeMapCenter({ lat, lng });
      },
    });

    return <></>;
  };

  return (
    <MapContainer className={styles.Map} center={mapCenter} zoom={13}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={userPosition}>
        <Popup>You are here.</Popup>
      </Marker>

      {/* Workout markers */}
      {workouts.map(workout => (
        <Marker key={workout.id} position={workout.coords}>
          <Popup
            className={`${
              workout.type === 'running' ? 'running' : 'cycling'
            }-popup`}
          >
            {`${workout.type === 'running' ? '🏃‍♂️' : '🚴‍♀️'} ${workout.title}`}
          </Popup>
        </Marker>
      ))}

      {/* Click handler (doesn't return any element) */}
      <HandleClick />
    </MapContainer>
  );
};

export default Map;
