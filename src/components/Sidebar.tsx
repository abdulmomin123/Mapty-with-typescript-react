import React, { useContext } from 'react';
import { LatLngLiteral } from 'leaflet';
import { WorkoutsContext } from '../contexts/Workouts.context';
import logo from '../img/logo.png';
import styles from '../styles/Sidebar.module.css';
import WorkoutList from './WorkoutList';
import WorkoutForm from './WorkoutForm';

interface Props {
  workoutCoords: LatLngLiteral;
  changeMapCenter: (newCenter: LatLngLiteral) => void;
  setWorkoutClicked: (state: boolean) => void;
}

const Sidebar: React.FC<Props> = ({
  workoutCoords,
  changeMapCenter,
  setWorkoutClicked,
}) => {
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

      <WorkoutForm workoutCoords={workoutCoords} />

      <WorkoutList
        changeMapCenter={changeMapCenter}
        setWorkoutClicked={setWorkoutClicked}
      />
      <p className={styles.Copyright}>© Copyright by Abdul Momin</p>
    </div>
  );
};

export default Sidebar;
