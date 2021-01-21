import { LatLngLiteral } from 'leaflet';

export type Coords = [number, number];

interface Workout {
  id: string;
  title: string;
  coords: LatLngLiteral;
  distance: number;
  duration: number;
}

export interface Running extends Workout {
  type: 'running';
  cadence: number;
}

export interface Cycling extends Workout {
  type: 'cycling';
  elevationGain: number;
}

export type Workouts = [Running, Cycling];
