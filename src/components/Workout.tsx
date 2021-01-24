import React, { useContext } from 'react';
import { WorkoutsContext } from '../contexts/Workouts.context';
import { MapCenterContext } from '../contexts/MapCenter.context';
import { WorkoutClickedContext } from '../contexts/WorkoutClicked.context';
import * as Types from '../Types';
import styles from '../styles/Workout.module.css';

interface Props {
  workout: Types.Running | Types.Cycling;
}

const Workout: React.FC<Props> = ({ workout }) => {
  // Consuming contexts
  const { dispatch } = useContext(WorkoutsContext);
  const { setMapCenter } = useContext(MapCenterContext);
  const { setWorkoutClicked } = useContext(WorkoutClickedContext);

  const { id, coords, type, title, distance, duration, emoji } = workout;
  const { cadence } = workout as Types.Running;
  const { elevationGain } = workout as Types.Cycling;

  return (
    <li
      onClick={() => {
        setMapCenter!(coords);
        setWorkoutClicked!(true);
      }}
      className={`${styles.workout} ${
        type === 'running' ? styles.running : styles.cycling
      }`}
    >
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.details}>
        <span className={styles.icon}>{emoji}</span>
        <span className={styles.value}>{distance}</span>
        <span className={styles.unit}>KM</span>
      </div>
      <div className={styles.details}>
        <span className={styles.icon}>⏱</span>
        <span className={styles.value}>{duration}</span>
        <span className={styles.unit}>MIN</span>
      </div>

      {type === 'running' ? (
        <>
          <div className={styles.details}>
            <span className={styles.icon}>⚡️</span>
            <span className={styles.value}>
              {(distance / duration).toFixed(1)}
            </span>
            <span className={styles.unit}>MIN/KM</span>
          </div>

          <div className={styles.details}>
            <span className={styles.icon}>🦶🏼</span>
            <span className={styles.value}>{cadence}</span>
            <span className={styles.unit}>SPM</span>
          </div>
        </>
      ) : (
        <>
          <div className={styles.details}>
            <span className={styles.icon}>⚡️</span>
            <span className={styles.value}>
              {(distance / (duration / 60)).toFixed(1)}
            </span>
            <span className={styles.unit}>KM/H</span>
          </div>

          <div className={styles.details}>
            <span className={styles.icon}>⛰</span>
            <span className={styles.value}>{elevationGain}</span>
            <span className={styles.unit}>M</span>
          </div>
        </>
      )}

      {/* Edit and delete button */}
      <div className={styles.actions}>
        <button
          onClick={() => dispatch!({ type: 'EDIT', id })}
          className={`${styles.btn} ${styles.edit}`}
        >
          Edit
        </button>
        <button
          onClick={() => dispatch!({ type: 'REMOVE', id })}
          className={`${styles.btn} ${styles.delete}`}
        >
          Delete
        </button>
      </div>
    </li>
  );
};

export default Workout;
