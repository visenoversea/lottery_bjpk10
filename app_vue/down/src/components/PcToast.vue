<template>
 <transition name="toast">
  <div class="pc_toast">
    <span class="pc_toast-text">
      {{ $global.toastMsg }}
    </span>
  </div>
 </transition>
</template>

<script>
  export default {
    props: {
    },
    mounted() {
      
    },
    data() {
      return {
      }
    }
  }
</script>

<style lang="scss">
.pc_toast {
  position: absolute;
  left: 50%;
  top: 50%;
  z-index: 100005;
  max-width: 80%;
  transform: translateX(-50%) translateY(-50%);
  color: $white;
  background-color: rgba($color: #000000, $alpha: 0.5);
  border-radius: 5px;
  padding: 10px;
  opacity: 1;
  .pc_toast-text {
    font-size: $middle-font-size;
    word-break: break-all;
  }
}

.toast-enter-active {
  /* 动画进入过程：0.5s */
  transition: all 0.5s ease;
}

.toast-leave-active {
  /* 动画离开过程：0.3s */
  transition: all 0.3s ease;
}

.toast-enter {
  /* 动画之前的位置 */
  opacity: 0;
}

.toast-leave-to {
  /* 动画之后的位置 */
  opacity: 0;
}

</style>