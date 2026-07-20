<template>
  <div class="cat-container" @mousedown="onMouseDown">
    <div class="cat" :class="catState.mood">
      <div class="cat-head">
        <div class="ears">
          <div class="ear left"></div>
          <div class="ear right"></div>
        </div>
        <div class="eyes">
          <div class="eye left"></div>
          <div class="eye right"></div>
        </div>
        <div class="nose"></div>
        <div class="mouth"></div>
      </div>
      <div class="cat-body"></div>
      <div class="tail"></div>
    </div>

    <!-- Status Display -->
    <div class="status-panel">
      <div class="stat">
        <span class="label">🍖</span>
        <div class="bar">
          <div class="fill" :style="{ width: catState.hunger + '%' }"></div>
        </div>
      </div>
      <div class="stat">
        <span class="label">⚡</span>
        <div class="bar">
          <div class="fill" :style="{ width: catState.energy + '%' }"></div>
        </div>
      </div>
      <div class="stat">
        <span class="label">😊</span>
        <div class="bar">
          <div class="fill" :style="{ width: catState.happiness + '%' }"></div>
        </div>
      </div>
    </div>

    <!-- Action Buttons -->
    <div class="action-buttons">
      <button @click="feed" :disabled="catState.hunger < 20" title="Feed the cat">🍖</button>
      <button @click="play" :disabled="catState.energy < 20" title="Play with the cat">🎾</button>
      <button @click="sleep" title="Make the cat sleep">😴</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue';

interface CatState {
  x: number;
  y: number;
  hunger: number;
  energy: number;
  happiness: number;
  mood: 'happy' | 'hungry' | 'sleepy' | 'playing';
}

const catState = reactive<CatState>({
  x: 0,
  y: 0,
  hunger: 50,
  energy: 70,
  happiness: 60,
  mood: 'happy',
});

const isDragging = ref(false);
const dragOffset = { x: 0, y: 0 };

const onMouseDown = (e: MouseEvent) => {
  isDragging.value = true;
  dragOffset.x = e.clientX - catState.x;
  dragOffset.y = e.clientY - catState.y;
};

const onMouseMove = (e: MouseEvent) => {
  if (isDragging.value) {
    catState.x = e.clientX - dragOffset.x;
    catState.y = e.clientY - dragOffset.y;
    saveCatState();
  }
};

const onMouseUp = () => {
  isDragging.value = false;
};

const feed = async () => {
  if (window.electronAPI) {
    const newState = await window.electronAPI.feedCat();
    Object.assign(catState, newState);
    saveCatState();
  }
};

const play = async () => {
  if (window.electronAPI) {
    const newState = await window.electronAPI.playCat();
    Object.assign(catState, newState);
    saveCatState();
  }
};

const sleep = async () => {
  if (window.electronAPI) {
    const newState = await window.electronAPI.sleepCat();
    Object.assign(catState, newState);
    saveCatState();
  }
};

const saveCatState = async () => {
  if (window.electronAPI) {
    await window.electronAPI.updateCatState(catState);
  }
};

const loadCatState = async () => {
  if (window.electronAPI) {
    const savedState = await window.electronAPI.getCatState();
    Object.assign(catState, savedState);
  }
};

onMounted(() => {
  loadCatState();
  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
});
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.cat-container {
  position: fixed;
  top: v-bind('`${catState.y}px`');
  left: v-bind('`${catState.x}px`');
  width: 120px;
  height: 140px;
  user-select: none;
  cursor: grab;
}

.cat-container:active {
  cursor: grabbing;
}

/* Cat body */
.cat {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.cat-head {
  position: relative;
  width: 70px;
  height: 70px;
  background: #FF9500;
  border-radius: 50% 50% 45% 45%;
  margin-bottom: 10px;
}

/* Ears */
.ears {
  position: absolute;
  width: 100%;
  height: 100%;
  top: -10px;
}

.ear {
  position: absolute;
  width: 20px;
  height: 25px;
  background: #FF9500;
  border-radius: 50% 50% 50% 0;
  top: 0;
}

.ear.left {
  left: 8px;
  transform: rotate(-20deg);
}

.ear.right {
  right: 8px;
  transform: rotate(20deg);
}

/* Eyes */
.eyes {
  position: absolute;
  width: 45px;
  height: 20px;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  justify-content: space-between;
}

.eye {
  width: 12px;
  height: 18px;
  background: #333;
  border-radius: 50%;
  position: relative;
}

.eye::after {
  content: '';
  position: absolute;
  width: 5px;
  height: 8px;
  background: #fff;
  border-radius: 50%;
  top: 3px;
  left: 2px;
}

/* Nose */
.nose {
  position: absolute;
  width: 10px;
  height: 8px;
  background: #FF69B4;
  border-radius: 50%;
  top: 42px;
  left: 50%;
  transform: translateX(-50%);
}

/* Mouth */
.mouth {
  position: absolute;
  width: 20px;
  height: 2px;
  background: #333;
  top: 52px;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 10px;
}

.mouth::before {
  content: '';
  position: absolute;
  width: 2px;
  height: 8px;
  background: #333;
  left: 50%;
  transform: translateX(-50%);
  bottom: -3px;
}

/* Body */
.cat-body {
  width: 50px;
  height: 45px;
  background: #FF9500;
  border-radius: 50% 50% 40% 40%;
  position: relative;
  bottom: 5px;
}

/* Tail */
.tail {
  position: absolute;
  width: 15px;
  height: 35px;
  background: #FF9500;
  border-radius: 50%;
  right: -5px;
  bottom: 20px;
  transform: rotate(30deg);
  animation: tailWag 0.6s ease-in-out infinite;
}

@keyframes tailWag {
  0%, 100% {
    transform: rotate(30deg);
  }
  50% {
    transform: rotate(-30deg);
  }
}

/* Mood states */
.cat.happy .eye {
  transform: scaleY(0.3);
}

.cat.hungry .eye {
  background: #FFD700;
}

.cat.sleepy .eye {
  transform: scaleY(0.1);
}

.cat.playing {
  animation: bounce 0.4s ease-in-out infinite;
}

@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

/* Status panel */
.status-panel {
  position: absolute;
  top: 5px;
  right: 5px;
  background: rgba(0, 0, 0, 0.7);
  border-radius: 8px;
  padding: 8px;
  font-size: 12px;
  color: #fff;
  min-width: 120px;
  opacity: 0;
  transition: opacity 0.3s;
}

.cat-container:hover .status-panel {
  opacity: 1;
}

.stat {
  display: flex;
  align-items: center;
  gap: 5px;
  margin-bottom: 5px;
}

.stat:last-child {
  margin-bottom: 0;
}

.label {
  font-size: 14px;
}

.bar {
  width: 70px;
  height: 4px;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 2px;
  overflow: hidden;
}

.fill {
  height: 100%;
  background: linear-gradient(90deg, #4CAF50, #8BC34A);
  transition: width 0.3s ease;
}

/* Action buttons */
.action-buttons {
  position: absolute;
  bottom: 5px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 5px;
  opacity: 0;
  transition: opacity 0.3s;
}

.cat-container:hover .action-buttons {
  opacity: 1;
}

button {
  width: 28px;
  height: 28px;
  border: none;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.9);
  cursor: pointer;
  font-size: 16px;
  transition: background 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
}

button:hover:not(:disabled) {
  background: rgba(255, 255, 255, 1);
  transform: scale(1.1);
}

button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
