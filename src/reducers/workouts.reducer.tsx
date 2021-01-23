import React from 'react';
import * as Types from '../Types';

const reducer: React.Reducer<Types.Workouts, Types.WorkoutActions> = (
  workouts,
  { type, id, workout, update }
) => {
  switch (type) {
    case 'ADD':
      return [workout!, ...workouts];
    case 'REMOVE':
      return workouts.filter(workout => workout.id !== id);
    case 'REMOVE_ALL':
      return [];
    case 'EDIT':
      return workouts.map(workout =>
        workout.id === id
          ? { ...workout, isEditing: !workout.isEditing }
          : workout
      );
    case 'UPDATE':
      const newWorkouts = [...workouts];
      const indexOfOldWorkout = newWorkouts.findIndex(
        workout => workout.id === update!.id
      );
      newWorkouts.splice(indexOfOldWorkout, 1, update!);
      return newWorkouts;
    default:
      return workouts;
  }
};

export default reducer;
