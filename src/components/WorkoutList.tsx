import React, { useContext } from 'react';
import { LatLngLiteral } from 'leaflet';
import { WorkoutsContext } from '../contexts/Workouts.context';
import styles from '../styles/WorkoutList.module.css';
import WorkoutEditForm from './WorkoutEditForm';
import Workout from './Workout';

interface Props {
  changeMapCenter: (newCenter: LatLngLiteral) => void;
  setWorkoutClicked: (state: boolean) => void;
}

const WorkoutList: React.FC<Props> = ({
  changeMapCenter,
  setWorkoutClicked,
}) => {
  // Consuming context
  const { workouts } = useContext(WorkoutsContext);

  return (
    <ul className={styles.workoutList}>
      {workouts!.map(workout =>
        workout.isEditing ? (
          <WorkoutEditForm key={workout.id} workout={workout} />
        ) : (
          <Workout
            key={workout.id}
            workout={workout}
            changeMapCenter={changeMapCenter}
            setWorkoutClicked={setWorkoutClicked}
          />
        )
      )}
    </ul>
  );
};

export default WorkoutList;
