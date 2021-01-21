import React from 'react';
import * as Types from '../Types';
import styles from '../styles/WorkoutList.module.css';
import Workout from './Workout';

interface Props {
  workouts: Types.Workouts;
}

const WorkoutList: React.FC<Props> = ({ workouts }) => {
  return (
    <ul className={styles.workoutList}>
      {workouts.map(workout => (
        <Workout key={workout.id} workout={workout} />
      ))}
    </ul>
  );
};

export default WorkoutList;
