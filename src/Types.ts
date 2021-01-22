import { LatLngLiteral } from 'leaflet';

export interface Workout {
  id: string;
  title: string;
  coords: LatLngLiteral;
  distance: number;
  duration: number;
  isEditing: boolean;
}

export interface Running extends Workout {
  type: 'running';
  emoji: '🏃‍♂️';
  cadence: number;
}

export interface Cycling extends Workout {
  type: 'cycling';
  emoji: '🚴‍♀️';
  elevationGain: number;
}

export type Workouts = (Running | Cycling)[];

export type WorkoutType = 'running' | 'cycling';
