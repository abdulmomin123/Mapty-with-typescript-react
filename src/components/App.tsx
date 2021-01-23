import { useState, useEffect } from 'react';
import { LatLngLiteral } from 'leaflet';
import { FormShowingProvider } from '../contexts/FormShowing.context';
import { WorkoutsProvider } from '../contexts/Workouts.context';
import styles from '../styles/App.module.css';
import Map from './Map';
import Sidebar from './Sidebar';

const App = () => {
  // Currently clicked position on the map
  const [workoutCoords, setWorkoutCoords] = useState<LatLngLiteral>();

  // Users coords
  const [userPosition, setUserPosition] = useState<LatLngLiteral>();

  // The current center view of the map
  const [mapCenter, setMapCenter] = useState<LatLngLiteral>();

  // If the user has clicked on a workout
  const [isWorkoutClicked, setWorkoutClicked] = useState(false);

  // Getting users coords
  useEffect(() => {
    const { geolocation } = navigator;

    if (!geolocation) return;

    geolocation.getCurrentPosition(
      ({ coords: { latitude: lat, longitude: lng } }) => {
        setUserPosition({ lat, lng });
        setMapCenter({ lat, lng });
      },
      () => alert('Could not get your location :(')
    );
  }, []);

  const changeMapCenter = (newCenter: LatLngLiteral) => setMapCenter(newCenter);

  return (
    <div className={styles.App}>
      {/* Context providers */}
      <WorkoutsProvider>
        <FormShowingProvider>
          {/* The sidear section */}
          <Sidebar
            workoutCoords={workoutCoords!}
            changeMapCenter={changeMapCenter}
            setWorkoutClicked={setWorkoutClicked}
          />

          {/* The map section */}
          {userPosition && mapCenter && (
            <Map
              userPosition={userPosition}
              mapCenter={mapCenter}
              isWorkoutClicked={isWorkoutClicked}
              setWorkoutCoords={setWorkoutCoords}
              changeMapCenter={changeMapCenter}
              setWorkoutClicked={setWorkoutClicked}
            />
          )}
        </FormShowingProvider>
      </WorkoutsProvider>
    </div>
  );
};

export default App;
