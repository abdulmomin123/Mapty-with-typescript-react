import React from 'react';
import * as Types from '../Types';
import styles from '../styles/Workout.module.css';
import { LatLngLiteral } from 'leaflet';

interface Props {
  workout: Types.Running | Types.Cycling;
  changeMapCenter: (newCenter: LatLngLiteral) => void;
  removeWorkout: (id: string) => void;
}

const Workout: React.FC<Props> = ({
  workout,
  changeMapCenter,
  removeWorkout,
}) => {
  return (
    <li
      onClick={() => changeMapCenter(workout.coords)}
      className={`${styles.workout} ${
        workout.type === 'running' ? styles.running : styles.cycling
      }`}
    >
      <h2 className={styles.title}>{workout.title}</h2>
      <div className={styles.details}>
        <span className={styles.icon}>{workout.emoji}</span>
        <span className={styles.value}>{workout.distance}</span>
        <span className={styles.unit}>KM</span>
      </div>
      <div className={styles.details}>
        <span className={styles.icon}>⏱</span>
        <span className={styles.value}>{workout.duration}</span>
        <span className={styles.unit}>MIN</span>
      </div>

      {workout.type === 'running' ? (
        <>
          <div className={styles.details}>
            <span className={styles.icon}>⚡️</span>
            <span className={styles.value}>
              {(workout.distance / workout.duration).toFixed(1)}
            </span>
            <span className={styles.unit}>MIN/KM</span>
          </div>

          <div className={styles.details}>
            <span className={styles.icon}>🦶🏼</span>
            <span className={styles.value}>{workout.cadence}</span>
            <span className={styles.unit}>SPM</span>
          </div>
        </>
      ) : (
        <>
          <div className={styles.details}>
            <span className={styles.icon}>⚡️</span>
            <span className={styles.value}>
              {(workout.distance / (workout.duration / 60)).toFixed(1)}
            </span>
            <span className={styles.unit}>KM/H</span>
          </div>

          <div className={styles.details}>
            <span className={styles.icon}>⛰</span>
            <span className={styles.value}>{workout.elevationGain}</span>
            <span className={styles.unit}>M</span>
          </div>
        </>
      )}

      {/* Edit and delete button */}
      <div className={styles.actions}>
        <button className={`${styles.btn} ${styles.edit}`}>Edit</button>
        <button
          onClick={() => removeWorkout(workout.id)}
          className={`${styles.btn} ${styles.delete}`}
        >
          Delete
        </button>
      </div>
    </li>
  );
};

export default Workout;
