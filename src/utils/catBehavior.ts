import type { CatState, Direction } from '../types';

export class CatBehavior {
  private behaviorTimer = 0;
  private behaviorInterval = 0;
  private targetX = 0;
  private targetY = 0;
  private isWalking = false;
  private walkDistance = 0;

  constructor() {
    this.randomizeBehavior();
  }

  private randomizeBehavior() {
    // 隨機決定下一個行為 (3-8秒後)
    this.behaviorInterval = 3000 + Math.random() * 5000;
    this.behaviorTimer = 0;
    
    const behaviors = ['walk', 'sit', 'sleep', 'groom'];
    const behavior = behaviors[Math.floor(Math.random() * behaviors.length)];
    return behavior;
  }

  private getRandomDirection(): Direction {
    const directions: Direction[] = ['up', 'down', 'left', 'right'];
    return directions[Math.floor(Math.random() * directions.length)];
  }

  update(state: CatState, deltaTime: number): Partial<CatState> {
    const updates: Partial<CatState> = {};

    // 更新行為計時器
    this.behaviorTimer += deltaTime;

    // 狀態變化邏輯
    const now = Date.now();
    const timeSinceFed = (now - state.lastFed) / 1000;
    const timeSincePlayed = (now - state.lastPlayed) / 1000;
    const timeSinceSlept = (now - state.lastSlept) / 1000;

    // 飢餓度隨時間增加
    updates.hunger = Math.min(100, state.hunger + (timeSinceFed * 0.02));

    // 能量隨時間減少（睡眠除外）
    if (state.currentAction !== 'sleep') {
      updates.energy = Math.max(0, state.energy - (timeSincePlayed * 0.01));
    }

    // 根據狀態更新心情
    if (state.hunger > 80) {
      updates.mood = 'hungry';
    } else if (state.energy < 20) {
      updates.mood = 'sleepy';
    } else if (state.happiness > 75) {
      updates.mood = 'happy';
    }

    // 自動行為邏輯
    if (this.behaviorTimer > this.behaviorInterval) {
      const behavior = this.randomizeBehavior();
      
      if (behavior === 'walk' && Math.random() > 0.5) {
        updates.currentAction = 'walk';
        updates.direction = this.getRandomDirection();
        this.isWalking = true;
        this.walkDistance = 50 + Math.random() * 150;
      } else if (behavior === 'sleep' && state.energy < 50) {
        updates.currentAction = 'sleep';
      } else {
        updates.currentAction = 'idle';
      }
    }

    // 應用位置更新
    if (updates.currentAction === 'walk') {
      const moveSpeed = 2;
      const newPos = { ...state.position };

      switch (updates.direction || state.direction) {
        case 'up':
          newPos.y -= moveSpeed;
          break;
        case 'down':
          newPos.y += moveSpeed;
          break;
        case 'left':
          newPos.x -= moveSpeed;
          break;
        case 'right':
          newPos.x += moveSpeed;
          break;
      }

      // 邊界檢測
      newPos.x = Math.max(0, Math.min(newPos.x, window.innerWidth - 80));
      newPos.y = Math.max(0, Math.min(newPos.y, window.innerHeight - 80));

      updates.position = newPos;
      this.walkDistance -= moveSpeed;

      if (this.walkDistance <= 0) {
        updates.currentAction = 'idle';
        this.isWalking = false;
      }
    }

    // 睡眠恢復能量
    if (state.currentAction === 'sleep') {
      updates.energy = Math.min(100, state.energy + 0.5);
      updates.happiness = Math.min(100, state.happiness + 0.1);

      // 睡眠一段時間後自動醒來
      if (timeSinceSlept > 15) {
        updates.currentAction = 'idle';
      }
    }

    return updates;
  }
}
