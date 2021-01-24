import React, { useContext } from 'react';
import { WorkoutsContext } from '../contexts/Workouts.context';
import styles from '../styles/WorkoutList.module.css';
import WorkoutEditForm from './WorkoutEditForm';
import Workout from './Workout';

const WorkoutList: React.FC = () => {
  // Consuming context
  const { workouts } = useContext(WorkoutsContext);

  return (
    <ul className={styles.workoutList}>
      {workouts!.map(workout =>
        workout.isEditing ? (
          <WorkoutEditForm key={workout.id} workout={workout} />
        ) : (
          <Workout key={workout.id} workout={workout} />
        )
      )}
    </ul>
  );
};

export default WorkoutList;
