<template>
  <div class="v_main_view">
    <div class="v-main-head">
      <div :style="headStyle" class="v-main-head-pc g-flex-align-center g-flex-justify-between">
        <div @click="reloadClick" class="v-main-head-pc-left">
          <img src="/img/logo.png" alt="" />
        </div>
        <!-- <div class="v-main-head-pc-center">
          <div class="v-main-head-pc-center-list g-flex-align-center">
            <div @click="reloadClick" class="v-main-head-pc-center-item">
              <span class="v-main-head-pc-center-item-title">Home</span>
            </div>
          </div>
        </div> -->
        <!-- <div class="v-main-head-pc-language">
          <el-popover placement="bottom-start" :width="150" trigger="hover">
            <template #reference>
              <div class="v-main-head-pc-language-icon">
                <i class="iconfont icon-a-yuyanyingwen"></i>
              </div>
            </template>
            <LangList @emitsSetLangeSuccess="emitsSetLangeSuccess" />
          </el-popover>
        </div> -->
        <div @click="ruzhuClick" class="v-main-head-pc-right">
          <span>Sign Up</span>
        </div>
      </div>
    </div>
    <div class="v-main-view-container">
      <div class="v-main-view-banner-box">
        <!-- pc -->
        <div class="v-main-view-banner-pc">
          <div class="v-main-banner-pc-background-overlay"></div>
          <div class="v-main-view-banner-pc-content">
            <div class="v-main-view-banner-pc-content-title">
              <span>LET PROFESSIONAL TECHNOLOGY PROTECT YOU - {{ store.system.WebTitle }}</span>
            </div>
            <div class="v-main-view-banner-pc-content-des">
              <span>{{ store.system.WebTitle }} is a quantitative trading platform that provides investors with the tools and services to do
                quantitative trading and help them do it better. In other words, at the quantitative trading platform, the
                weapons are ready for you, you don’t need to build it yourself, you just need to learn to use it.</span>
            </div>
            <div @click="ruzhuClick" class="v-main-view-banner-pc-content-btn">
              <span>Sign Up</span>
            </div>
          </div>
          <div class="v-banner-pc-swiper swiper-container">
            <div class="swiper-wrapper">
              <div class="swiper-slide" v-for="(item, index) in oneSwiperList.list" :key="index">
                <div class="v-banner-pc-swiper-item">
                  <img :src="item.imgUrl" alt="">
                </div>
              </div>
            </div>
            <div v-show="false" class="v-banner-pc-swiper-pagination"></div>
            <div class="v-banner-pc-swiper-button-prev g-flex-align-center g-flex-justify-center">
              <i class="iconfont icon-shixiangzuojiantou-"></i>
            </div>
            <div class="v-banner-pc-swiper-button-next g-flex-align-center g-flex-justify-center">
              <i class="iconfont icon-shixiangyoujiantou-"></i>
            </div>
          </div>
        </div>
        <!-- 手机 -->
        <div class="v-main-view-banner-mobile">
          <div class="v-main-banner-mobile-background-overlay"></div>
          <div class="v-main-view-banner-mobile-content">
            <div class="v-main-view-banner-mobile-content-title">
              <span>LET PROFESSIONAL TECHNOLOGY PROTECT YOU - {{ store.system.WebTitle }}</span>
            </div>
            <div class="v-main-view-banner-mobile-content-des">
              <span>{{ store.system.WebTitle }} is a quantitative trading platform that provides investors with the tools and services to do
                quantitative trading and help them do it better. In other words, at the quantitative trading platform, the
                weapons are ready for you, you don’t need to build it yourself, you just need to learn to use it.</span>
            </div>
            <div @click="ruzhuClick" class="v-main-view-banner-mobile-content-btn">
              <span>Sign Up</span>
            </div>
          </div>
          <div class="v-banner-mobile-swiper swiper-container">
            <div class="swiper-wrapper">
              <div class="swiper-slide" v-for="(item, index) in twoSwiperList.list" :key="index">
                <div class="v-banner-mobile-swiper-item">
                  <img :src="item.imgUrl" alt="">
                </div>
              </div>
            </div>
            <div v-show="false" class="v-banner-mobile-swiper-pagination"></div>
            <div class="v-banner-mobile-swiper-button-prev g-flex-align-center g-flex-justify-center">
              <i class="iconfont icon-shixiangzuojiantou-"></i>
            </div>
            <div class="v-banner-mobile-swiper-button-next g-flex-align-center g-flex-justify-center">
              <i class="iconfont icon-shixiangyoujiantou-"></i>
            </div>
          </div>
        </div>
      </div>
      <div class="v-main-four-box">
        <div class="v-main-four-title-box g-flex-column g-flex-align-center g-flex-justify-center">
          <div class="v-main-four-big-title">
            <div class="v-main-four-big-title-content g-flex-align-end">
              FEATURES OF {{ store.system.WebTitle }}
            </div>
          </div>
          <div class="v-main-four-sub-title">
            <span>Balanced Investment Smart Living</span>
          </div>
        </div>
        <div class="v-main-four-list-box">
          <div class="v-main-four-list g-flex">
            <div class="v-main-four-item-box">
              <div class="v-main-four-item">
                <div class="v-main-four-item-icon">
                  <img src="/img/pc/icon/fouricon-1.png" alt="" />
                </div>
                <div class="v-main-four-item-title">
                  <span>Low Cost</span>
                </div>
                <div class="v-main-four-item-desc">
                  <span>
                    Diversified Investments<br>
                    Intelligent Investment Portfolio<br>
                    Flexible investment and risk diversification</span>
                </div>
                <div class="v-main-four-item-nums">
                  <svg viewBox="0 0 141 167" version="1.1" xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink">
                    <title>01</title>
                    <desc>Created with Sketch.</desc>
                    <g id="pc端" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                      <g id="首页" transform="translate(-299.000000, -3276.000000)" fill="#F2F5FA" fill-rule="nonzero">
                        <g id="p4" transform="translate(0.000000, 2834.000000)">
                          <g id="内容" transform="translate(0.000000, 320.000000)">
                            <g id="01">
                              <g transform="translate(64.000000, 0.000000)">
                                <g id="bg" transform="translate(-0.000000, 0.000000)">
                                  <path
                                    d="M235,157.291436 C235,151.755497 235.973126,146.834736 237.919408,142.529006 C239.86569,138.223275 242.473668,134.532704 245.743421,131.457182 C249.013174,128.38166 252.788904,126.03661 257.070724,124.421961 C261.352543,122.807312 265.828924,122 270.5,122 C275.171076,122 279.647457,122.807312 283.929276,124.421961 C288.211096,126.03661 291.986826,128.38166 295.256579,131.457182 C298.526332,134.532704 301.13431,138.223275 303.080592,142.529006 C305.026874,146.834736 306,151.755497 306,157.291436 L306,253.708564 C306,259.244503 305.026874,264.165264 303.080592,268.470994 C301.13431,272.776725 298.526332,276.467296 295.256579,279.542818 C291.986826,282.61834 288.211096,284.96339 283.929276,286.578039 C279.647457,288.192688 275.171076,289 270.5,289 C265.828924,289 261.352543,288.192688 257.070724,286.578039 C252.788904,284.96339 249.013174,282.61834 245.743421,279.542818 C242.473668,276.467296 239.86569,272.776725 237.919408,268.470994 C235.973126,264.165264 235,259.244503 235,253.708564 L235,157.291436 Z M259,254.230769 C259,257.615402 260.073323,260.423066 262.22,262.653846 C264.366677,264.884627 267.12665,266 270.5,266 C273.87335,266 276.633323,264.884627 278.78,262.653846 C280.926677,260.423066 282,257.615402 282,254.230769 L282,157.769231 C282,154.384598 280.926677,151.576934 278.78,149.346154 C276.633323,147.115373 273.87335,146 270.5,146 C267.12665,146 264.366677,147.115373 262.22,149.346154 C260.073323,151.576934 259,154.384598 259,157.769231 L259,254.230769 Z M352.5,288 L352.5,148.876404 L329,166.151685 L329,141.275281 L352.5,124 L376,124 L376,288 L352.5,288 Z"
                                    id="01"></path>
                                </g>
                              </g>
                            </g>
                          </g>
                        </g>
                      </g>
                    </g>
                  </svg>
                </div>
              </div>
            </div>
            <div class="v-main-four-item-box">
              <div class="v-main-four-item">
                <div class="v-main-four-item-icon">
                  <img src="/img/pc/icon/fouricon-2.png" alt="" />
                </div>
                <div class="v-main-four-item-title">
                  <span>Expert Level</span>
                </div>
                <div class="v-main-four-item-desc">
                  <span class="elementor-icon-box-description">
                    Data Analytics<br>
                    Intelligent data analysis<br>
                    Comprehensive market information at a glance</span>
                  <span>Data Analytics Intelligent data analysis Comprehensive market information at a glance</span>
                </div>
                <div class="v-main-four-item-nums">
                  <svg viewBox="0 0 165 172" version="1.1" xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink">
                    <title>02</title>
                    <desc>Created with Sketch.</desc>
                    <g id="pc端" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                      <g id="首页" transform="translate(-723.000000, -3274.000000)" fill="#F2F5FA" fill-rule="nonzero">
                        <g id="p4" transform="translate(0.000000, 2834.000000)">
                          <g id="内容" transform="translate(0.000000, 320.000000)">
                            <g id="02">
                              <g transform="translate(512.000000, 0.000000)">
                                <g id="bg" transform="translate(0.000000, 0.000000)">
                                  <path
                                    d="M211,156.348066 C211,150.64638 211.986832,145.578291 213.960526,141.143646 C215.93422,136.709002 218.578931,132.907935 221.894737,129.740331 C225.210543,126.572728 229.039452,124.157467 233.381579,122.494475 C237.723706,120.831483 242.263134,120 247,120 C251.736866,120 256.276294,120.831483 260.618421,122.494475 C264.960548,124.157467 268.789457,126.572728 272.105263,129.740331 C275.421069,132.907935 278.06578,136.709002 280.039474,141.143646 C282.013168,145.578291 283,150.64638 283,156.348066 L283,255.651934 C283,261.35362 282.013168,266.421709 280.039474,270.856354 C278.06578,275.290998 275.421069,279.092065 272.105263,282.259669 C268.789457,285.427272 264.960548,287.842533 260.618421,289.505525 C256.276294,291.168517 251.736866,292 247,292 C242.263134,292 237.723706,291.168517 233.381579,289.505525 C229.039452,287.842533 225.210543,285.427272 221.894737,282.259669 C218.578931,279.092065 215.93422,275.290998 213.960526,270.856354 C211.986832,266.421709 211,261.35362 211,255.651934 L211,156.348066 Z M236,255.838462 C236,259.335915 237.073323,262.237168 239.22,264.542308 C241.366677,266.847447 244.12665,268 247.5,268 C250.87335,268 253.633323,266.847447 255.78,264.542308 C257.926677,262.237168 259,259.335915 259,255.838462 L259,156.161538 C259,152.664085 257.926677,149.762832 255.78,147.457692 C253.633323,145.152553 250.87335,144 247.5,144 C244.12665,144 241.366677,145.152553 239.22,147.457692 C237.073323,149.762832 236,152.664085 236,156.161538 L236,255.838462 Z M304,291 L304,268.13649 L347.578947,185.494429 C349.789485,181.366275 351.05263,177.754194 351.368421,174.658078 C351.684212,171.561962 351.842105,167.711722 351.842105,163.107242 C351.842105,161.043165 351.802632,158.860039 351.723684,156.557799 C351.644736,154.25556 351.21053,152.231207 350.421053,150.48468 C349.631575,148.738153 348.447376,147.269505 346.868421,146.078691 C345.289466,144.887877 343.000015,144.292479 340,144.292479 C336.368403,144.292479 333.486853,145.324502 331.355263,147.388579 C329.223674,149.452657 328.157895,152.469339 328.157895,156.438719 L328.157895,170.252089 L304,170.252089 L304,156.915042 C304,151.834236 304.947359,147.071053 306.842105,142.625348 C308.736852,138.179644 311.342089,134.28971 314.657895,130.955432 C317.815805,127.621153 321.605241,124.961709 326.026316,122.977019 C330.447391,120.99233 335.184185,120 340.236842,120 C346.552663,120 351.960504,121.151103 356.460526,123.453343 C360.960549,125.755583 364.710511,128.891345 367.710526,132.860724 C370.552646,136.830103 372.64473,141.355128 373.986842,146.435933 C375.328954,151.516738 376,156.915013 376,162.630919 C376,166.759074 375.921053,170.212382 375.763158,172.990947 C375.605262,175.769513 375.289476,178.428957 374.815789,180.969359 C374.342103,183.509762 373.552637,186.050127 372.447368,188.590529 C371.3421,191.130932 369.842115,194.227001 367.947368,197.87883 L332.421053,266.707521 L376,266.707521 L376,291 L304,291 Z"
                                    id="02"></path>
                                </g>
                              </g>
                            </g>
                          </g>
                        </g>
                      </g>
                    </g>
                  </svg>
                </div>

              </div>
            </div>
            <div class="v-main-four-item-box">
              <div class="v-main-four-item">
                <div class="v-main-four-item-icon">
                  <img src="/img/pc/icon/fouricon-3.png" alt="" />
                </div>
                <div class="v-main-four-item-title">
                  Automation
                </div>
                <div class="v-main-four-item-desc">
                  <span class="elementor-icon-box-description">
                    Balance Reminder<br>
                    Balance Adjustment Investments<br>
                    Ensure the best investment strategy</span>
                </div>
                <div class="v-main-four-item-nums">
                  <svg viewBox="0 0 163 170" version="1.1" xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink">
                    <title>03</title>
                    <desc>Created with Sketch.</desc>
                    <g id="pc端" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                      <g id="首页" transform="translate(-1173.000000, -3275.000000)" fill="#F2F5FA" fill-rule="nonzero">
                        <g id="p4" transform="translate(0.000000, 2834.000000)">
                          <g id="内容" transform="translate(0.000000, 320.000000)">
                            <g id="03">
                              <g transform="translate(960.000000, 0.000000)">
                                <g id="bg" transform="translate(0.000000, 0.000000)">
                                  <path
                                    d="M213,156.925414 C213,151.290027 213.973126,146.280869 215.919408,141.89779 C217.86569,137.514711 220.473668,133.757843 223.743421,130.627072 C227.013174,127.496301 230.788904,125.109124 235.070724,123.46547 C239.352543,121.821815 243.828924,121 248.5,121 C253.171076,121 257.647457,121.821815 261.929276,123.46547 C266.211096,125.109124 269.986826,127.496301 273.256579,130.627072 C276.526332,133.757843 279.13431,137.514711 281.080592,141.89779 C283.026874,146.280869 284,151.290027 284,156.925414 L284,255.074586 C284,260.709973 283.026874,265.719131 281.080592,270.10221 C279.13431,274.485289 276.526332,278.242157 273.256579,281.372928 C269.986826,284.503699 266.211096,286.890876 261.929276,288.53453 C257.647457,290.178185 253.171076,291 248.5,291 C243.828924,291 239.352543,290.178185 235.070724,288.53453 C230.788904,286.890876 227.013174,284.503699 223.743421,281.372928 C220.473668,278.242157 217.86569,274.485289 215.919408,270.10221 C213.973126,265.719131 213,260.709973 213,255.074586 L213,156.925414 Z M237,255.034615 C237,258.475658 238.119989,261.330117 240.36,263.598077 C242.600011,265.866037 245.479982,267 249,267 C252.520018,267 255.399989,265.866037 257.64,263.598077 C259.880011,261.330117 261,258.475658 261,255.034615 L261,156.965385 C261,153.524342 259.880011,150.669883 257.64,148.401923 C255.399989,146.133963 252.520018,145 249,145 C245.479982,145 242.600011,146.133963 240.36,148.401923 C238.119989,150.669883 237,153.524342 237,156.965385 L237,255.034615 Z M333.259868,192.850829 C340.422185,192.850829 345.365666,191.98988 348.090461,190.267956 C350.815255,188.546032 352.177632,184.554359 352.177632,178.292818 L352.177632,156.690608 C352.177632,153.24676 351.126655,150.429109 349.024671,148.237569 C346.922687,146.04603 344.081158,144.950276 340.5,144.950276 C336.296032,144.950276 333.298803,146.280834 331.508224,148.941989 C329.717645,151.603144 328.822368,154.185991 328.822368,156.690608 L328.822368,170.309392 L305,170.309392 L305,156.455801 C305,151.603106 305.934201,146.985289 307.802632,142.60221 C309.671062,138.219131 312.240115,134.462262 315.509868,131.331492 C318.779622,128.200721 322.594276,125.696142 326.953947,123.81768 C331.313618,121.939217 335.984624,121 340.967105,121 C347.506612,121 352.917194,122.291424 357.199013,124.874309 C361.480833,127.457195 364.711612,130.079176 366.891447,132.740331 C368.448473,134.618794 369.810849,136.497228 370.978618,138.375691 C372.146387,140.254153 373.119514,142.523928 373.898026,145.185083 C375.299349,150.350855 376,158.021128 376,168.196133 C376,173.988058 375.883225,178.684144 375.649671,182.28453 C375.416117,185.884917 374.832242,188.859104 373.898026,191.207182 C372.808109,193.711799 371.290032,195.825037 369.34375,197.546961 C367.397468,199.268885 364.71164,201.147319 361.286184,203.18232 C365.023045,205.530398 367.864574,207.721905 369.810855,209.756906 C371.757137,211.791907 373.197364,214.13995 374.131579,216.801105 C375.065794,219.618799 375.610745,222.945193 375.766447,226.780387 C375.92215,230.615581 376,235.507337 376,241.455801 C376,246.93465 375.883225,251.474199 375.649671,255.074586 C375.416117,258.674972 375.065792,261.64916 374.598684,263.997238 C374.131577,266.501854 373.508776,268.615093 372.730263,270.337017 C371.95175,272.05894 370.939699,273.859107 369.694079,275.737569 C366.735731,280.120648 362.960001,283.760114 358.366776,286.656077 C353.773552,289.55204 347.740169,291 340.266447,291 C336.529587,291 332.559232,290.373855 328.355263,289.121547 C324.151295,287.869239 320.33664,285.834268 316.911184,283.016575 C313.485728,280.198881 310.6442,276.520281 308.386513,271.980663 C306.128826,267.441045 305,261.884011 305,255.309392 L305,241.690608 L328.822368,241.690608 L328.822368,254.135359 C328.822368,257.892284 329.873345,260.983874 331.975329,263.410221 C334.077313,265.836568 336.918842,267.049724 340.5,267.049724 C344.081158,267.049724 346.922687,265.836568 349.024671,263.410221 C351.126655,260.983874 352.177632,257.735748 352.177632,253.665746 L352.177632,229.71547 C352.177632,223.140851 350.93203,218.836106 348.440789,216.801105 C347.039467,215.548797 345.132139,214.766116 342.71875,214.453039 C340.305361,214.139962 337.152432,213.983425 333.259868,213.983425 L333.259868,192.850829 Z"
                                    id="03"></path>
                                </g>
                              </g>
                            </g>
                          </g>
                        </g>
                      </g>
                    </g>
                  </svg>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>


      <div class="v-main-six-box">
        <div class="v-main-six-title-box g-flex-column g-flex-align-center g-flex-justify-center">
          <div class="v-main-six-big-title">
            <div class="v-main-six-big-title-content g-flex-align-end">
              Our Position
            </div>
          </div>
          <div class="v-main-six-title-join-box g-flex-align-center g-flex-justify-center">
            <div @click="ruzhuClick" class="v-main-six-title-join-btn g-flex-align-center g-flex-justify-center">
              <span>Sign Up</span>
            </div>
          </div>
        </div>
        <div class="v-main-six-position-iframe">
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d800.6847550039462!2d-121.01665285308178!3d39.2615413818238!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x809b7a73e05f679f%3A0x5814e72ae0369771!2sNevada%20Brewery!5e0!3m2!1sen-us!2shk!4v1693989400427!5m2!1sen-us!2shk" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
          <!-- <iframe class="v-iframe" title="US" src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d328.0367085061174!2d2.2942859!3d48.871678!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259aafac18765%3A0x2d1bb6e9398ea6c0!2s7%20Bryant%20Park!5e0!3m2!1sen!2suk!4v1681891304477!5m2!1sen!2suk"></iframe> -->
        </div>
      </div>

      <div class="v-main-three-box">
        <div class="v-main-three-title-box g-flex-column g-flex-align-center g-flex-justify-center">
          <div class="v-main-three-big-title">
            <span>ABOUT {{ store.system.WebTitle }}</span>
          </div>
          <div class="v-main-three-sub-title">
            <span>Know us better</span>
          </div>
        </div>
        <!-- PC -->
        <div class="v-main-three-pc-list-box">
          <div class="v-main-three-list g-flex">
            <div class="v-main-three-list-item-box g-flex-justify-center">
              <div class="v-main-three-list-item g-flex-column g-flex-align-center">
                <div class="v-main-three-list-item-img">
                  <img src="/img/pc/icon/zhineng1.jpg" alt="">
                </div>
                <div class="v-main-three-list-item-bottom g-flex-column g-flex-align-center">
                  <div class="v-main-three-list-item-title">
                    <span>ABOUT {{ store.system.WebTitle }}</span>
                  </div>
                  <div class="v-main-three-list-item-desc">
                    {{ store.system.WebTitle }}, Digital Currency Pioneer Technology Group ({{ store.system.WebTitle }}), is headquartered in Nevada, USA. The company has 16 specialized departments, a total of 1,400 high-tech talents, and 31 engineers who spent 6 months to build the {{ store.system.WebTitle }} platform.
                  </div>
                </div>
              </div>
            </div>
            <div class="v-main-three-list-item-box g-flex-justify-center">
              <div class="v-main-three-list-item g-flex-column g-flex-align-center">
                <div class="v-main-three-list-item-img">
                  <img src="/img/pc/icon/zhineng2.jpg" alt="">
                </div>
                <div class="v-main-three-list-item-bottom">
                  <div class="v-main-three-list-item-title">
                    <span>{{ store.system.WebTitle }}'S MAIN BUSINESS</span>
                  </div>
                  <div class="v-main-three-list-item-desc">
                    {{ store.system.WebTitle }}’s main business is to combine the capabilities of big data, artificial intelligence and cloud computing to provide quantitative investors and investment institutions with industry-leading new data and intelligent technology services covering machine learning, strategy development, backtesting, trading and risk control.
                  </div>
                </div>
              </div>
            </div>
            <div class="v-main-three-list-item-box g-flex-justify-center">
              <div class="v-main-three-list-item g-flex-column g-flex-align-center">
                <div class="v-main-three-list-item-img">
                  <img src="/img/pc/icon/zhineng3.jpg" alt="">
                </div>
                <div class="v-main-three-list-item-bottom">
                  <div class="v-main-three-list-item-title">
                    <span>Powerful management platform</span>
                  </div>
                  <div class="v-main-three-list-item-desc">
                    The background provides functions such as batch update, order tracking, and sales reports to meet store management needs in one stop
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="v-main-three-list g-flex">
            <div class="v-main-three-list-item-box g-flex-justify-center">
              <div class="v-main-three-list-item g-flex-column g-flex-align-center">
                <div class="v-main-three-list-item-img">
                  <img src="/img/pc/icon/zhineng4.jpg" alt="">
                </div>
                <div class="v-main-three-list-item-bottom">
                  <div class="v-main-three-list-item-title">
                    <span>Local customer service</span>
                  </div>
                  <div class="v-main-three-list-item-desc">
                    The customer service team is highly localized, and currently provides free customer service in small-language areas to solve language problems
                  </div>
                </div>
              </div>
            </div>
            <div class="v-main-three-list-item-box g-flex-justify-center">
              <div class="v-main-three-list-item g-flex-column g-flex-align-center">
                <div class="v-main-three-list-item-img">
                  <img src="/img/pc/icon/zhineng5.jpg" alt="">
                </div>
                <div class="v-main-three-list-item-bottom">
                  <div class="v-main-three-list-item-title">
                    <span>Run smoothly</span>
                  </div>
                  <div class="v-main-three-list-item-desc">
                    Provide advice and operational information to help you gain a deep understanding of the market, allow smooth access, and easily create a safe and comfortable platform
                  </div>
                </div>
              </div>
            </div>
            <div class="v-main-three-list-item-box g-flex-justify-center">
              <div class="v-main-three-list-item g-flex-column g-flex-align-center">
                <div class="v-main-three-list-item-img">
                  <img src="/img/pc/icon/zhineng6.jpg" alt="">
                </div>
                <div class="v-main-three-list-item-bottom">
                  <div class="v-main-three-list-item-title">
                    <span>API docking</span>
                  </div>
                  <div class="v-main-three-list-item-desc">
                    Docking with mainstream financial instruments, efficient trading and order flexible customization of the most suitable back-end system for you
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Mobile -->
        <div class="v-main-three-mobile-list-box">
          <div class="v-main-three-list g-flex">
            <div class="v-main-three-list-item-box g-flex-justify-center">
              <div class="v-main-three-list-item">
                <div class="v-main-three-list-item-img">
                  <img src="/img/pc/icon/zhineng1.jpg" alt="">
                </div>
                <div class="v-main-three-list-item-bottom g-flex-column">
                  <div class="v-main-three-list-item-title">
                    <span>ABOUT {{ store.system.WebTitle }}</span>
                  </div>
                  <div class="v-main-three-list-item-desc">
                    {{ store.system.WebTitle }}, Digital Currency Pioneer Technology Group ({{ store.system.WebTitle }}), is headquartered in Nevada, USA. The company has 16 specialized departments, a total of 1,400 high-tech talents, and 31 engineers who spent 6 months to build the {{ store.system.WebTitle }} platform.
                  </div>
                </div>
              </div>
            </div>
            <div class="v-main-three-list-item-box">
              <div class="v-main-three-list-item">
                <div class="v-main-three-list-item-img">
                  <img src="/img/pc/icon/zhineng2.jpg" alt="">
                </div>
                <div class="v-main-three-list-item-bottom">
                  <div class="v-main-three-list-item-title">
                    <span>{{ store.system.WebTitle }}'S MAIN BUSINESS</span>
                  </div>
                  <div class="v-main-three-list-item-desc">
                    {{ store.system.WebTitle }}’s main business is to combine the capabilities of big data, artificial intelligence and cloud computing to provide quantitative investors and investment institutions with industry-leading new data and intelligent technology services covering machine learning, strategy development, backtesting, trading and risk control.
                  </div>
                </div>
              </div>
            </div>
            <div class="v-main-three-list-item-box">
              <div class="v-main-three-list-item">
                <div class="v-main-three-list-item-img">
                  <img src="/img/pc/icon/zhineng3.jpg" alt="">
                </div>
                <div class="v-main-three-list-item-bottom">
                  <div class="v-main-three-list-item-title">
                    <span>Powerful management platform</span>
                  </div>
                  <div class="v-main-three-list-item-desc">
                    The background provides functions such as batch update, order tracking, and sales reports to meet store management needs in one stop
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="v-main-three-list g-flex">
            <div class="v-main-three-list-item-box">
              <div class="v-main-three-list-item">
                <div class="v-main-three-list-item-img">
                  <img src="/img/pc/icon/zhineng4.jpg" alt="">
                </div>
                <div class="v-main-three-list-item-bottom">
                  <div class="v-main-three-list-item-title">
                    <span>Local customer service</span>
                  </div>
                  <div class="v-main-three-list-item-desc">
                    The customer service team is highly localized, and currently provides free customer service in small-language areas to solve language problems
                  </div>
                </div>
              </div>
            </div>
            <div class="v-main-three-list-item-box">
              <div class="v-main-three-list-item">
                <div class="v-main-three-list-item-img">
                  <img src="/img/pc/icon/zhineng5.jpg" alt="">
                </div>
                <div class="v-main-three-list-item-bottom">
                  <div class="v-main-three-list-item-title">
                    <span>Run smoothly</span>
                  </div>
                  <div class="v-main-three-list-item-desc">
                    Provide advice and operational information to help you gain a deep understanding of the market, allow smooth access, and easily create a safe and comfortable platform
                  </div>
                </div>
              </div>
            </div>
            <div class="v-main-three-list-item-box">
              <div class="v-main-three-list-item">
                <div class="v-main-three-list-item-img">
                  <img src="/img/pc/icon/zhineng6.jpg" alt="">
                </div>
                <div class="v-main-three-list-item-bottom">
                  <div class="v-main-three-list-item-title">
                    <span>API docking</span>
                  </div>
                  <div class="v-main-three-list-item-desc">
                    Docking with mainstream financial instruments, efficient trading and order flexible customization of the most suitable back-end system for you
                  </div>
                </div>
  
              </div>
            </div>
          </div>
        </div>
      </div>


      <div class="v-main-eight-box">
        <div class="v-main-eight-title-box g-flex-column g-flex-align-center g-flex-justify-center">
          <div class="v-main-eight-title-join-box g-flex-align-center g-flex-justify-center">
            <div @click="ruzhuClick" class="v-main-eight-title-join-btn g-flex-align-center g-flex-justify-center">
              <span>Sign Up</span>
            </div>
          </div>
        </div>
      </div>

      <div class="v-main-seven-box">
        <div class="v-main-seven-box-left">ICP.Nums.17161890</div>
        <div class="v-main-seven-box-left">Copyright © 2015. All rights reserved.</div>
      </div>
    </div>

    <SelectXianLuPop ref="refSelectXianLuPop" />
  </div>
</template>

<script setup>
import SelectXianLuPop from '@/components/SelectXianLuPop.vue'
import LangList from '@/components/LangList.vue'
import Swiper, { Pagination, Navigation, Autoplay } from 'swiper';
import 'swiper/swiper-bundle.css';
import ws from "@/utils/ws.js";
import { useI18n } from "vue-i18n";
import useStore from "@/store/index.js";
import { useRouter, useRoute } from "vue-router";
import { dotDealWith, formatDate, copyClick, kefuClick } from "@/utils/index.js";
import {
  reactive,
  ref,
  computed,
  onMounted,
  onUnmounted,
  nextTick,
} from "vue";
const router = useRouter();
const route = useRoute();
// pinia状态管理仓库
const store = useStore();

const i18nObj = useI18n();
const i18n = computed(() => {
  return i18nObj.tm("mainView");
});
const value = ref(new Date())

let val = ref('')

let refSelectXianLuPop = ref(null)


function ruzhuClick() {
  // refSelectXianLuPop.value.onShow()
  window.location.href = store.system.appUrl + '/#/register'
}

function reloadClick() {
  window.location.reload()
}

const swiperOne = ref(null);
let oneSwiperList = reactive({
  list: [
    {
      imgUrl: '/img/pc/banner/pc-banner1.jpg'
    },
  ]
})

const swiperTwo = ref(null);
let twoSwiperList = reactive({
  list: [
    {
      imgUrl: '/img/pc/banner/mobile-banner1.jpg'
    },
  ]
})



function emitsSetLangeSuccess() {

}

onMounted(() => {
  window.addEventListener("scroll", handleScroll);

  Swiper.use([Pagination, Navigation, Autoplay]);
  swiperOne.value = new Swiper('.v-banner-pc-swiper', {
    loop: false,
    // direction: 'vertical',
    slidesPerView: 1,
    spaceBetween: 0,
    autoplay: {
      delay: 3000
    },
    pagination: {
      el: '.v-banner-pc-swiper-pagination',
      clickable: true
    },
    navigation: {
      nextEl: '.v-banner-pc-swiper-button-next',
      prevEl: '.v-banner-pc-swiper-button-prev',
    },
    speed: 800
  });

  swiperTwo.value = new Swiper('.v-banner-mobile-swiper', {
    loop: false,
    // direction: 'vertical',
    slidesPerView: 1,
    spaceBetween: 0,
    autoplay: {
      delay: 3000
    },
    pagination: {
      el: '.v-banner-mobile-swiper-pagination',
      clickable: true
    },
    navigation: {
      nextEl: '.v-banner-mobile-swiper-button-next',
      prevEl: '.v-banner-mobile-swiper-button-prev',
    },
    speed: 800
  });
});


onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
})
// rgb(7, 26, 82)



let headStyle = reactive({
  backgroundColor: ''
})

//获得页面向左、向上卷动的距离
function getScroll() {
  return {
    // left: window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft || 0,
    top:
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop ||
      0,
  };
}
function handleScroll() {
  const scrollTop = getScroll().top;
  if (scrollTop > 200) {
    headStyle.backgroundColor = '#071a52'
  } else {
    headStyle.backgroundColor = ''
  }
}
</script>

<style lang='scss'>
.v_main_view {
  .v-main-head {
    .v-main-head-pc {
      width: 100%;
      position: fixed;
      top: 0;
      left: 0;
      z-index: 102;
      height: 80px;
      padding: 0 40px;

      .v-main-head-pc-left {
        img {
          width: 38px;
        }

        svg {
          width: 100px;
          height: 48px;
          fill: #ee4d2d;
          margin-top: -8px;
        }
      }

      .v-main-head-pc-center {
        flex: 1;

        .v-main-head-pc-center-list {
          .v-main-head-pc-center-item {
            margin-left: 48px;
            cursor: pointer;
            position: relative;

            .v-main-head-pc-center-item-title {
              font-weight: 700;
              letter-spacing: .4px;
              padding-bottom: 12px;
              color: var(--g-main_color);
              border-bottom: 2px solid var(--g-main_color);
            }

            .v-main-head-pc-center-item-active {
              position: absolute;
              z-index: 0;
              top: -4px;
              left: -6px;

              img {
                width: 16px;
                height: 16px;
              }
            }
          }
        }

      }

      .v-main-head-pc-language {
        padding-left: 20px;

        .v-main-head-pc-language-icon {
          padding: 2px 12px;
          border-radius: 6px;
          cursor: pointer;
          margin-right: 20px;

          .iconfont {
            color: var(--g-white);
            font-size: 38px;
          }
        }
      }

      .v-main-head-pc-right {
        width: 120px;
        height: 40px;
        border: none;
        font-family: PingFang SC, SF Pro SC, SF Pro Text, Roboto, Microsoft Yahei, Helvetica Neue, Helvetica, Arial, sans-serif;
        font-weight: 600;
        font-size: 14px;
        line-height: 40px;
        text-align: center;
        cursor: pointer;
        color: #fff;
        border-radius: 4px;
        background: linear-gradient(90deg, #01fb97, #17b978);
        // box-shadow: 0 10px 25px 0 #016b41;
      }
    }
  }

  .v-main-view-container {
    .v-main-view-banner-box {
      height: 100vh;

      .v-main-view-banner-pc {
        width: 100%;
        height: 100%;
        position: relative;

        .v-main-banner-pc-background-overlay {
          position: absolute;
          background-color: #000;
          opacity: .5;
          height: 100%;
          width: 100%;
          top: 0;
          left: 0;
          z-index: 2;
        }

        .v-main-view-banner-pc-content {
          width: 50%;
          position: absolute;
          top: 50%;
          left: 30px;
          transform: translateY(-50%);
          z-index: 3;
          padding: 10px;

          .v-main-view-banner-pc-content-title {
            color: #fff;
            font-family: "Helvetica", Sans-serif;
            font-size: 42px;
            font-weight: 600;
            margin-bottom: 20px
          }

          .v-main-view-banner-pc-content-des {
            color: #fff;
            font-size: 16px;
            line-height: 28px;
            margin-bottom: 20px
          }

          .v-main-view-banner-pc-content-btn {
            margin-top: 30px;
            display: inline-block;
            font-size: 16px;
            padding: 15px 30px;
            border-radius: 4px;
            text-align: center;
            font-size: 18px;
            letter-spacing: .8px;
            cursor: pointer;
            background: #17b978;
            color: var(--g-white);
            top: 440px;
            left: 170px;
            @include textEllipsis(1);

            &:hover {
              background: #22bf80;
            }
          }
        }

        .v-banner-pc-swiper {
          height: 100%;

          .swiper-wrapper {
            height: 100%;

            .swiper-slide {
              height: 100%;

              .v-banner-pc-swiper-item {
                height: 100%;
                position: relative;

                img {
                  width: 100%;
                  height: 100%;
                  object-fit: cover;
                }


              }
            }
          }

          .v-banner-pc-swiper-pagination {
            position: absolute;
            z-index: 2;
            bottom: 40px;
            width: auto;
            height: 8px;
            left: 50%;
            transform: translateX(-50%);
            margin-right: 12px;

            .swiper-pagination-bullet {
              width: 8px;
              height: 8px;
              border-radius: 0;
              background-color: rgba(25, 37, 55, .3);
              opacity: 1;

              &.swiper-pagination-bullet-active {
                width: 24px;
                background-color: #17b978;
              }
            }
          }

          .v-banner-pc-swiper-button-prev {
            display: none;
            position: absolute;
            top: 50%;
            left: 0;
            z-index: 1;
            width: 48px;
            height: 48px;
            background: rgba(25, 37, 55, .3);
            cursor: pointer;
            transition: background-color .3s ease-out;

            .iconfont {
              font-size: 22px;
              color: var(--g-white);
            }

            &:hover {
              background: rgba(25, 37, 55, .5);
            }
          }

          .v-banner-pc-swiper-button-next {
            display: none;
            right: 0;
            position: absolute;
            top: 50%;
            z-index: 1;
            width: 48px;
            height: 48px;
            background: rgba(25, 37, 55, .3);
            cursor: pointer;
            transition: background-color .3s ease-out;

            .iconfont {
              font-size: 22px;
              color: var(--g-white);
            }

            &:hover {
              background: rgba(25, 37, 55, .5);
            }
          }
        }
      }

      .v-main-view-banner-mobile {
        display: none;
        width: 100%;
        height: 100%;
        position: relative;

        .v-main-banner-mobile-background-overlay {
          position: absolute;
          background-color: #000;
          opacity: .5;
          height: 100%;
          width: 100%;
          top: 0;
          left: 0;
          z-index: 2;
        }

        .v-main-view-banner-mobile-content {
          width: 100%;
          position: absolute;
          top: 50%;
          left: 0px;
          transform: translateY(-50%);
          z-index: 3;
          padding: 10px;

          .v-main-view-banner-mobile-content-title {
            color: #fff;
            font-family: "Helvetica", Sans-serif;
            font-size: 32px;
            font-weight: 600;
            margin-bottom: 20px;
            text-align: center;
          }

          .v-main-view-banner-mobile-content-des {
            color: #fff;
            font-size: 16px;
            line-height: 24px;
            margin-bottom: 20px;
            text-align: center;
          }

          .v-main-view-banner-mobile-content-btn {
            width: 80%;
            margin: 30px auto 0 auto;
            font-size: 16px;
            padding: 15px 30px;
            border-radius: 4px;
            text-align: center;
            font-size: 18px;
            letter-spacing: .8px;
            cursor: pointer;
            background: #17b978;
            color: var(--g-white);
            top: 440px;
            left: 170px;
            @include textEllipsis(1);

            &:hover {
              background: #22bf80;
            }
          }
        }

        .v-banner-mobile-swiper {
          height: 100%;

          .swiper-wrapper {
            height: 100%;

            .swiper-slide {
              height: 100%;

              .v-banner-mobile-swiper-item {
                height: 100%;
                position: relative;

                img {
                  width: 100%;
                  height: 100%;
                  object-fit: cover;
                }

                .v-banner-mobile-swiper-item-btn {
                  width: 260px;
                  position: absolute;
                  height: 48px;
                  line-height: 48px;
                  text-align: center;
                  font-size: 18px;
                  font-weight: 600;
                  letter-spacing: .8px;
                  cursor: pointer;
                  background: linear-gradient(90deg, #f63, #f53d2d);
                  box-shadow: 0 10px 25px 0 rgba(238, 77, 45, .4);
                  color: var(--g-white);
                  top: calc(50% - 30px);
                  left: 50%;
                  transform: translateX(-50%) translateY(-50%);
                  @include textEllipsis(1);

                  &:hover {
                    background: linear-gradient(90deg, rgb(249, 89, 36), #e41502);
                  }
                }
              }
            }
          }

          .v-banner-mobile-swiper-pagination {
            position: absolute;
            z-index: 2;
            bottom: 40px;
            width: auto;
            height: 8px;
            left: 50%;
            transform: translateX(-50%);
            margin-right: 12px;

            .swiper-pagination-bullet {
              width: 8px;
              height: 8px;
              border-radius: 0;
              background-color: rgba(25, 37, 55, .3);
              opacity: 1;

              &.swiper-pagination-bullet-active {
                width: 24px;
                background-color: #ee4d2d;
              }
            }
          }

          .v-banner-mobile-swiper-button-prev {
            display: none;
            position: absolute;
            top: 50%;
            left: 0;
            z-index: 1;
            width: 48px;
            height: 48px;
            background: rgba(25, 37, 55, .3);
            cursor: pointer;
            transition: background-color .3s ease-out;

            .iconfont {
              font-size: 22px;
              color: var(--g-white);
            }

            &:hover {
              background: rgba(25, 37, 55, .5);
            }
          }

          .v-banner-mobile-swiper-button-next {
            display: none;
            right: 0;
            position: absolute;
            top: 50%;
            z-index: 1;
            width: 48px;
            height: 48px;
            background: rgba(25, 37, 55, .3);
            cursor: pointer;
            transition: background-color .3s ease-out;

            .iconfont {
              font-size: 22px;
              color: var(--g-white);
            }

            &:hover {
              background: rgba(25, 37, 55, .5);
            }
          }
        }
      }
    }



    .v-main-three-box {
      .v-main-three-title-box {
        height: 180px;
        .v-main-three-big-title {
          position: relative;
          font-size: 40px;
          letter-spacing: 2px;
          line-height: 48px;
          font-weight: 700;
          color: #000;
        }

        .v-main-three-sub-title {
          margin-top: 22px;
          opacity: .7;
          font-size: 22px;
          letter-spacing: .8px;
          text-align: center;
          line-height: 22px;
          color: #000;
        }
      }

      .v-main-three-pc-list-box {
        padding: 0px 40px;

        .v-main-three-list {
          .v-main-three-list-item-box {
            flex-basis: calc(100% / 3);
            flex-shrink: 0;
            padding: 40px 32px 40px 0;
            overflow: hidden;

            .v-main-three-list-item {
              width: 75%;
              cursor: pointer;
              .v-main-three-list-item-img {
                width: 300px;
                transition: all 0.5s;
                &:hover {
                  transform: scale(1.2);
                }
                img {
                  height: 200px;
                  object-fit: cover;
                  width: 100%;
                  border-radius: 4px;
                }
              }

              .v-main-three-list-item-bottom {
                width: 100%;
                overflow: hidden;

                .v-main-three-list-item-title {
                  width: 100%;
                  text-align: center;
                  margin-top: 23px;
                  padding-bottom: 15px;
                  font-size: 22px;
                  color: #000;
                  font-weight: 500;
                  letter-spacing: 1.2px;
                  @include textEllipsis();
                }

                .v-main-three-list-item-desc {
                  text-align: center;
                  margin-top: 6px;
                  opacity: .7;
                  font-size: 14px;
                  color: #192537;
                  letter-spacing: .4px;
                  line-height: 26px;
                }
              }
            }
          }
        }
      }

      .v-main-three-mobile-list-box {
        padding: 0;
        display: none;
        padding: 0 10px;
        .v-main-three-list {
          flex-wrap: wrap;
          // &:nth-of-type(2) {
          //   .v-main-three-list-item-box {
          //     &:nth-of-type(1) {
          //       padding-left: 16px;
          //     }

          //     &:nth-of-type(2) {
          //       padding-right: 16px;
          //     }

          //     &:nth-of-type(3) {
          //       padding-left: 16px;
          //     }
          //   }
          // }

          .v-main-three-list-item-box {
            flex-basis: 100%;
            flex-shrink: 0;
            padding: 30px 0;
            overflow: hidden;
            .v-main-three-list-item {
              cursor: pointer;
              width: 100%;
              gap: 3px;

              .v-main-three-list-item-img {
                width: 100%;
                transition: all 0.5s;
                &:hover {
                  transform: scale(1.1);
                }
                img {
                  width: 100%;
                  height: 200px;
                  object-fit: cover;
                  border-radius: 4px;
                }
              }

              .v-main-three-list-item-bottom {
                width: 100%;
                overflow: hidden;

                .v-main-three-list-item-title {
                  width: 100%;
                  text-align: center;
                  margin-top: 15px;
                  font-size: 22px;
                  color: #000;
                  font-weight: 500;
                  font-weight: 700;
                  letter-spacing: 1.2px;
                  @include textEllipsis();
                }

                .v-main-three-list-item-desc {
                  text-align: center;
                  margin-top: 6px;
                  opacity: .7;
                  font-size: 14px;
                  color: #192537;
                  letter-spacing: .4px;
                  line-height: 26px;
                }
              }
            }
          }
        }
      }
    }

    .v-main-four-box {
      .v-main-four-title-box {
        height: 200px;

        .v-main-four-big-title {
          position: relative;
          font-size: 40px;
          letter-spacing: 2px;
          line-height: 48px;
          font-weight: 700;
          color: #000;

        }

        .v-main-four-sub-title {
          margin-top: 22px;
          opacity: .7;
          color: #000;
          font-size: 22x;
          letter-spacing: .8px;
          text-align: center;
          line-height: 22px;
        }
      }

      .v-main-four-list-box {
        padding: 0 40px;
        padding-bottom: 30px;

        .v-main-four-list {
          margin: 30px 0;

          .v-main-four-item-box {
            width: calc(100% / 3);
            padding-left: 40px;
            flex-shrink: 0;

            .v-main-four-item {
              width: 80%;
              position: relative;

              .v-main-four-item-icon {
                width: 60px;
                height: 60px;

                img {
                  width: 100%;
                  height: 100%;
                }

                svg {
                  width: 100%;
                  height: 100%;
                }
              }

              .v-main-four-item-title {
                margin-top: 20px;
                margin-bottom: 24px;
                color: #000;
                font-size: 22px;
                letter-spacing: .8px;
                font-weight: 600;
              }

              .v-main-four-item-desc {
                margin-top: -2px;
                color: #192537;
                font-size: 14px;
                opacity: .7;
                line-height: 27px;
              }

              .v-main-four-item-nums {
                position: absolute;
                width: 141px;
                height: 167px;
                right: 5px;
                top: 0;
                z-index: -1;

                svg {
                  width: 100%;
                  height: 100%;
                }
              }
            }
          }
        }
      }
    }

    .v-main-five-box {
      .v-main-five-pc {
        height: 550px;
        padding: 140px 40px;
        background: url('/img/pc/icon/map.jpg') no-repeat 50%;
        background-color: #f2f5fa;
        background-size: cover;
        background-attachment: fixed;
        overflow: hidden;

        .v-main-five-left {
          flex-shrink: 0;

          .v-main-five-left-title-box {
            .v-main-five-left-big-title {
              position: relative;
              color: #192537;
              font-size: 40px;
              letter-spacing: 2px;
              line-height: 48px;
              font-weight: 700;
              text-align: center;

              .v-main-five-left-big-title-img {
                position: absolute;
                width: 24px;
                height: 24px;
                top: -26px;
                left: -8px;

                img {
                  width: 100%;
                  height: 100%;
                }
              }
            }

            .v-main-five-left-sec-title {
              margin-top: 22px;
              font-size: 18px;
              letter-spacing: .8px;
              line-height: 18px;
              text-align: left;
              font-weight: 500;
              opacity: .5;
            }
          }

          .v-main-five-left-swiper-btn-list {
            margin-top: 180px;
            gap: 10px;

            .v-main-five-left-swiper-btn-prev {
              cursor: pointer;
              width: 48px;
              height: 48px;
              background: #fff;
              box-shadow: 0 4px 4px 0 rgba(64, 75, 91, .02), 0 16px 32px 0 rgba(29, 53, 89, .08);
              transition: background .4s ease-in-out 0s;

              &:hover {
                background: #ee4d2d;
              }

              .v-main-five-left-swiper-btn-prev-icon {
                width: 24px;
                height: 24px;

                svg {
                  fill: #ee4d2d;
                  width: 100%;
                  height: 100%;
                }
              }

              .v-main-five-left-swiper-btn-prev-icon-active {
                width: 30px;
                height: 24px;

                svg {
                  width: 100%;
                  height: 100%;
                }
              }

            }

            .v-main-five-left-swiper-btn-next {
              cursor: pointer;
              width: 48px;
              height: 48px;
              background: #fff;
              box-shadow: 0 4px 4px 0 rgba(64, 75, 91, .02), 0 16px 32px 0 rgba(29, 53, 89, .08);
              transition: background .4s ease-in-out 0s;

              &:hover {
                background: #ee4d2d;
              }

              .v-main-five-left-swiper-btn-next-icon {
                width: 24px;
                height: 24px;

                svg {
                  fill: #ee4d2d;
                  width: 100%;
                  height: 100%;
                }
              }

              .v-main-five-left-swiper-btn-next-icon-active {
                width: 30px;
                height: 24px;

                svg {
                  width: 100%;
                  height: 100%;
                }
              }
            }
          }
        }

        .v-main-five-right {
          width: 900px;
          height: 400px;
          padding-left: 16px;
          padding-right: 16px;

          .v-main-five-right-swiper {
            padding: 30px 0 0 0;
            height: 320px;

            .swiper-wrapper {
              height: 100%;

              .swiper-slide {
                height: 100%;
                cursor: pointer;

                .v-main-five-right-swiper-item-box {
                  height: 100%;
                  margin-right: 32px;
                  position: relative;
                  transition: all .3s cubic-bezier(0, 0, .5, 1);

                  &:hover {
                    transform: scale(1.02);
                  }

                  .v-main-five-right-swiper-item {
                    height: 100%;
                    box-shadow: 0 4px 4px rgba(64, 75, 91, .02), 0 8px 16px rgba(64, 75, 91, .08);
                    border-radius: 1px;
                    padding: 32px 32px 0;
                    background: var(--g-white);

                    .v-main-five-right-swiper-item-icon {
                      position: absolute;
                      width: 47px;
                      height: 41px;
                      left: 32px;
                      top: -23px;

                      svg {
                        width: 100%;
                        height: 100%;
                      }
                    }

                    .v-main-five-right-swiper-item-img {
                      img {
                        width: 100%;
                      }
                    }

                    .v-main-five-right-swiper-item-sort-box {
                      margin-top: 24px;
                      color: #192537;
                      opacity: .5;
                      line-height: 14px;

                      .v-main-five-right-swiper-item-time {
                        margin-left: 24px;
                      }
                    }

                    .v-main-five-right-swiper-item-desc {
                      word-break: break-all;
                      margin-top: 16px;
                      line-height: 22px;
                      font-size: 14px;
                      color: #192537;
                      @include textEllipsis(5);
                    }
                  }
                }

              }
            }
          }
        }
      }

      .v-main-five-mobile {
        display: none;
        background: url('/img/pc/icon/map.jpg') no-repeat 50%;
        background-color: #f2f5fa;
        background-size: cover;
        background-attachment: fixed;

        .v-main-five-mobile-left {
          width: 100%;

          .v-main-five-mobile-left-title-box {
            padding-top: 80px;
            margin-left: 24px;

            .v-main-five-mobile-left-big-title {
              position: relative;
              color: #192537;
              font-size: 22px;
              letter-spacing: 2px;
              line-height: 32px;
              font-weight: 700;

              .v-main-five-mobile-left-big-title-img {
                position: absolute;
                width: 24px;
                height: 24px;
                top: -10px;
                left: -8px;

                img {
                  width: 100%;
                  height: 100%;
                }
              }
            }

            .v-main-five-mobile-left-sec-title {
              margin-top: 22px;
              font-size: 18px;
              letter-spacing: .8px;
              line-height: 18px;
              text-align: left;
              font-weight: 500;
              opacity: .5;
            }
          }

          .v-main-five-mobile-left-swiper-btn-list {
            margin-top: 180px;
            gap: 10px;

            .v-main-five-mobile-left-swiper-btn-prev {
              cursor: pointer;
              width: 48px;
              height: 48px;
              background: #fff;
              box-shadow: 0 4px 4px 0 rgba(64, 75, 91, .02), 0 16px 32px 0 rgba(29, 53, 89, .08);
              transition: background .4s ease-in-out 0s;

              &:hover {
                background: #ee4d2d;
              }

              .v-main-five-mobile-left-swiper-btn-prev-icon {
                width: 24px;
                height: 24px;

                svg {
                  fill: #ee4d2d;
                  width: 100%;
                  height: 100%;
                }
              }

              .v-main-five-mobile-left-swiper-btn-prev-icon-active {
                width: 30px;
                height: 24px;

                svg {
                  width: 100%;
                  height: 100%;
                }
              }

            }

            .v-main-five-mobile-left-swiper-btn-next {
              cursor: pointer;
              width: 48px;
              height: 48px;
              background: #fff;
              box-shadow: 0 4px 4px 0 rgba(64, 75, 91, .02), 0 16px 32px 0 rgba(29, 53, 89, .08);
              transition: background .4s ease-in-out 0s;

              &:hover {
                background: #ee4d2d;
              }

              .v-main-five-mobile-left-swiper-btn-next-icon {
                width: 24px;
                height: 24px;

                svg {
                  fill: #ee4d2d;
                  width: 100%;
                  height: 100%;
                }
              }

              .v-main-five-mobile-left-swiper-btn-next-icon-active {
                width: 30px;
                height: 24px;

                svg {
                  width: 100%;
                  height: 100%;
                }
              }
            }
          }
        }

        .v-main-five-mobile-right {
          margin-top: 30px;
          width: 100%;
          height: 400px;
          padding-left: 16px;
          padding-right: 16px;

          .v-main-five-mobile-right-swiper {
            padding: 30px 0 0 0;
            height: 300px;

            .swiper-wrapper {
              height: 100%;

              .swiper-slide {
                height: 100%;
                cursor: pointer;

                .v-main-five-mobile-right-swiper-item-box {
                  height: 100%;
                  margin-right: 32px;
                  position: relative;
                  transition: all .3s cubic-bezier(0, 0, .5, 1);

                  &:hover {
                    transform: scale(1.02);
                  }

                  .v-main-five-mobile-right-swiper-item {
                    height: 100%;
                    box-shadow: 0 4px 4px rgba(64, 75, 91, .02), 0 8px 16px rgba(64, 75, 91, .08);
                    border-radius: 1px;
                    padding: 32px 32px 0;
                    background: var(--g-white);

                    .v-main-five-mobile-right-swiper-item-icon {
                      position: absolute;
                      width: 47px;
                      height: 41px;
                      left: 32px;
                      top: -23px;
                      z-index: 99;

                      img {
                        width: 100%;
                        height: 100%;
                      }

                      svg {
                        width: 100%;
                        height: 100%;
                      }
                    }

                    .v-main-five-mobile-right-swiper-item-img {
                      img {
                        width: 100%;
                      }
                    }

                    .v-main-five-mobile-right-swiper-item-sort-box {
                      margin-top: 24px;
                      color: #192537;
                      opacity: .5;
                      line-height: 14px;

                      .v-main-five-mobile-right-swiper-item-time {
                        margin-left: 24px;
                      }
                    }

                    .v-main-five-mobile-right-swiper-item-desc {
                      word-break: break-all;
                      margin-top: 16px;
                      line-height: 22px;
                      font-size: 14px;
                      color: #192537;
                      @include textEllipsis(5);
                    }
                  }
                }

              }
            }
          }
        }
      }
    }

    .v-main-six-box {
      .v-main-six-title-box {
        height: 240px;

        .v-main-six-big-title {
          position: relative;
          font-size: 40px;
          letter-spacing: 2px;
          line-height: 48px;
          font-weight: 700;
          color: #000;

          .v-main-six-big-title-content {
            img {
              margin: 0 6px;
              width: 32px;
            }
          }

          .v-main-six-big-title-img {
            position: absolute;
            width: 24px;
            height: 24px;
            top: -9px;
            left: -8px;

            img {
              width: 100%;
              height: 100%;
            }
          }
        }

        .v-main-six-title-join-box {
          padding-top: 30px;

          .v-main-six-title-join-btn {
            width: 160px;
            border-radius: 2px;
            height: 44px;
            color: #fff;
            font-size: 22px;
            font-weight: 500;
            background-color: var(--g-main_color);
            cursor: pointer;
            transition: all 0.5s;
            border-radius: 4px;
            border: 1px solid var(--g-main_color);
            &:hover {
              color: var(--g-main_color);
              background-color: hsla(0, 0%, 100%, .9);
              border: 1px solid var(--g-main_color);
            }
          }
        }
      }
      .v-main-six-position-iframe {
        width: 100%;
        height: 800px;
        overflow: hidden;
        iframe {
          width: 100%;
          height: 800px;
        }
      }
    }

    .v-main-seven-box {
      border-top: 1px solid #e9e9e9;
      color: rgba(25, 37, 55, .5);
      font-size: 14px;
      padding-left: 15px;
      padding-top: 20px;
      padding-bottom: 20px;
      display: flex;
      align-items: center;

      .v-main-seven-box-left {
        margin-right: 10px;
      }
    }

    .v-main-eight-box {
      padding-bottom: 15px;
      .v-main-eight-title-box {
        height: 60px;
        .v-main-eight-title-join-box {
          .v-main-eight-title-join-btn {
            width: 160px;
            border-radius: 2px;
            height: 44px;
            color: #fff;
            font-size: 18px;
            font-weight: 500;
            background-color: var(--g-main_color);
            cursor: pointer;
            transition: all 0.5s;
            border-radius: 4px;
            border: 1px solid var(--g-main_color);
            &:hover {
              color: var(--g-main_color);
              background-color: hsla(0, 0%, 100%, .9);
              border: 1px solid var(--g-main_color);
            }
          }
        }
      }
    }
  }

  @media screen and (max-width: 864px) {
    .v-main-head-pc {
      padding: 0 20px !important;
      height: 60px !important;

      .v-main-head-pc-left {
        svg {
          width: 80px !important;
          height: 40px !important;
          margin-top: 0 !important;
        }
      }

      .v-main-head-pc-center {
        display: none !important
      }

      .v-main-head-pc-right {
        width: 80px !important;
        height: 30px !important;
        line-height: 30px !important;
      }
    }

    .v-main-view-banner-pc {
      display: none !important;
    }

    .v-main-view-banner-mobile {
      display: block !important;
    }

    .v-main-view-two-big-title-box {
      padding-top: 80px !important;
      padding-bottom: 0px !important;
      padding-left: 16px !important;
      padding-right: 16px !important;

      .v-main-view-two-big-title {
        font-size: 24px !important;
        line-height: 36px !important;

        .v-main-view-two-big-title-img {
          top: -10px !important;
        }
      }
    }

    .v-main-view-two-pc {
      display: none !important;
    }

    .v-main-view-two-mobile {
      display: block !important;
    }

    .v-main-three-box {
      .v-main-three-title-box {
        height: 160px !important;
        .v-main-three-big-title {
          margin: 0 20px !important;
          font-size: 24px !important;
          line-height: 36px !important;
        }

        .v-main-three-sub-title {
          font-weight: normal !important;
        }
      }

      .v-main-three-pc-list-box {
        display: none !important;
      }

      .v-main-three-mobile-list-box {
        display: block !important;
      }
    }

    .v-main-four-box {
      .v-main-four-title-box {
        height: 160px !important;

        .v-main-four-big-title {
          font-size: 24px !important;
          line-height: 36px !important;
        }

        .v-main-four-sub-title {
          font-weight: normal !important;
        }
      }

      .v-main-four-list-box {
        padding: 0 !important;

        .v-main-four-list {
          margin: 0 !important;
          flex-wrap: wrap !important;

          .v-main-four-item-box {
            width: 100% !important;
            padding-left: 0px !important;
            padding-top: 0px !important;

            .v-main-four-item {
              width: 100% !important;
              padding: 20px 40px !important;

              .v-main-four-item-title {
                font-size: 20px !important;
              }

              .v-main-four-item-desc {
                font-size: 16px !important;
              }

              .v-main-four-item-nums {
                right: 30px !important;
                top: 50% !important;
                transform: translateY(-50%) !important;
                z-index: -1;
              }
            }
          }
        }
      }
    }

    .v-main-five-box {
      padding: 0 !important;

      .v-main-five-pc {
        display: none !important;
      }

      .v-main-five-mobile {
        display: block !important;
      }
    }

    .v-main-six-box {
      .v-main-six-title-box {
        height: 160px !important;
        .v-main-six-big-title {
          font-size: 24px !important;
          line-height: 36px !important;
        }

        .v-main-six-title-join-box {
          .v-main-six-title-join-btn {
            height: 36px !important;
            font-size: 16px !important;
          }
        }
      }
    }

    .v-main-seven-box {
      display: block !important;

      .v-main-seven-box-left {
        padding-bottom: 10px !important;
      }
    }


  }
}
</style>