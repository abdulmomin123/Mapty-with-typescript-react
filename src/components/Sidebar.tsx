import React from 'react';
import * as Types from '../Types';
import logo from '../img/logo.png';
import styles from '../styles/Sidebar.module.css';
import WorkoutList from './WorkoutList';
import { LatLngLiteral } from 'leaflet';
import WorkoutForm from './WorkoutForm';

interface Props {
  workouts: Types.Workouts;
  isFormShowing: boolean;
  workoutCoords: LatLngLiteral;
  addWorkout: (workout: Types.Running | Types.Cycling) => void;
  toggleForm: () => void;
  changeMapCenter: (newCenter: LatLngLiteral) => void;
  removeWorkout: (id: string) => void;
  removeAllWorkouts: () => void;
}

const Sidebar: React.FC<Props> = ({
  isFormShowing,
  workoutCoords,
  workouts,
  addWorkout,
  toggleForm,
  changeMapCenter,
  removeWorkout,
  removeAllWorkouts,
}) => {
  return (
    <div className={styles.Sidebar}>
      <img src={logo} alt="Mapty Logo" className={styles.Logo} />

      {/* Delete all btn */}
      {workouts.length ? (
        <button onClick={removeAllWorkouts} className={styles.DeleteAll}>
          Delete All Workouts
        </button>
      ) : null}

      <WorkoutForm
        isFormShowing={isFormShowing}
        workoutCoords={workoutCoords}
        addWorkout={addWorkout}
        toggleForm={toggleForm}
      />
      <WorkoutList
        removeWorkout={removeWorkout}
        changeMapCenter={changeMapCenter}
        workouts={workouts}
      />
      <p className={styles.Copyright}>© Copyright by Abdul Momin</p>
    </div>
  );
};

export default Sidebar;
