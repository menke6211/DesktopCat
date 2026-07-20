import fs from 'fs';
import path from 'path';
import { app } from 'electron';
import type { CatState, Vector2 } from '../types';
import { CatBehavior } from './catBehavior';

export class CatStateManager {
  private stateFile: string;
  private state: CatState;
  private behavior: CatBehavior;
  private updateTimer: NodeJS.Timer | null = null;

  constructor() {
    const userDataPath = app.getPath('userData');
    this.stateFile = path.join(userDataPath, 'cat-state.json');
    this.state = this.loadStateFromFile();
    this.behavior = new CatBehavior();
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
    const now = Date.now();
    return {
      position: { x: 100, y: 100 },
      direction: 'down',
      hunger: 50,
      energy: 70,
      happiness: 60,
      health: 100,
      mood: 'happy',
      currentAction: 'idle',
      lastFed: now,
      lastPlayed: now,
      lastSlept: now,
      level: 1,
      experience: 0
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
    } else if (this.state.happiness < 30) {
      this.state.mood = 'angry';
    } else {
      this.state.mood = 'happy';
    }
  }

  getState(): CatState {
    // 應用自動行為更新
    const behaviorUpdates = this.behavior.update(this.state, 16);
    Object.assign(this.state, behaviorUpdates);
    this.updateMood();
    return this.state;
  }

  setState(newState: Partial<CatState>): void {
    this.state = { ...this.state, ...newState };
    this.updateMood();
    this.saveStateToFile();
  }

  feedCat(): CatState {
    if (this.state.hunger < 10) {
      this.state.health = Math.max(0, this.state.health - 5);
    }

    this.state.hunger = Math.max(0, this.state.hunger - 40);
    this.state.happiness = Math.min(100, this.state.happiness + 15);
    this.state.lastFed = Date.now();
    this.state.currentAction = 'eat';
    this.state.experience = Math.min(999, this.state.experience + 10);
    this.updateMood();
    this.saveStateToFile();
    return this.state;
  }

  playCat(): CatState {
    if (this.state.energy < 20) {
      this.state.happiness = Math.max(0, this.state.happiness - 10);
      this.state.health = Math.max(0, this.state.health - 5);
      return this.state;
    }

    this.state.energy = Math.max(0, this.state.energy - 30);
    this.state.happiness = Math.min(100, this.state.happiness + 25);
    this.state.hunger = Math.min(100, this.state.hunger + 10);
    this.state.lastPlayed = Date.now();
    this.state.currentAction = 'play';
    this.state.experience = Math.min(999, this.state.experience + 20);
    this.updateMood();
    this.saveStateToFile();
    return this.state;
  }

  sleepCat(): CatState {
    this.state.currentAction = 'sleep';
    this.state.energy = Math.min(100, this.state.energy + 60);
    this.state.happiness = Math.min(100, this.state.happiness + 10);
    this.state.lastSlept = Date.now();
    this.state.mood = 'sleepy';
    this.saveStateToFile();
    return this.state;
  }

  groomCat(): CatState {
    this.state.currentAction = 'groom';
    this.state.health = Math.min(100, this.state.health + 20);
    this.state.happiness = Math.min(100, this.state.happiness + 5);
    this.state.experience = Math.min(999, this.state.experience + 5);
    this.updateMood();
    this.saveStateToFile();
    return this.state;
  }

  updatePosition(x: number, y: number): CatState {
    this.state.position = { x, y };
    this.saveStateToFile();
    return this.state;
  }

  updateDirection(direction: 'up' | 'down' | 'left' | 'right'): CatState {
    this.state.direction = direction;
    return this.state;
  }
}
