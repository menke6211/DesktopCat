import fs from 'fs';
import path from 'path';
import { app } from 'electron';

interface CatState {
  x: number;
  y: number;
  hunger: number;
  energy: number;
  happiness: number;
  mood: 'happy' | 'hungry' | 'sleepy' | 'playing';
  lastFed: number;
  lastPlayed: number;
}

export class CatStateManager {
  private stateFile: string;
  private state: CatState;

  constructor() {
    const userDataPath = app.getPath('userData');
    this.stateFile = path.join(userDataPath, 'cat-state.json');
    this.state = this.loadStateFromFile();
  }

  private loadStateFromFile(): CatState {
    try {
      if (fs.existsSync(this.stateFile)) {
        const data = fs.readFileSync(this.stateFile, 'utf-8');
        return JSON.parse(data);
      }
    } catch (error) {
      console.error('Failed to load cat state:', error);
    }

    return this.getDefaultState();
  }

  private getDefaultState(): CatState {
    return {
      x: 100,
      y: 100,
      hunger: 50,
      energy: 70,
      happiness: 60,
      mood: 'happy',
      lastFed: Date.now(),
      lastPlayed: Date.now(),
    };
  }

  private saveStateToFile(): void {
    try {
      const userDataPath = app.getPath('userData');
      if (!fs.existsSync(userDataPath)) {
        fs.mkdirSync(userDataPath, { recursive: true });
      }
      fs.writeFileSync(this.stateFile, JSON.stringify(this.state, null, 2));
    } catch (error) {
      console.error('Failed to save cat state:', error);
    }
  }

  private updateMood(): void {
    if (this.state.hunger > 80) {
      this.state.mood = 'hungry';
    } else if (this.state.energy < 30) {
      this.state.mood = 'sleepy';
    } else if (this.state.happiness > 75) {
      this.state.mood = 'happy';
    } else {
      this.state.mood = 'happy';
    }
  }

  getState(): CatState {
    // Simulate state changes over time
    const now = Date.now();
    const timeSinceLastFed = (now - this.state.lastFed) / 1000; // in seconds
    const timeSinceLastPlayed = (now - this.state.lastPlayed) / 1000;

    // Hunger increases over time
    this.state.hunger = Math.min(100, this.state.hunger + timeSinceLastFed * 0.01);

    // Energy decreases over time if not sleeping
    if (this.state.mood !== 'sleepy') {
      this.state.energy = Math.max(0, this.state.energy - timeSinceLastPlayed * 0.005);
    }

    // Happiness decreases if hungry or tired
    if (this.state.hunger > 70 || this.state.energy < 30) {
      this.state.happiness = Math.max(0, this.state.happiness - 0.1);
    }

    this.updateMood();
    return this.state;
  }

  setState(newState: Partial<CatState>): void {
    this.state = { ...this.state, ...newState };
    this.updateMood();
    this.saveStateToFile();
  }

  feedCat(): CatState {
    this.state.hunger = Math.max(0, this.state.hunger - 30);
    this.state.happiness = Math.min(100, this.state.happiness + 10);
    this.state.lastFed = Date.now();
    this.updateMood();
    this.saveStateToFile();
    return this.state;
  }

  playCat(): CatState {
    if (this.state.energy < 20) {
      this.state.happiness = Math.max(0, this.state.happiness - 10);
      return this.state;
    }

    this.state.energy = Math.max(0, this.state.energy - 25);
    this.state.happiness = Math.min(100, this.state.happiness + 20);
    this.state.hunger = Math.min(100, this.state.hunger + 5);
    this.state.lastPlayed = Date.now();
    this.state.mood = 'playing';
    this.updateMood();
    this.saveStateToFile();
    return this.state;
  }

  sleepCat(): CatState {
    this.state.mood = 'sleepy';
    this.state.energy = Math.min(100, this.state.energy + 50);
    this.state.happiness = Math.min(100, this.state.happiness + 5);
    this.updateMood();
    this.saveStateToFile();
    return this.state;
  }
}
