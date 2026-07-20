// Game types and interfaces

export type Direction = 'up' | 'down' | 'left' | 'right';
export type CatMood = 'happy' | 'hungry' | 'sleepy' | 'playing' | 'angry';
export type ActionType = 'walk' | 'idle' | 'eat' | 'play' | 'sleep' | 'groom';

export interface Vector2 {
  x: number;
  y: number;
}

export interface CatState {
  position: Vector2;
  direction: Direction;
  hunger: number;        // 0-100
  energy: number;        // 0-100
  happiness: number;     // 0-100
  health: number;        // 0-100
  mood: CatMood;
  currentAction: ActionType;
  lastFed: number;
  lastPlayed: number;
  lastSlept: number;
  level: number;
  experience: number;
}

export interface AnimationFrame {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface AnimationSet {
  [key: string]: AnimationFrame[];
}

export interface GameConfig {
  windowWidth: number;
  windowHeight: number;
  catSize: number;
  updateInterval: number;
}
