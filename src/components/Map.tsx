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
  zoomLevel?: number;
  isWorkoutClicked: boolean;
  toggleForm: () => void;
  setWorkoutCoords: (coords: LatLngLiteral) => void;
  changeMapCenter: (newCenter: LatLngLiteral) => void;
  setWorkoutClicked: (state: boolean) => void;
}

const Map: React.FC<Props> = ({
  userPosition,
  mapCenter,
  workouts,
  zoomLevel = 13,
  isWorkoutClicked,
  toggleForm,
  setWorkoutCoords,
  changeMapCenter,
  setWorkoutClicked,
}) => {
  // Just the click handler on the map
  const HandleClick = () => {
    const map = useMap();

    useMapEvents({
      click({ latlng: { lat, lng } }) {
        toggleForm();
        setWorkoutCoords({ lat, lng });
      },
      dragend() {
        const { lat, lng } = map.getCenter();
        changeMapCenter({ lat, lng });
      },
      moveend() {
        if (!isWorkoutClicked) return;

        setWorkoutClicked(false);
      },
    });

    return <></>;
  };

  const MoveToMarker = () => {
    const map = useMap();
    map.flyTo(mapCenter, zoomLevel);

    return <></>;
  };

  return (
    <MapContainer className={styles.Map} center={mapCenter} zoom={zoomLevel}>
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

      {/* Moves the map to clicked workout position */}
      {isWorkoutClicked ? <MoveToMarker /> : null}
    </MapContainer>
  );
};

export default Map;
