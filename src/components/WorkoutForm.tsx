import React, { useContext, useState } from 'react';
import { v4 as uuid } from 'uuid';
import { WorkoutsContext } from '../contexts/Workouts.context';
import { WorkoutCoordsContext } from '../contexts/WorkoutCoords.context';
import useInput from '../hooks/useInput';
import { FromShowingContext } from '../contexts/FormShowing.context';
import * as Types from '../Types';
import styles from '../styles/WorkoutForms.module.css';
import months from '../months';

const WorkoutForm: React.FC = () => {
  // Consuming contexts
  const { isFormShowing, toggleForm } = useContext(FromShowingContext);
  const { dispatch } = useContext(WorkoutsContext);
  const { workoutCoords } = useContext(WorkoutCoordsContext);

  // Workout type
  const [workoutType, setworkoutType] = useState<Types.WorkoutType>('running');

  // Distance
  const [distance, setDistance, resetDistance] = useInput('');

  // Duration
  const [duration, setDuration, resetDuration] = useInput('');

  // Cadence
  const [cadence, setCadence, resetCadence] = useInput('');

  // Elevation Gain
  const [elevGain, setElevGain, resetElevGain] = useInput('');

  const handleTypeChange = (e: React.ChangeEvent) =>
    setworkoutType((e.target as HTMLInputElement).value as Types.WorkoutType);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const month = months[new Date().getMonth()];
    const day = new Date().getDate();

    const title = `${
      workoutType[0].toUpperCase() + workoutType.slice(1)
    } on ${month} ${day}`;

    const workout: Types.Workout = {
      id: uuid(),
      title,
      coords: workoutCoords!,
      distance: +distance,
      duration: +duration,
      isEditing: false,
    };

    if (workoutType === 'running') {
      const runningWorkout: Types.Running = {
        ...workout,
        type: 'running',
        emoji: '🏃‍♂️',
        cadence: +cadence,
      };
      dispatch!({ type: 'ADD', workout: runningWorkout });
    }

    if (workoutType === 'cycling') {
      const cyclingWorkout: Types.Cycling = {
        ...workout,
        type: 'cycling',
        emoji: '🚴‍♀️',
        elevationGain: +elevGain,
      };
      dispatch!({ type: 'ADD', workout: cyclingWorkout });
    }

    // Hiding the form
    toggleForm!();

    // Resetting all the inputs
    setworkoutType('running');
    resetDistance();
    resetDuration();
    resetCadence();
    resetElevGain();
  };

  return isFormShowing ? (
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

      <button className={`${styles.FormBtn} ${styles.AddBtn}`} type="submit">
        Add
      </button>
    </form>
  ) : null;
};

export default WorkoutForm;
