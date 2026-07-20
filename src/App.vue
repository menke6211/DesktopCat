<template>
  <div class="app-container">
    <!-- 遊戲視窗 -->
    <div class="game-window" @mousemove="onMouseMove" @mouseup="onMouseUp" @mouseleave="onMouseUp">
      <!-- 貓咪容器 -->
      <div
        class="cat-container"
        :style="{
          left: catState.position.x + 'px',
          top: catState.position.y + 'px'
        }"
        @mousedown="onMouseDown"
      >
        <!-- 貓咪精靈 -->
        <canvas
          ref="catCanvas"
          class="cat-canvas"
          width="80"
          height="80"
          @click="onCatClick"
        />

        <!-- 狀態氣泡 -->
        <div v-if="showStatusBubble" class="status-bubble">
          <div class="bubble-text">{{ moodEmoji }}</div>
        </div>
      </div>

      <!-- UI 面板 -->
      <div class="ui-panel">
        <!-- 頂部 - 狀態條 -->
        <div class="status-bar-section">
          <div class="level-info">
            <span class="level">Lv.{{ catState.level }}</span>
            <span class="exp">{{ catState.experience }}/100 EXP</span>
          </div>

          <div class="stats-row">
            <div class="stat-item">
              <label>🍖 飢餓</label>
              <div class="stat-bar">
                <div class="stat-fill hunger" :style="{ width: catState.hunger + '%' }"></div>
              </div>
              <span class="stat-value">{{ Math.round(catState.hunger) }}</span>
            </div>

            <div class="stat-item">
              <label>⚡ 能量</label>
              <div class="stat-bar">
                <div class="stat-fill energy" :style="{ width: catState.energy + '%' }"></div>
              </div>
              <span class="stat-value">{{ Math.round(catState.energy) }}</span>
            </div>

            <div class="stat-item">
              <label>😊 快樂</label>
              <div class="stat-bar">
                <div class="stat-fill happiness" :style="{ width: catState.happiness + '%' }"></div>
              </div>
              <span class="stat-value">{{ Math.round(catState.happiness) }}</span>
            </div>

            <div class="stat-item">
              <label>❤️ 健康</label>
              <div class="stat-bar">
                <div class="stat-fill health" :style="{ width: catState.health + '%' }"></div>
              </div>
              <span class="stat-value">{{ Math.round(catState.health) }}</span>
            </div>
          </div>
        </div>

        <!-- 行動按鈕 -->
        <div class="action-buttons">
          <button
            @click="feed"
            :disabled="catState.hunger < 10 || catState.energy < 10"
            :class="{ active: catState.currentAction === 'eat' }"
            title="餵貓咪吃飯"
          >
            🍖 餵食
          </button>
          <button
            @click="play"
            :disabled="catState.energy < 20"
            :class="{ active: catState.currentAction === 'play' }"
            title="和貓咪玩耍"
          >
            🎾 玩耍
          </button>
          <button
            @click="sleep"
            :disabled="catState.energy > 90"
            :class="{ active: catState.currentAction === 'sleep' }"
            title="讓貓咪睡覺"
          >
            😴 睡覺
          </button>
          <button
            @click="groom"
            :disabled="catState.health > 95"
            :class="{ active: catState.currentAction === 'groom' }"
            title="給貓咪梳毛"
          >
            🧹 梳毛
          </button>
        </div>

        <!-- 底部資訊 -->
        <div class="info-section">
          <div class="mood-display">
            <span class="mood-label">心情:</span>
            <span class="mood-text">{{ moodText }}</span>
          </div>
          <div class="time-display">
            {{ currentTime }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, onUnmounted, computed } from 'vue';
import { AnimationManager } from './utils/animationManager';
import type { CatState, Direction } from './types';

const catCanvas = ref<HTMLCanvasElement | null>(null);
const isDragging = ref(false);
const dragOffset = { x: 0, y: 0 };
const showStatusBubble = ref(false);
const currentTime = ref('');

const catState = reactive<CatState>({
  position: { x: 100, y: 100 },
  direction: 'down',
  hunger: 50,
  energy: 70,
  happiness: 60,
  health: 100,
  mood: 'happy',
  currentAction: 'idle',
  lastFed: Date.now(),
  lastPlayed: Date.now(),
  lastSlept: Date.now(),
  level: 1,
  experience: 0
});

const animationManager = new AnimationManager();
let spriteImage: HTMLImageElement | null = null;
let gameLoop: number | null = null;
let lastUpdateTime = Date.now();

const moodEmoji = computed(() => {
  const moods: Record<string, string> = {
    happy: '😊',
    hungry: '😋',
    sleepy: '😴',
    playing: '🤩',
    angry: '😠'
  };
  return moods[catState.mood] || '😐';
});

const moodText = computed(() => {
  const texts: Record<string, string> = {
    happy: '很開心',
    hungry: '很餓',
    sleepy: '很困',
    playing: '在玩耍',
    angry: '不開心'
  };
  return texts[catState.mood] || '普通';
});

const loadCatState = async () => {
  if (window.electronAPI) {
    const savedState = await window.electronAPI.getCatState();
    Object.assign(catState, savedState);
  }
};

const saveCatState = async () => {
  if (window.electronAPI) {
    await window.electronAPI.updateCatState(catState);
  }
};

const feed = async () => {
  if (window.electronAPI) {
    const newState = await window.electronAPI.feedCat();
    Object.assign(catState, newState);
  }
  showBubble();
};

const play = async () => {
  if (window.electronAPI) {
    const newState = await window.electronAPI.playCat();
    Object.assign(catState, newState);
  }
  showBubble();
};

const sleep = async () => {
  if (window.electronAPI) {
    const newState = await window.electronAPI.sleepCat();
    Object.assign(catState, newState);
  }
  showBubble();
};

const groom = async () => {
  if (window.electronAPI) {
    const newState = await window.electronAPI.groomCat();
    Object.assign(catState, newState);
  }
  showBubble();
};

const showBubble = () => {
  showStatusBubble.value = true;
  setTimeout(() => {
    showStatusBubble.value = false;
  }, 1500);
};

const onMouseDown = (e: MouseEvent) => {
  isDragging.value = true;
  dragOffset.x = e.clientX - catState.position.x;
  dragOffset.y = e.clientY - catState.position.y;
};

const onMouseMove = (e: MouseEvent) => {
  if (isDragging.value) {
    catState.position.x = e.clientX - dragOffset.x;
    catState.position.y = e.clientY - dragOffset.y;
    saveCatState();
  }
};

const onMouseUp = () => {
  isDragging.value = false;
};

const onCatClick = () => {
  showBubble();
  catState.happiness = Math.min(100, catState.happiness + 5);
};

const loadSpriteImage = () => {
  spriteImage = new Image();
  spriteImage.src = '/cat-sprite.png';
  spriteImage.onload = () => {
    renderCat();
  };
  spriteImage.onerror = () => {
    console.warn('Sprite image not loaded, using fallback rendering');
    renderCatFallback();
  };
};

const renderCat = () => {
  if (!catCanvas.value || !spriteImage) return;

  const ctx = catCanvas.value.getContext('2d');
  if (!ctx) return;

  ctx.clearRect(0, 0, 80, 80);

  // 選擇動畫
  let animKey = 'idle_down';
  if (catState.currentAction === 'walk') {
    animKey = `walk_${catState.direction}`;
  } else if (catState.currentAction === 'sleep') {
    animKey = 'sleep';
  } else if (catState.currentAction === 'idle') {
    animKey = `idle_${catState.direction}`;
  }

  animationManager.setAnimation(animKey);
  const frame = animationManager.update(16);

  if (frame) {
    ctx.drawImage(
      spriteImage,
      frame.x,
      frame.y,
      frame.width,
      frame.height,
      0,
      0,
      80,
      80
    );
  }
};

const renderCatFallback = () => {
  if (!catCanvas.value) return;

  const ctx = catCanvas.value.getContext('2d');
  if (!ctx) return;

  ctx.clearRect(0, 0, 80, 80);
  ctx.fillStyle = '#FF9500';
  ctx.fillRect(10, 40, 60, 30);
  ctx.beginPath();
  ctx.arc(40, 30, 20, 0, Math.PI * 2);
  ctx.fill();
};

const updateGameState = async () => {
  if (window.electronAPI) {
    const newState = await window.electronAPI.getCatState();
    Object.assign(catState, newState);
  }
  renderCat();
};

const startGameLoop = () => {
  gameLoop = setInterval(() => {
    updateGameState();
  }, 100);
};

const updateClock = () => {
  const now = new Date();
  currentTime.value = now.toLocaleTimeString('zh-TW', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });
};

onMounted(() => {
  loadCatState();
  loadSpriteImage();
  startGameLoop();
  updateClock();
  setInterval(updateClock, 1000);

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
});

onUnmounted(() => {
  if (gameLoop) {
    clearInterval(gameLoop);
  }
  document.removeEventListener('mousemove', onMouseMove);
  document.removeEventListener('mouseup', onMouseUp);
});
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.app-container {
  width: 100%;
  height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  overflow: hidden;
}

.game-window {
  width: 100%;
  height: 100%;
  position: relative;
  user-select: none;
}

/* 貓咪容器 */
.cat-container {
  position: fixed;
  width: 80px;
  height: 80px;
  cursor: grab;
  z-index: 100;
}

.cat-container:active {
  cursor: grabbing;
}

.cat-canvas {
  width: 100%;
  height: 100%;
  image-rendering: pixelated;
  image-rendering: crisp-edges;
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2));
}

/* 狀態氣泡 */
.status-bubble {
  position: absolute;
  top: -40px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(255, 255, 255, 0.95);
  border-radius: 20px;
  padding: 8px 12px;
  font-size: 24px;
  animation: bubbleFloat 1.5s ease-out forwards;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

@keyframes bubbleFloat {
  0% {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
  }
  100% {
    opacity: 0;
    transform: translateX(-50%) translateY(-30px);
  }
}

/* UI 面板 */
.ui-panel {
  position: fixed;
  bottom: 20px;
  left: 20px;
  right: 20px;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 16px;
  padding: 20px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(10px);
  max-width: 600px;
  margin: 0 auto;
}

/* 等級和經驗 */
.level-info {
  display: flex;
  gap: 20px;
  margin-bottom: 16px;
  font-weight: bold;
}

.level {
  font-size: 18px;
  color: #667eea;
}

.exp {
  font-size: 14px;
  color: #999;
}

/* 狀態列 */
.stats-row {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 12px;
  margin-bottom: 16px;
}

.stat-item {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.stat-item label {
  font-size: 12px;
  font-weight: 600;
  color: #333;
}

.stat-bar {
  width: 100%;
  height: 8px;
  background: #e0e0e0;
  border-radius: 4px;
  overflow: hidden;
}

.stat-fill {
  height: 100%;
  border-radius: 4px;
  transition: width 0.3s ease;
}

.stat-fill.hunger {
  background: linear-gradient(90deg, #ffa500, #ff6b00);
}

.stat-fill.energy {
  background: linear-gradient(90deg, #ffd700, #ffb500);
}

.stat-fill.happiness {
  background: linear-gradient(90deg, #ff69b4, #ff1493);
}

.stat-fill.health {
  background: linear-gradient(90deg, #00d4ff, #0099ff);
}

.stat-value {
  font-size: 11px;
  color: #999;
  text-align: center;
}

/* 行動按鈕 */
.action-buttons {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
  margin-bottom: 16px;
}

button {
  padding: 10px 12px;
  border: 2px solid #e0e0e0;
  background: white;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  color: #333;
  transition: all 0.2s ease;
}

button:hover:not(:disabled) {
  border-color: #667eea;
  background: #f0f2ff;
  transform: translateY(-2px);
}

button:active:not(:disabled) {
  transform: translateY(0);
}

button.active {
  border-color: #667eea;
  background: #667eea;
  color: white;
}

button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* 底部資訊 */
.info-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  padding-top: 12px;
  border-top: 1px solid #e0e0e0;
}

.mood-display {
  display: flex;
  gap: 8px;
}

.mood-label {
  font-weight: 600;
  color: #999;
}

.mood-text {
  color: #667eea;
  font-weight: 600;
}

.time-display {
  font-family: 'Courier New', monospace;
  color: #999;
  font-size: 12px;
}

/* 響應式設計 */
@media (max-width: 600px) {
  .ui-panel {
    max-width: calc(100vw - 40px);
    padding: 16px;
  }

  .stats-row {
    grid-template-columns: repeat(2, 1fr);
  }

  .action-buttons {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
