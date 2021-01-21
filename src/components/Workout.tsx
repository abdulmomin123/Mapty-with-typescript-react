import React from 'react';
import * as Types from '../Types';
import styles from '../styles/Workout.module.css';

interface Props {
  workout: Types.Running | Types.Cycling;
}

const Workout: React.FC<Props> = ({ workout }) => {
  return (
    <li className={`${styles.workout} ${workout.type}`}>
      <h2 className={styles.title}>{workout.title}</h2>
      <div className={styles.details}>
        <span className={styles.icon}>{workout.emoji}</span>
        <span className={styles.value}>{workout.distance}</span>
        <span className={styles.unit}>km</span>
      </div>
      <div className={styles.details}>
        <span className={styles.icon}>⏱</span>
        <span className={styles.value}>{workout.duration}</span>
        <span className={styles.unit}>min</span>
      </div>

      <div className={styles.details}>
        <span className={styles.icon}>⚡️</span>
        <span className={styles.value}>
          {(workout as Types.Running).cadence}
        </span>
        <span className={styles.unit}>min/km</span>
      </div>
      <div className={styles.details}>
        <span className={styles.icon}>🦶🏼</span>
        <span className={styles.value}>
          {(workout as Types.Cycling).elevationGain}
        </span>
        <span className={styles.unit}>spm</span>
      </div>
    </li>
  );
};

export default Workout;
