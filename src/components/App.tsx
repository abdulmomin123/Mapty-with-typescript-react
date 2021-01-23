import { useState, useEffect } from 'react';
import { LatLngLiteral } from 'leaflet';
import useLocalStorage from '../hooks/useLocalStorage';
import useToggle from '../hooks/useToggle';
import * as Types from '../Types';
import styles from '../styles/App.module.css';
import Map from './Map';
import Sidebar from './Sidebar';

const App = () => {
  // Workouts
  const [workouts, setWorkouts] = useLocalStorage('maptyWorkouts', []);

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

  const editWorkout = (id: string) =>
    setWorkouts(
      workouts.map(workout =>
        workout.id === id
          ? { ...workout, isEditing: !workout.isEditing }
          : workout
      )
    );

  const updateWorkout = (update: Types.Running | Types.Cycling) => {
    const newWorkouts = [...workouts];
    const indexOfOldWorkout = newWorkouts.findIndex(
      workout => workout.id === update.id
    );
    newWorkouts.splice(indexOfOldWorkout, 1, update);

    setWorkouts(newWorkouts);
  };

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
        editWorkout={editWorkout}
        updateWorkout={updateWorkout}
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
