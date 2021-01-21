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
  const [workouts, setWorkouts] = useState<Types.Workouts>();

  // Currently clicked position on the map
  const [workoutCoords, setWorkoutCoords] = useState<LatLngLiteral>();

  // Form toggler
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
      <Sidebar
        workoutCoords={workoutCoords!}
        isFormShowing={isFormShowing}
        workouts={workouts!}
      />

      {/* The map section */}
      {userPosition && (
        <Map
          userPosition={userPosition}
          workouts={workouts!}
          toggleForm={toggleForm}
          setWorkoutCoords={setWorkoutCoords}
        />
      )}
    </div>
  );
};

export default App;
