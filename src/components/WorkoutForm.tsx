import React, { useState } from 'react';
import { v4 as uuid } from 'uuid';
import { LatLngLiteral } from 'leaflet';
import * as Types from '../Types';
import styles from '../styles/WorkoutForm.module.css';
import useInput from '../hooks/useInput';

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

interface Props {
  workoutCoords: LatLngLiteral;
  addWorkout: (workout: Types.Running | Types.Cycling) => void;
  toggleForm: () => void;
}

const WorkoutForm: React.FC<Props> = ({
  workoutCoords,
  addWorkout,
  toggleForm,
}) => {
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
      coords: workoutCoords,
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
      addWorkout(runningWorkout);
    }

    if (workoutType === 'cycling') {
      const cyclingWorkout: Types.Cycling = {
        ...workout,
        type: 'cycling',
        emoji: '🚴‍♀️',
        elevationGain: +elevGain,
      };
      addWorkout(cyclingWorkout);
    }

    // Resetting all the values
    setworkoutType('running');
    resetDistance();
    resetDuration();
    resetCadence();
    resetElevGain();

    // Hiding the form
    toggleForm();
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

      <button className={styles.FormBtn} type="submit">
        Add
      </button>
    </form>
  );
};

export default WorkoutForm;
