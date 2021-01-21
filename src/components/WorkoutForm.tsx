import React, { useState } from 'react';
import styles from '../styles/WorkoutForm.module.css';

interface Props {
  isFormShowing: boolean;
}

const WorkoutForm: React.FC<Props> = ({ isFormShowing }) => {
  // Workout type
  // @ts-ignore
  const [value, setValue] = useState('running');

  const handleChange = (e: React.ChangeEvent) =>
    setValue((e.target as HTMLSelectElement).value);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={isFormShowing ? styles.Form : styles.FormHidden}
    >
      <div className={styles.FormRow}>
        <label className={styles.FormLabel}>Type</label>
        <select
          onChange={handleChange}
          value={value}
          className={`${styles.FormInput}`}
        >
          <option value="running">Running</option>
          <option value="cycling">Cycling</option>
        </select>
      </div>

      <div className={styles.FormRow}>
        <label className={styles.FormLabel}>Distance</label>
        <input className={`${styles.FormInput}`} placeholder="km" />
      </div>

      <div className={styles.FormRow}>
        <label className={styles.FormLabel}>Duration</label>
        <input className={`${styles.FormInput}`} placeholder="min" />
      </div>

      <div className={styles.FormRow}>
        <label className={styles.FormLabel}>Cadence</label>
        <input className={`${styles.FormInput}`} placeholder="step/min" />
      </div>

      <div className={`${styles.FormRow} ${styles.FormRowHidden}`}>
        <label className={styles.FormLabel}>Elev Gain</label>
        <input className={`${styles.FormInput}`} placeholder="meters" />
      </div>

      <button className={styles.FormBtn} type="submit">
        Add
      </button>
    </form>
  );
};

export default WorkoutForm;
