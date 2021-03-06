import React, { useContext } from 'react';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
  useMap,
} from 'react-leaflet';
import { LatLngLiteral } from 'leaflet';
import { FromShowingContext } from '../contexts/FormShowing.context';
import { WorkoutsContext } from '../contexts/Workouts.context';
import { WorkoutCoordsContext } from '../contexts/WorkoutCoords.context';
import { MapCenterContext } from '../contexts/MapCenter.context';
import { WorkoutClickedContext } from '../contexts/WorkoutClicked.context';
import styles from '../styles/Map.module.css';

interface Props {
  usersLocation: LatLngLiteral;
  zoomLevel?: number;
}

const Map: React.FC<Props> = ({ usersLocation, zoomLevel = 13 }) => {
  // Consuming contexts
  const { toggleForm } = useContext(FromShowingContext);
  const { workouts } = useContext(WorkoutsContext);
  const { setWorkoutCoords } = useContext(WorkoutCoordsContext);
  const { mapCenter, setMapCenter } = useContext(MapCenterContext);
  const { isWorkoutClicked, setWorkoutClicked } = useContext(
    WorkoutClickedContext
  );

  // Just the click handler on the map
  const HandleClick = () => {
    const map = useMap();

    useMapEvents({
      // Toggling the form on click
      click({ latlng: { lat, lng } }) {
        toggleForm!();
        setWorkoutCoords!({ lat, lng });
      },
      // Updating the mapCenter
      dragend() {
        const { lat, lng } = map.getCenter();
        setMapCenter!({ lat, lng });
      },
      // Keeping track of wheather to render the MoveToMarker
      moveend() {
        if (!isWorkoutClicked) return;

        setWorkoutClicked!(false);
      },
    });

    return <></>;
  };

  const MoveToMarker = () => {
    const map = useMap();
    map.flyTo(mapCenter!, zoomLevel);

    return <></>;
  };

  return (
    <MapContainer
      className={styles.Map}
      center={usersLocation}
      zoom={zoomLevel}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={usersLocation}>
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

export default Map;
