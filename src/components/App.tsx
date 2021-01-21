import { useState, useEffect } from 'react';
import { LatLngLiteral } from 'leaflet';
import * as Types from '../Types';
import useToggle from '../hooks/useToggle';
import styles from '../styles/App.module.css';
import Map from './Map';
import Sidebar from './Sidebar';

const App = () => {
  // Workouts
  // @ts-ignore
  const [workouts, setWorkouts] = useState<Types.Workouts | []>([]);

  // Form toggler
  // @ts-ignore
  const [isFormShowing, toggleForm] = useToggle(false);

  // Users coords
  const [userPosition, setCoords] = useState<LatLngLiteral>();

  // Getting users coords
  useEffect(() => {
    const { geolocation } = navigator;

    if (!geolocation) return;

    geolocation.getCurrentPosition(
      ({ coords: { latitude: lat, longitude: lng } }) =>
        setCoords({ lat, lng }),
      () => alert('Could not get your location :(')
    );
  }, []);

  return (
    <div className={styles.App}>
      {/* The sidear section */}
      <Sidebar workouts={workouts} />

      {/* The map section */}
      {userPosition && (
        <Map
          workouts={workouts}
          toggleForm={toggleForm}
          userPosition={userPosition}
        />
      )}
    </div>
  );
};

export default App;
