<template>
  <transition name="dialog">
    <div v-if="visible" class="modal">
    <div class="modal-overlay"></div>
    <div class="modal-container">
      <div class="modal-header">{{ title }}</div>
      <div class="modal-body">
        <div class="progress">
          <div class="progress-bar" :style="{ width: progress + '%' }">
            {{ progress >= 100 ? '100%' : progress + '%' }}
          </div>
        </div>
      </div>
    </div>
  </div>
  </transition>
  
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  title: {
    type: String,
    default: 'Upload Progress'
  },
  visible: {
    type: Boolean,
    default: false
  },
  progress: {
    type: Number,
    default: 0
  }
})

const hide = () => {
  exposeEvent('hide')
}

defineExpose({
  hide
})
</script>

<style lang="scss">
.modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 2000;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
}

.modal-container {
  background-color: #fff;
  padding: 20px;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  position: relative;
  z-index: 999;
}

.modal-header {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
}

.progress {
  height: 20px;
  background-color: #e0e0e0;
  border-radius: 4px;
  overflow: hidden;
}

.progress-bar {
  height: 100%;
  background-color: #4CAF50;
  transition: width 0.5s ease-in-out;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  font-weight: bold;
}

.dialog-enter-active,
.dialog-leave-active {
  transition: all 0.3s ease;
}

.dialog-enter-from,
.dialog-leave-to {
  opacity: 0;
}

.dialog-enter-to,
.dialog-leave-from {
  opacity: 1;
}

</style>
