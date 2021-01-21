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
}

const Sidebar: React.FC<Props> = ({ isFormShowing }) => {
  return (
    <div className={styles.Sidebar}>
      <img src={logo} alt="Mapty Logo" className={styles.Logo} />

      <WorkoutList />

      <WorkoutForm isFormShowing={isFormShowing} />

      <p className={styles.Copyright}>© Copyright by Abdul Momin</p>
    </div>
  );
};

export default Sidebar;
