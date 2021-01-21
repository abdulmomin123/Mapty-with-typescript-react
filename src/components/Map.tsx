import React from 'react';
import { LatLngLiteral } from 'leaflet';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from 'react-leaflet';
import * as Types from '../Types';
import styles from '../styles/Map.module.css';

interface Props {
  userPosition: LatLngLiteral;
  workouts: Types.Workouts | [];
  toggleForm: () => void;
}

const Map: React.FC<Props> = ({ userPosition, toggleForm }) => {
  // Just the click handler on the map
  const HandleClick = () => {
    useMapEvents({
      click() {
        toggleForm();
      },
    });

    return <></>;
  };

  return (
    <MapContainer className={styles.Map} center={userPosition} zoom={13}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={userPosition}>
        <Popup>You are here.</Popup>
      </Marker>

      {/* Click handler (doesn't return any element) */}
      <HandleClick />
    </MapContainer>
  );
};

export default Map;
