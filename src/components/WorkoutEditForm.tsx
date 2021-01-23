import React, { useContext, useState } from 'react';
import * as Types from '../Types';
import { WorkoutsContext } from '../contexts/Workouts.context';
import styles from '../styles/WorkoutForms.module.css';
import useInput from '../hooks/useInput';
import months from '../months';

interface Props {
  workout: Types.Running | Types.Cycling;
}

const WorkoutEditForm: React.FC<Props> = ({ workout }) => {
  // Consuming contexts
  const { dispatch } = useContext(WorkoutsContext);

  const { id, coords } = workout;

  // Workout type
  const [workoutType, setworkoutType] = useState<Types.WorkoutType>(
    workout.type
  );

  // Distance
  const [distance, setDistance] = useInput(`${workout.distance}`);

  // Duration
  const [duration, setDuration] = useInput(`${workout.duration}`);

  // Cadence
  const [cadence, setCadence] = useInput(
    `${(workout as Types.Running).cadence}`
  );

  // Elevation Gain
  const [elevGain, setElevGain] = useInput(
    `${(workout as Types.Cycling).elevationGain}`
  );

  const handleTypeChange = (e: React.ChangeEvent) =>
    setworkoutType((e.target as HTMLInputElement).value as Types.WorkoutType);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const month = months[new Date().getMonth()];
    const day = new Date().getDate();

    const title = `${
      workoutType[0].toUpperCase() + workoutType.slice(1)
    } on ${month} ${day}`;

    const update: Types.Workout = {
      id,
      title,
      coords,
      distance: +distance,
      duration: +duration,
      isEditing: false,
    };

    if (workoutType === 'running') {
      const runningWorkout: Types.Running = {
        ...update,
        type: 'running',
        emoji: '🏃‍♂️',
        cadence: +cadence,
      };

      // updating the workout
      dispatch!({ type: 'UPDATE', update: runningWorkout });
    }

    if (workoutType === 'cycling') {
      const cyclingWorkout: Types.Cycling = {
        ...update,
        type: 'cycling',
        emoji: '🚴‍♀️',
        elevationGain: +elevGain,
      };

      // updating the workout
      dispatch!({ type: 'UPDATE', update: cyclingWorkout });
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.Form}>
      <div className={styles.FormRow}>
        <label className={styles.FormLabel}>Type</label>
        <select
          onChange={handleTypeChange}
          value={workoutType}
          className={styles.FormInput}
        >
          <option value="running">Running</option>
          <option value="cycling">Cycling</option>
        </select>
      </div>

      <div className={styles.FormRow}>
        <label className={styles.FormLabel}>Distance</label>
        <input
          type="number"
          min={0}
          required
          value={distance}
          onChange={({ target: { value } }) => setDistance(value)}
          className={styles.FormInput}
          placeholder="km"
        />
      </div>

      <div className={styles.FormRow}>
        <label className={styles.FormLabel}>Duration</label>
        <input
          type="number"
          min={0}
          required
          value={duration}
          onChange={({ target: { value } }) => setDuration(value)}
          className={styles.FormInput}
          placeholder="min"
        />
      </div>

      {workoutType === 'running' ? (
        <div className={styles.FormRow}>
          <label className={styles.FormLabel}>Cadence</label>
          <input
            type="number"
            min={0}
            required
            value={cadence}
            onChange={({ target: { value } }) => setCadence(value)}
            className={styles.FormInput}
            placeholder="step/min"
          />
        </div>
      ) : workoutType === 'cycling' ? (
        <div className={styles.FormRow}>
          <label className={styles.FormLabel}>Elev Gain</label>
          <input
            type="number"
            min={0}
            required
            value={elevGain}
            onChange={({ target: { value } }) => setElevGain(value)}
            className={styles.FormInput}
            placeholder="meters"
          />
        </div>
      ) : null}

      <button className={`${styles.FormBtn} ${styles.SaveBtn}`} type="submit">
        Save
      </button>
    </form>
  );
};

export default WorkoutEditForm;
