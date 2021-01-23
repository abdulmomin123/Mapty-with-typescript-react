import React, { useContext, memo } from 'react';
import { LatLngLiteral } from 'leaflet';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
  useMap,
} from 'react-leaflet';
import { FromShowingContext } from '../contexts/FormShowing.context';
import { WorkoutsContext } from '../contexts/Workouts.context';
import styles from '../styles/Map.module.css';

interface Props {
  userPosition: LatLngLiteral;
  mapCenter: LatLngLiteral;
  zoomLevel?: number;
  isWorkoutClicked: boolean;
  setWorkoutCoords: (coords: LatLngLiteral) => void;
  changeMapCenter: (newCenter: LatLngLiteral) => void;
  setWorkoutClicked: (state: boolean) => void;
}

const Map: React.FC<Props> = ({
  userPosition,
  mapCenter,
  zoomLevel = 13,
  isWorkoutClicked,
  setWorkoutCoords,
  changeMapCenter,
  setWorkoutClicked,
}) => {
  // Consuming contexts
  const { toggleForm } = useContext(FromShowingContext);
  const { workouts } = useContext(WorkoutsContext);

  // Just the click handler on the map
  const HandleClick = () => {
    const map = useMap();

    useMapEvents({
      // Toggling the form on click
      click({ latlng: { lat, lng } }) {
        toggleForm!();
        setWorkoutCoords({ lat, lng });
      },
      // Updating the mapCenter
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
      {workouts!.map(({ id, title, coords, type }) => (
        <Marker key={id} position={coords}>
          <Popup
            className={`${type === 'running' ? 'running' : 'cycling'}-popup`}
          >
            {`${type === 'running' ? '🏃‍♂️' : '🚴‍♀️'} ${title}`}
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

export default memo(Map);
