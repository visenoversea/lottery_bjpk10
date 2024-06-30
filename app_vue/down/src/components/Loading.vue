<template>
  <div class="s_loading">
    <transition name="fade">
      <div class="s-ios-shade">
        <div class="s-img-box">
          <img src="../assets/img/loading.png"/>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
  export default {
    
  }
</script>

<style lang="scss">
.s_loading {
  .s-ios-shade {
    position: fixed;
    z-index: 999;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba($color: #000000, $alpha: 0.4);
    .s-img-box {
      position: absolute;
      left: 50%;
      top: 50%;
      width: 70px;
      height: 70px;
      transform: translateX(-50%) translateY(-50%);
      img {
        width: 100%;
        height: 100%;
        animation: circle 2s infinite linear;
      }
    }

  }
}
@keyframes circle {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}

.g-fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
</style>