import React, { useContext } from 'react';
import { WorkoutsContext } from '../contexts/Workouts.context';
import logo from '../img/logo.png';
import styles from '../styles/Sidebar.module.css';
import WorkoutList from './WorkoutList';
import WorkoutForm from './WorkoutForm';

const Sidebar: React.FC = () => {
  // Consuming context
  const { workouts, dispatch } = useContext(WorkoutsContext);

  return (
    <div className={styles.Sidebar}>
      <img src={logo} alt="Mapty Logo" className={styles.Logo} />

      {/* Delete all btn */}
      {workouts!.length ? (
        <button
          onClick={() => dispatch!({ type: 'REMOVE_ALL' })}
          className={styles.DeleteAll}
        >
          Delete All Workouts
        </button>
      ) : null}

      <WorkoutForm />

      <WorkoutList />
      <p className={styles.Copyright}>© Copyright by Abdul Momin</p>
    </div>
  );
};

export default Sidebar;
