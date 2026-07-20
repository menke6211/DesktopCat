import type { AnimationFrame, Direction, ActionType } from '../types';

export class AnimationManager {
  private frameIndex = 0;
  private accumulator = 0;
  private animationDuration = 100; // ms per frame
  private currentAnimation: string = 'idle_down';
  private animations: Map<string, AnimationFrame[]> = new Map();

  constructor() {
    this.initializeAnimations();
  }

  private initializeAnimations() {
    // 向右行走 - 7幀
    this.animations.set('walk_right', [
      { x: 0, y: 0, width: 64, height: 64 },
      { x: 64, y: 0, width: 64, height: 64 },
      { x: 128, y: 0, width: 64, height: 64 },
      { x: 192, y: 0, width: 64, height: 64 },
      { x: 256, y: 0, width: 64, height: 64 },
      { x: 320, y: 0, width: 64, height: 64 },
      { x: 384, y: 0, width: 64, height: 64 }
    ]);

    // 向左行走 - 7幀
    this.animations.set('walk_left', [
      { x: 0, y: 64, width: 64, height: 64 },
      { x: 64, y: 64, width: 64, height: 64 },
      { x: 128, y: 64, width: 64, height: 64 },
      { x: 192, y: 64, width: 64, height: 64 },
      { x: 256, y: 64, width: 64, height: 64 },
      { x: 320, y: 64, width: 64, height: 64 },
      { x: 384, y: 64, width: 64, height: 64 }
    ]);

    // 向上行走 - 14幀
    this.animations.set('walk_up', [
      { x: 0, y: 128, width: 64, height: 64 },
      { x: 64, y: 128, width: 64, height: 64 },
      { x: 128, y: 128, width: 64, height: 64 },
      { x: 192, y: 128, width: 64, height: 64 },
      { x: 256, y: 128, width: 64, height: 64 },
      { x: 320, y: 128, width: 64, height: 64 },
      { x: 384, y: 128, width: 64, height: 64 },
      { x: 448, y: 128, width: 64, height: 64 },
      { x: 512, y: 128, width: 64, height: 64 },
      { x: 576, y: 128, width: 64, height: 64 },
      { x: 640, y: 128, width: 64, height: 64 },
      { x: 704, y: 128, width: 64, height: 64 },
      { x: 768, y: 128, width: 64, height: 64 },
      { x: 832, y: 128, width: 64, height: 64 }
    ]);

    // 向下行走 - 14幀
    this.animations.set('walk_down', [
      { x: 0, y: 192, width: 64, height: 64 },
      { x: 64, y: 192, width: 64, height: 64 },
      { x: 128, y: 192, width: 64, height: 64 },
      { x: 192, y: 192, width: 64, height: 64 },
      { x: 256, y: 192, width: 64, height: 64 },
      { x: 320, y: 192, width: 64, height: 64 },
      { x: 384, y: 192, width: 64, height: 64 },
      { x: 448, y: 192, width: 64, height: 64 },
      { x: 512, y: 192, width: 64, height: 64 },
      { x: 576, y: 192, width: 64, height: 64 },
      { x: 640, y: 192, width: 64, height: 64 },
      { x: 704, y: 192, width: 64, height: 64 },
      { x: 768, y: 192, width: 64, height: 64 },
      { x: 832, y: 192, width: 64, height: 64 }
    ]);

    // 待機動畫 - 10幀（坐著）
    this.animations.set('idle_down', [
      { x: 0, y: 256, width: 64, height: 64 },
      { x: 64, y: 256, width: 64, height: 64 },
      { x: 128, y: 256, width: 64, height: 64 },
      { x: 192, y: 256, width: 64, height: 64 },
      { x: 256, y: 256, width: 64, height: 64 },
      { x: 320, y: 256, width: 64, height: 64 },
      { x: 384, y: 256, width: 64, height: 64 },
      { x: 448, y: 256, width: 64, height: 64 },
      { x: 512, y: 256, width: 64, height: 64 },
      { x: 576, y: 256, width: 64, height: 64 }
    ]);

    // 睡眠動畫
    this.animations.set('sleep', [
      { x: 640, y: 256, width: 64, height: 64 },
      { x: 704, y: 256, width: 64, height: 64 },
      { x: 768, y: 256, width: 64, height: 64 },
      { x: 832, y: 256, width: 64, height: 64 }
    ]);
  }

  setAnimation(key: string) {
    if (this.currentAnimation !== key && this.animations.has(key)) {
      this.currentAnimation = key;
      this.frameIndex = 0;
      this.accumulator = 0;
    }
  }

  update(deltaTime: number): AnimationFrame | null {
    this.accumulator += deltaTime;

    const frames = this.animations.get(this.currentAnimation);
    if (!frames) return null;

    if (this.accumulator >= this.animationDuration) {
      this.accumulator -= this.animationDuration;
      this.frameIndex = (this.frameIndex + 1) % frames.length;
    }

    return frames[this.frameIndex];
  }

  getCurrentFrame(): AnimationFrame | null {
    return this.animations.get(this.currentAnimation)?.[this.frameIndex] || null;
  }

  setAnimationSpeed(speed: number) {
    this.animationDuration = Math.max(50, Math.min(500, speed));
  }
}
