import React from 'react';
import { LatLngLiteral } from 'leaflet';
import * as Types from '../Types';
import styles from '../styles/WorkoutList.module.css';
import Workout from './Workout';

interface Props {
  workouts: Types.Workouts;
  changeMapCenter: (newCenter: LatLngLiteral) => void;
  removeWorkout: (id: string) => void;
  setWorkoutClicked: (state: boolean) => void;
}

const WorkoutList: React.FC<Props> = ({
  workouts,
  changeMapCenter,
  removeWorkout,
  setWorkoutClicked,
}) => {
  return (
    <ul className={styles.workoutList}>
      {workouts.map(workout => (
        <Workout
          key={workout.id}
          workout={workout}
          changeMapCenter={changeMapCenter}
          removeWorkout={removeWorkout}
          setWorkoutClicked={setWorkoutClicked}
        />
      ))}
    </ul>
  );
};

export default WorkoutList;
