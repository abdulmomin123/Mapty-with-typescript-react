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
}

const Sidebar: React.FC<Props> = ({
  isFormShowing,
  workoutCoords,
  workouts,
  addWorkout,
  toggleForm,
}) => {
  return (
    <div className={styles.Sidebar}>
      <img src={logo} alt="Mapty Logo" className={styles.Logo} />
      <WorkoutList workouts={workouts} />
      <WorkoutForm
        isFormShowing={isFormShowing}
        workoutCoords={workoutCoords}
        addWorkout={addWorkout}
        toggleForm={toggleForm}
      />
      <p className={styles.Copyright}>© Copyright by Abdul Momin</p>
    </div>
  );
};

export default Sidebar;
