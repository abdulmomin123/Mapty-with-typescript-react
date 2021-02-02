import { useState, useEffect } from 'react';
import { LatLngLiteral } from 'leaflet';
import { FormShowingProvider } from '../contexts/FormShowing.context';
import { WorkoutsProvider } from '../contexts/Workouts.context';
import { WorkoutCoordsProvider } from '../contexts/WorkoutCoords.context';
import { MapCenterProvider } from '../contexts/MapCenter.context';
import { WorkoutClickedProvider } from '../contexts/WorkoutClicked.context';
import styles from '../styles/App.module.css';
import Map from './Map';
import Sidebar from './Sidebar';

const App = () => {
  // Checking if users location is available
  const [usersLocation, setUsersLocation] = useState<LatLngLiteral>();

  // Getting users coords
  useEffect(() => {
    const { geolocation } = navigator;

    if (!geolocation) return alert('Could not get your location :(');

    geolocation.getCurrentPosition(
      ({ coords: { latitude: lat, longitude: lng } }) => {
        setUsersLocation({ lat, lng });
      },
      () => alert('Could not get your location :(')
    );
  }, []);

  return (
    <div className={styles.App}>
      {/* Context providers */}
      <WorkoutsProvider>
        <FormShowingProvider>
          <WorkoutCoordsProvider>
            <MapCenterProvider>
              <WorkoutClickedProvider>
                {/* The sidear section */}
                <Sidebar />

                {/* The map section */}
                {usersLocation && <Map usersLocation={usersLocation} />}
              </WorkoutClickedProvider>
            </MapCenterProvider>
          </WorkoutCoordsProvider>
        </FormShowingProvider>
      </WorkoutsProvider>
    </div>
  );
};

export default App;
