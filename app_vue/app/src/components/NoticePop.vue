<template>
  <div class="c_notice_pop">
    <van-popup :close-on-click-overlay="false" safe-area-inset-bottom class="c-pop" v-model:show="show" position="center">
      <div class="c-pop-container g-flex-column g-flex-align-center">
        <div class="c-pop-head">
           <!-- <img class="c_notice_popImg" src="/images/logo2.png" alt="" /> -->
          <div @click="onClose" v-show="secNums > 0" class="c-pop-head-secs g-flex-align-center g-flex-justify-center">{{ secNums }}S</div>
          <div v-show="secNums == 0" class="c-pop-close2" @click="onClose">
            <i class="iconfont icon-guanbi2"></i>
          </div>
        </div>
        <div class="c-pop-title g-flex-align-center g-flex-justify-center">
          <div class="c-pop-title-text">
<!--            <span>{{ i18n.titleText }}</span>-->
          </div>
        </div>
        <div class="c-pop-content-box g-flex-column">
          <div class="c-pop-content g-self-no-scrollbar">
            <div class="c-pop-content-list">
              <div class="c-pop-content-item" v-for="(item, index) in noticeList.list" :key="index">
                <div class="c-pop-item-title g-flex-align-center">
                  <div class="c-pop-item-title-nums g-flex-align-center g-flex-justify-center">
                    {{ index + 1 }}
                  </div>
                  <div class="c-pop-item-title-text" v-if="item.title">
                    {{ item.title }}
                  </div>
                </div>
                <div class="c-pop-item-content-text" v-html="item.content">
                </div>
                <!--              <div class="c-pop-item-content-text">-->
                <!--                <span>{{ item.des }}</span>-->
                <!--              </div>-->
              </div>
            </div>
          </div>
        </div>
        <div v-if="rewardCountdown" class="c-pop-bottom c-pop-item-content-text" style="text-align: center;height: 24vw;">
          <div  style="text-align: center;font-size:20px;height:14vw;margin-top:10px;color:red;">
            {{ i18n.rewardCountdownText }}: <br>
            <span>{{rewardCountdown}}</span>
          </div>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script setup>
import { reactive, ref, computed, onUnmounted } from 'vue'
import { useI18n } from "vue-i18n";
import useStore from '@/store/index.js'
import { useRouter, useRoute } from "vue-router";
const router = useRouter();
const route = useRoute();
const store = useStore();
const i18nObj = useI18n()
const i18n = computed(() => {
  return i18nObj.tm('noticePop')
})
let show = ref(false)
let endTime = ref(0)
function onShow(list) {
  if(store.isFirstNeedShow===0) {
    secNums.value = 5
    setTimeDown()
  }else {
    secNums.value = 0
  }
  noticeList.list = list
  show.value = true
  if(list.length){
    var now = new Date().getTime();
    if(list[0].end_time>0 && list[0].begin_time * 1000 <= now){//已开始倒计时
      endTime.value = list[0].end_time * 1000
      setRewardCountdown()
    }
  }
}

let noticeList = reactive({
  list: []
})

function onClose() {
  if(secNums.value > 0) {
    // store.isClickTimeDownNotice = true
    // return router.push({ name: 'rule', query: { id: 5 }})
  }else {
    cleanTimer()
    show.value = false
  }
}

let secNums = ref(5)
let timer = ref(0)

function setTimeDown() {
  store.setIsFirstNeedShow(1)
  secNums.value = secNums.value - 1
  timer.value = setInterval(() => {
    secNums.value = secNums.value - 1
    if(secNums.value <= 0) {
      secNums.value = 0
      cleanTimer()
    }
  }, 1000)
}


function cleanTimer() {
  clearInterval(timer.value)
  timer.value = 0
}

let rewardCountdown = ref('')
let rewardTimer = ref(0)
function setRewardCountdown() {
  //console.log("endTime.value ", new Date( endTime.value ))
  if(!endTime.value || endTime.value <= 0){
    return
  }
  var now = new Date().getTime();
  var timeRemaining = endTime.value - now;
  if (timeRemaining <= 0) {
    return;
  }
  setTimeStr(timeRemaining)

  rewardTimer.value = setInterval(function() {
    now = new Date().getTime();
    timeRemaining = endTime.value - now;

    setTimeStr(timeRemaining)

    if (timeRemaining <= 0) {
      rewardCountdown.value = ""
      cleanRewardTimer()
    }
  }, 1000);
}

function setTimeStr(timeRemaining){
  var hours = Math.floor((timeRemaining ) / (1000 * 60 * 60));
  var minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);
  hours = hours < 10 ? '0' + hours : hours;
  minutes = minutes < 10 ? '0' + minutes : minutes;
  seconds = seconds < 10 ? '0' + seconds : seconds;
  rewardCountdown.value = hours + ":" + minutes + ":" + seconds

  //console.log( rewardCountdown.value)
}

function cleanRewardTimer() {
  clearInterval(rewardTimer.value)
  rewardTimer.value = 0
}

defineExpose({
  onShow
})

onUnmounted(() => {
  cleanTimer()
  cleanRewardTimer()
})
</script>

<style lang='scss'>
.c_notice_pop {
  position: relative;
  .c_notice_popImg {
    position: absolute;
    height: 100px;
    top: 0;
  }
  position: relative;
  .van-popup {
    background-color: transparent;
  }
  .c-pop {
    border-radius: 15px;
    overflow-y: visible;
    .c-pop-container {
      height: 450px;
      width: 350px;
      position: relative;
      .c-pop-head {
        width: 100%;
        height: 100px;
        background-image: url('/images/notice_bg_a27.png');
        background-size: 100% 100%;
        background-position: center;
        background-repeat: no-repeat;
        position: absolute;
        top: -40px;
        .c_notice_popImg {
          width: 180px;
          height: 45px;
          margin: 25px 0 0 100px;
        }
        .c-pop-head-secs {
          position: absolute;
          right: 10px;
          top: 40%;
          font-size: 13px;
          background: var(--g-main_color);
          color: var(--g-white);
          border-radius: 50%;
          width: 26px;
          z-index: 999;
          height: 26px;
        }
      }

      .c-pop-title {
        width: 100%;
        height: 50px;
        padding: 0 10px;

        .c-pop-title-text {
          position: relative;
          z-index: 99;
          color: var(--g-black);
          font-size: 24px;
          font-weight: 700;
          text-align: center;
          line-height: 1;
        }
      }

      .c-pop-content-box {
        overflow: hidden;
        flex: 1;
        position: relative;
        // background-image: url('/img/icon/notice_bg_b.png');
        background-color:#ffffff;
        background-size: 100% 100%;
        background-position: center;
        .c-pop-content {
          width: calc(100% - 18px);
          margin: 0 auto;
          //background-color: var(--g-white);
          flex: 1;
          overflow: auto;
          border-radius: 15px;
          background: #e4dfff;
          .c-pop-content-list {
            position: relative;

            img{
              position: absolute;
              top: -10px;
              left: 45%;
              height: 40px;
              z-index: 99999;
            }
            .c-pop-content-item {
              padding: 10px 25px 10px 35px;
              .c-pop-item-title {
                position: relative;

                .c-pop-item-title-nums {
                  position: absolute;
                  top: 1px;
                  left: -24px;
                  width: 17px;
                  height: 17px;
                  font-size: 12px;
                  text-align: center;
                  color: var(--g-white);
                  line-height: .4533333333rem;
                  background-color: var(--g-main_color);
                  border-radius: 50%;
                }

                .c-pop-item-title-text {
                  color: var(--g-black);
                  font-weight: 700;
                  font-size: 14px;
                  line-height: 1.5;
                  padding-bottom: 5px;
                }
              }

              .c-pop-item-content-text {
                line-height: 1.3;
                font-size: 14px;
              }
            }
          }
        }
      }
      .c-pop-bottom {
        //background-color: #BEECFF;
        width: 100%;
        height: 60px;
        // background-image: url('/img/icon/notice_bg_c26.png');
        background: #fff;
        background-position: center;
        background-size: 100% 100%;
        background-repeat: no-repeat;
        border-radius: 0 0 15px 15px;
        margin-top: -1px;
      }

      .c-pop-close {
        position: absolute;
        z-index: 99999;
        right: 10px;
        top: 40%;
        .iconfont {
          font-size: 28px;
          font-weight: 700;
          color: #007AFF
        }
      }
      .c-pop-close2 {
        position: absolute;
        z-index: 99999;
        right: 10px;
        top: 40%;
        .iconfont {
          font-size: 28px;
          font-weight: 700;
          color: #f7d654
        }
      }
    }

  }
}</style>