import { useState, useEffect } from 'react';
import { LatLngLiteral } from 'leaflet';
import * as Types from '../Types';
import useToggle from '../hooks/useToggle';
import styles from '../styles/App.module.css';
import Map from './Map';
import Sidebar from './Sidebar';

const App = () => {
  // Workouts
  const [workouts, setWorkouts] = useState<Types.Workouts>([]);

  // Currently clicked position on the map
  const [workoutCoords, setWorkoutCoords] = useState<LatLngLiteral>();

  // Form toggler
  const [isFormShowing, toggleForm] = useToggle(false);

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

  // Add a workout
  const addWorkout = (workout: Types.Running | Types.Cycling) =>
    setWorkouts([workout, ...workouts]);

  const removeWorkout = (id: string) =>
    setWorkouts(workouts.filter(workout => workout.id !== id));

  const removeAllWorkouts = () => setWorkouts([]);

  const changeMapCenter = (newCenter: LatLngLiteral) => setMapCenter(newCenter);

  return (
    <div className={styles.App}>
      {/* The sidear section */}
      <Sidebar
        workoutCoords={workoutCoords!}
        isFormShowing={isFormShowing}
        workouts={workouts!}
        addWorkout={addWorkout}
        toggleForm={toggleForm}
        changeMapCenter={changeMapCenter}
        removeWorkout={removeWorkout}
        removeAllWorkouts={removeAllWorkouts}
        setWorkoutClicked={setWorkoutClicked}
      />

      {/* The map section */}
      {userPosition && mapCenter && (
        <Map
          userPosition={userPosition}
          mapCenter={mapCenter}
          workouts={workouts!}
          isWorkoutClicked={isWorkoutClicked}
          toggleForm={toggleForm}
          setWorkoutCoords={setWorkoutCoords}
          changeMapCenter={changeMapCenter}
          setWorkoutClicked={setWorkoutClicked}
        />
      )}
    </div>
  );
};

export default App;
