import React from 'react';
import { LatLngLiteral } from 'leaflet';
import * as Types from '../Types';
import styles from '../styles/WorkoutList.module.css';
import WorkoutEditForm from './WorkoutEditForm';
import Workout from './Workout';

interface Props {
  workouts: Types.Workouts;
  changeMapCenter: (newCenter: LatLngLiteral) => void;
  removeWorkout: (id: string) => void;
  setWorkoutClicked: (state: boolean) => void;
  editWorkout: (id: string) => void;
  updateWorkout: (update: Types.Running | Types.Cycling) => void;
}

const WorkoutList: React.FC<Props> = ({
  workouts,
  changeMapCenter,
  removeWorkout,
  setWorkoutClicked,
  editWorkout,
  updateWorkout,
}) => {
  return (
    <ul className={styles.workoutList}>
      {workouts.map(workout =>
        workout.isEditing ? (
          <WorkoutEditForm
            key={workout.id}
            workout={workout}
            updateWorkout={updateWorkout}
          />
        ) : (
          <Workout
            key={workout.id}
            workout={workout}
            changeMapCenter={changeMapCenter}
            removeWorkout={removeWorkout}
            setWorkoutClicked={setWorkoutClicked}
            editWorkout={editWorkout}
          />
        )
      )}
    </ul>
  );
};

export default WorkoutList;
