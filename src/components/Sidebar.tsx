import React from 'react';
import * as Types from '../Types';
import logo from '../img/logo.png';
import styles from '../styles/Sidebar.module.css';
import WorkoutList from './WorkoutList';

interface Props {
  workouts: Types.Workouts | [];
}

const Sidebar: React.FC<Props> = () => {
  return (
    <div className={styles.Sidebar}>
      <img src={logo} alt="Mapty Logo" className={styles.Logo} />

      <WorkoutList />

      <p className={styles.Copyright}>© Copyright by Abdul Momin</p>
    </div>
  );
};

export default Sidebar;
