<template>
  <div class="reportBgc">
    <div class="report">
      <div class="homeBox">
        <img @click="goHome" src="../assets/images/home.png" alt="">
      </div>
      <div class="reportTitle">
        <span class="titleOne">MBTI测试(16 人格)专属报告</span>
        <span class="titleText">全球认可 • 权威测试 • 每年近300万人参与</span>
      </div>
      <div class="tipsBox">
        <div class="countdownBox" v-if="!isReportUnlocked">
          临时报告失效 &nbsp;<i class="redTips"> {{ minutes }}:{{ seconds }} </i>
        </div>
        <div class="countdownBox" v-if="isReportUnlocked">
          已获得专属报告
        </div>
        <div class="share" @click="shareFirenly">
          邀请好友
        </div>
      </div>
      <div class="totalNum">已有<span v-if="submitCount"> {{ submitCount }} </span>人获取报告</div>
      <!-- 总体介绍小卡片解锁版-->
      <div v-if="isReportUnlocked" class="describesBox">
        <div class="describes">
          <div class="up">
            <div class="inside">
              <div class="insideTitle">
                <div class="widthBot">
                  <div class="bot"></div>
                  <div class="bot"></div>
                  <div class="bot"></div>
                </div>
                <span>16personalities</span>
              </div>
              <div v-if="card" class="content">
                <div class="contentTop">
                  <div class="topLeft">
                    <div class="testTypeText">
                      <div class="yellowBgc">
                        <span> “你的测试类型是”</span>
                      </div>
                    </div>
                    <div class="testName">
                      <span>{{ card.mbtiType }}</span>
                    </div>
                    <div class="desc">
                      <p class="desc1">{{ card.content }}</p>
                      <p class="desc2">{{ card.remark }}</p>
                    </div>
                  </div>
                  <div class="topRight">
                    <img :src="imgUrl + card.cardImg" alt="">
                  </div>
                </div>

                <div class="dividingLine">
                  <div class="lineLeft"></div>
                  <div>各维度数据对比</div>
                  <div class="lineRight"></div>
                </div>
                <div class="contentFoot">
                  <div class="item">
                    <span>外向（E）</span>
                    <div class="Progress">
                      <PercentageBar :leftProgress="card.e" :rightProgress="card.i" :bgcColor="'#1ea8ff'" />
                    </div>
                    <span>内向（I）</span>
                  </div>
                  <div class="item">
                    <span>实感（S）</span>
                    <div class="Progress">
                      <PercentageBar :leftProgress="card.s" :rightProgress="card.n" :bgcColor="'#0fc120'" />
                    </div>
                    <span>直觉（N）</span>
                  </div>
                  <div class="item">
                    <span>理性（T）</span>
                    <div class="Progress">
                      <PercentageBar :leftProgress="card.t" :rightProgress="card.f" :bgcColor="'#ff5e54'" />
                    </div>
                    <span>感性（F）</span>
                  </div>
                  <div class="item">
                    <span>判断（J）</span>
                    <div class="Progress">
                      <PercentageBar :leftProgress="card.j" :rightProgress="card.p" :bgcColor="'#ffa42f'" />
                    </div>
                    <span>知觉（P）</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 16种人格总体介绍 轮播图未解锁时 -->
      <div v-if="!isReportUnlocked" class="describesBox">
        <div class="describes">
          <div class="up">
            <Swipe :autoplay="1500" lazy-render :show-indicators="false">
              <SwipeItem v-for="(item, index) in resultCard" :key="index">
                <div class="inside">
                  <div class="insideTitle">
                    <div class="widthBot">
                      <div class="bot"></div>
                      <div class="bot"></div>
                      <div class="bot"></div>
                    </div>
                    <span>16personalities</span>
                  </div>
                  <div class="content">
                    <div class="contentTop">
                      <div class="topLeft">
                        <div class="testTypeText">
                          <div class="yellowBgc" style="width: 160px;">
                            <span> “你的测试类型可能是”</span>
                          </div>
                        </div>
                        <div class="testName">
                          <span>{{ item.mbtiType }}</span>
                        </div>
                        <div class="desc">
                          <p class="desc1">{{ item.content }}</p>
                          <p class="desc2">{{ item.remark }}</p>
                        </div>
                      </div>
                      <div class="topRight">
                        <img :src="imgUrl + item.cardImg" alt="">
                      </div>
                    </div>
                    <div class="dividingLine">
                      <div class="lineLeft"></div>
                      <div>各维度数据对比</div>
                      <div class="lineRight"></div>
                    </div>
                    <div class="contentFoot">
                      <div class="item">
                        <span>外向（E）</span>
                        <div class="Progress">
                          <PercentageBar :leftProgress="item.e" :rightProgress="item.i" :bgcColor="'#1ea8ff'" />
                        </div>
                        <span>内向（I）</span>
                      </div>
                      <div class="item">
                        <span>实感（S）</span>
                        <div class="Progress">
                          <PercentageBar :leftProgress="item.s" :rightProgress="item.n" :bgcColor="'#0fc120'" />
                        </div>
                        <span>直觉（N）</span>
                      </div>
                      <div class="item">
                        <span>理性（T）</span>
                        <div class="Progress">
                          <PercentageBar :leftProgress="item.t" :rightProgress="item.f" :bgcColor="'#ff5e54'" />
                        </div>
                        <span>感性（F）</span>
                      </div>
                      <div class="item">
                        <span>判断（J）</span>
                        <div class="Progress">
                          <PercentageBar :leftProgress="item.j" :rightProgress="item.p" :bgcColor="'#ffa42f'" />
                        </div>
                        <span>知觉（P）</span>
                      </div>
                    </div>
                  </div>
                </div>
              </SwipeItem>
            </Swipe>
          </div>
        </div>
      </div>
      <div class="boxList">
        <!-- 上上签 -->
        <div class="signed boxBorder">
          <div class="title">
            <div class="whiteLineLeft">
              <div class="whiteLineOne"></div>
              <div class="whiteLineTwo"></div>
            </div>
            <span>2025上上签</span>
            <div class="whiteLineRight">
              <div class="whiteLineOne"></div>
              <div class="whiteLineTwo"></div>
            </div>
          </div>
          <div class="signedMain mainBox">
            <!-- 添加白色蒙版 -->
            <div v-if="!isReportUnlocked" class="unlockedmask">
              <span>本测评为您揭秘 2025年的神秘 <i>性格运势</i> </span>
              <div @click="unlockReport" class="toLockBtn">查看专属报告</div>
            </div>
            <div class="typeName"> <span>{{ card?.mbtiType }}：</span>{{ card?.content }} </div>
            <div>
              <ul class="mainList">
                <li v-for="(item, index) in ssq" :key="index">
                  <span>{{ item }}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <!-- 四个字母代表什么 -->
        <div class="fourCode boxBorder">
          <div class="title">
            <div class="whiteLineLeft">
              <div class="whiteLineOne"></div>
              <div class="whiteLineTwo"></div>
            </div>
            <span>这4个字母代表什么？</span>
            <div class="whiteLineRight">
              <div class="whiteLineOne"></div>
              <div class="whiteLineTwo"></div>
            </div>
          </div>
          <div class="fourMain mainBox">
            <!-- 添加白色蒙版 -->
            <div v-if="!isReportUnlocked" class="unlockedmask">
              <span>本测评 <i>以迈尔斯布里格斯类型指标(MBTI)</i> 和现代心理学创始人荣格的 <i>《心理类型》</i> 理论为基础，
                基于中国文化背景，推出更符合 <i>中国人</i> 的评测，用于了解自己的性格、生活观、爱情观、择业观。</span>
              <div @click="unlockReport" class="toLockBtn">查看专属报告</div>
            </div>
            <ul>
              <li v-for="(item, index) in sgzm" :key="index" :class="['codeList', `codeBgcColor${index + 1}`]">
                <div class="codeName">
                  <div :class="['code', `code${index + 1}`]">{{ item.word }}</div>
                  <div class="expressed">{{ item.desc }}</div>
                </div>
                <span class="construed">{{ item.content }}</span>
              </li>
            </ul>
          </div>
        </div>

        <!-- 思维方式 -->
        <div class="thinkingWay boxBorder">
          <div class="title">
            <div class="whiteLineLeft">
              <div class="whiteLineOne"></div>
              <div class="whiteLineTwo"></div>
            </div>
            <span>思维方式</span>
            <div class="whiteLineRight">
              <div class="whiteLineOne"></div>
              <div class="whiteLineTwo"></div>
            </div>
          </div>
          <div class="thinkingWayMain mainBox">
            <!-- 添加白色蒙版 -->
            <div v-if="!isReportUnlocked" class="unlockedmask">
              <span>本测评为您揭秘 您和相近性格的 <i>思维方式</i> ，发现自身的逻辑行为模式 </span>
              <div @click="unlockReport" class="toLockBtn">查看专属报告</div>
            </div>
            <div v-if="skfs">
              <div class="nameTitle">——{{ skfs.type + skfs.type2 }} ——</div>
              <div class="thinkingText">
                <i>{{ skfs.swfs }}</i>
                <span> {{ skfs.content }} </span>
              </div>
              <div v-if="skfs_img" class="thinkingImg">
                <div class="NTOne">
                  <span>{{ skfs.type2 }}</span>
                  <img class="bigNT" :src="imgUrl + skfs_img[0].value" alt="">
                </div>
                <div class="NTTwo">
                  <img class="littleNT" :src="imgUrl + skfs_img[1].value" alt="">
                  <img class="littleNT" :src="imgUrl + skfs_img[2].value" alt="">
                  <img class="littleNT" :src="imgUrl + skfs_img[3].value" alt="">
                </div>
              </div>
            </div>

          </div>
        </div>

        <!-- 人口比例 -->
        <div class="population boxBorder">
          <div class="title">
            <div class="whiteLineLeft">
              <div class="whiteLineOne"></div>
              <div class="whiteLineTwo"></div>
            </div>
            <span>人口比例</span>
            <div class="whiteLineRight">
              <div class="whiteLineOne"></div>
              <div class="whiteLineTwo"></div>
            </div>
          </div>
          <div class="populationMain mainBox">
            <!-- 添加白色蒙版 -->
            <div v-if="!isReportUnlocked" class="unlockedmask">
              <span>本测评为您揭秘您性格的 <i>整体占比与男女占比</i>，发现自身的稀缺性 </span>
              <div @click="unlockReport" class="toLockBtn">查看专属报告</div>
            </div>
            <div v-if="rkzb" class="rankText"> 你的性格稀有度排名第<i> {{ rkzb.rank }} </i>位 </div>
            <div v-if="rkzb" class="populationBox">
              <div class="populationItem">
                <el-progress type="circle" :percentage="rkzb.total" color="#0F5CFF" :stroke-width="10" :width="60">
                  <template #default="{ percentage }">
                    <span class="percentage-value">{{ percentage }}%</span>
                  </template>
                </el-progress>
                <span class="rankname">占总人口</span>
              </div>
              <div class="populationItem">
                <el-progress type="circle" :percentage="rkzb.man" color="#10A7FF" :stroke-width="10" :width="60">
                  <template #default="{ percentage }">
                    <span class="percentage-value">{{ percentage }}%</span>
                  </template>
                </el-progress>
                <span class="rankname">占男性</span>
              </div>
              <div class="populationItem">
                <el-progress type="circle" :percentage="rkzb.woman" color="#ED56E0" :stroke-width="10" :width="60">
                  <template #default="{ percentage }">
                    <span class="percentage-value">{{ percentage }}%</span>
                  </template>
                </el-progress>
                <span class="rankname">占女性</span>
              </div>
            </div>
          </div>
        </div>

        <!-- 名人名家 -->
        <div class="famous boxBorder">
          <div class="title">
            <div class="whiteLineLeft">
              <div class="whiteLineOne"></div>
              <div class="whiteLineTwo"></div>
            </div>
            <span>名人名家</span>
            <div class="whiteLineRight">
              <div class="whiteLineOne"></div>
              <div class="whiteLineTwo"></div>
            </div>
          </div>
          <div class="famousMain mainBox ">
            <!-- 添加白色蒙版 -->
            <div v-if="!isReportUnlocked" class="unlockedmask">
              <span>本测评为您揭秘古今中外哪些<i>名人名家</i> 和您性格一样，助你更好<i>观察自身，发展提升</i> </span>
              <div @click="unlockReport" class="toLockBtn">查看专属报告</div>
            </div>
            <img v-for="(item, index) in mrmj" :key="index" :src="imgUrl + item" alt="">
          </div>
        </div>

        <!-- 封神榜 -->
        <div class="legendary boxBorder">
          <div class="title">
            <div class="whiteLineLeft">
              <div class="whiteLineOne"></div>
              <div class="whiteLineTwo"></div>
            </div>
            <span>封神榜</span>
            <div class="whiteLineRight">
              <div class="whiteLineOne"></div>
              <div class="whiteLineTwo"></div>
            </div>
          </div>
          <div class="legendaryMain mainBox">
            <!-- 添加白色蒙版 -->
            <div v-if="!isReportUnlocked" class="unlockedmask">
              <span>为您揭秘 您的专属性格，为您颁发 <i>封神榜</i>，看看您缘何上榜？ </span>
              <div @click="unlockReport" class="toLockBtn">查看专属报告</div>
            </div>
            <div v-if="fsb">
              <div class="nameTitle">—— {{ fsb.prize }} ——</div>
              <div class="legendaryBox">
                <div class="legendaryImgBox">
                  <img class="legendaryImg" src="../assets/images/legendaryImg.png" alt="">
                </div>
                <div class="legendaryText">{{ fsb.content }}</div>
              </div>
            </div>
          </div>
        </div>

        <!--  性格特征（优劣势）-->
        <div class="feature boxBorder">
          <div class="title">
            <div class="whiteLineLeft">
              <div class="whiteLineOne"></div>
              <div class="whiteLineTwo"></div>
            </div>
            <span>性格特征（优劣势）</span>
            <div class="whiteLineRight">
              <div class="whiteLineOne"></div>
              <div class="whiteLineTwo"></div>
            </div>
          </div>
          <div class="featureMain mainBox">
            <!-- 添加白色蒙版 -->
            <div v-if="!isReportUnlocked" class="unlockedmask">
              <div class="complexMask">
                <div>
                  <span>了解自己的 <i>性格特征</i>，不仅能帮助我们更好地认识自己，还能在 <i>职业、学习、人际交往</i>和
                    <i>心理健康</i>等方面带来显著提升。它是一种工具，让我们能够扬长避短，找到适合自己的
                    <i>生活方式</i>和 <i>发展路径</i>。 </span>
                  <div class="advantage featureBoxTitle">
                    <img src="../assets/images/advantageImg.png" alt="">
                    <span>优势</span>
                  </div>
                  <span>本测评为您揭秘 专属 <i>性格优势，扬长避短</i> </span>
                  <div class="inferior featureBoxTitle">
                    <img src="../assets/images/inferiorImg.png" alt="">
                    <span>劣势</span>
                  </div>
                  <span>本测评为您揭秘 专属 <i>性格劣势，扬长避短</i> </span>
                </div>
              </div>
              <div @click="unlockReport" class="toLockBtn">查看专属报告</div>

            </div>
            <!-- {{ sgtz }} -->
            <div v-if=sgtz>
              <div>
                <div class="nameTitle">—— {{ sgtz.title }} ——</div>
                <div class="featureText">{{ sgtz.desc }} </div>
              </div>
              <div class="advantage featureBoxTitle">
                <img src="../assets/images/advantageImg.png" alt="">
                <span>优势</span>
              </div>
              <div class="advantageLongText">
                <ul>
                  <li v-for="(item, index) in sgtz.merit" :key="index">
                    <i>{{ item.skill }}：</i>
                    <span>{{ item.description }}</span>
                  </li>
                </ul>
              </div>
              <div class="inferior featureBoxTitle">
                <img src="../assets/images/inferiorImg.png" alt="">
                <span>劣势</span>
              </div>
              <div class="inferiorLongText">
                <ul>
                  <li v-for="(item, index) in sgtz.shortcoming" :key="index">
                    <i>{{ item.skill }}：</i>
                    <span>{{ item.description }}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <!-- 以下为完整报告 解锁基础报告时还要加判断 套餐类型 1基础报告2完整报告 -->

        <!-- 人生信条 -->

        <div class="edication boxBorder">
          <div class="title">
            <div class="whiteLineLeft">
              <div class="whiteLineOne"></div>
              <div class="whiteLineTwo"></div>
            </div>
            <span>人生信条</span>
            <div class="whiteLineRight">
              <div class="whiteLineOne"></div>
              <div class="whiteLineTwo"></div>
            </div>
          </div>
          <div class="edicationMain mainBox">
            <!-- 添加白色蒙版 -->
            <div v-if="!isReportUnlocked || selectedImageIndex !== 2" class="unlockedmask">
              <span>本测评为您引经据典，探索<i>人生信条</i> </span>
              <div v-if="selectedImageIndex === 2" @click="unlockReport" class="toLockBtn">查看专属报告</div>
              <div v-else @click="unlockCompleteReport" class="toLockBtn">查看完整报告</div>
            </div>
            <div class="edicationBox">
              <div class="edicationImgBox">
                <img class="edicationImg" :src="imgUrl + card.cardImg" alt="">
                <!-- <img class="edicationImg" src="../assets/images/testType.png" alt=""> -->
                <span>{{ mbtiType }}</span>
              </div>
              <div v-if="rsxt" class="edicationText" :style="{ backgroundColor: getRsxtColorInfo().color }">
                <img class="icon1" :src="getRsxtColorInfo().icon1" alt="">
                <img class="icon2" :src="getRsxtColorInfo().icon2" alt="">
                <span>{{ rsxt.line }}</span>
                <p>-{{ rsxt.name }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- 心理年龄 -->

        <div class="age boxBorder">
          <div class="title">
            <div class="whiteLineLeft">
              <div class="whiteLineOne"></div>
              <div class="whiteLineTwo"></div>
            </div>
            <span>心理年龄</span>
            <div class="whiteLineRight">
              <div class="whiteLineOne"></div>
              <div class="whiteLineTwo"></div>
            </div>
          </div>
          <div class="ageMain mainBox">
            <!-- 添加白色蒙版 -->
            <div v-if="!isReportUnlocked || selectedImageIndex !== 2" class="unlockedmask">
              <span>本测评为您揭秘 看看您的 <i>心理年龄</i> 和您 <i>实际年龄</i> 是不是一致呢？</span>
              <div v-if="selectedImageIndex === 2" @click="unlockReport" class="toLockBtn">查看专属报告</div>
              <div v-else @click="unlockCompleteReport" class="toLockBtn">查看完整报告</div>
            </div>
            <!-- xlnl -->
            <div v-if="xlnl">
              <div class="nameTitle">—— {{ xlnl.title }} ——</div>
              <div class="ageText">{{ xlnl.spec }}</div>
              <img class="ageImg" src="../assets/images/ageImg.png" alt="">
            </div>
          </div>
        </div>


        <!-- 适合的职业类型 -->

        <div class="occupation boxBorder">
          <div class="title">
            <div class="whiteLineLeft">
              <div class="whiteLineOne"></div>
              <div class="whiteLineTwo"></div>
            </div>
            <span>适合的职业类型</span>
            <div class="whiteLineRight">
              <div class="whiteLineOne"></div>
              <div class="whiteLineTwo"></div>
            </div>
          </div>
          <div class="occupationMain mainBox">
            <!-- 添加白色蒙版 -->
            <div v-if="!isReportUnlocked || selectedImageIndex !== 2" class="unlockedmask">
              <div class="complexMask">
                <span>据2024年的人才招聘官网统计显示，华为、招商银行、中国银行、百事可乐、麦肯锡、IBM、通用电气等在内的700多家企业都在 <i>用mbti测试应聘者</i>
                  ，你参加面试时有遇到过面试官问:你的mbti是什么吗?</span>
                <span>其实这是为了更快的了解你的性格以及你是否适合这个岗位，那么我们自己在投递简历前也可以提前知道自己 <i>更适合什么样的工作</i> </span>
                <div class="goodWork workTitle">
                  <img src="../assets/images/smile.png" alt="">
                  <span> 适合的工作</span>
                </div>
                <span>本测评为您揭秘 您 <i>适合的工作</i> </span>
                <div class="badWork workTitle">
                  <img src="../assets/images/mine.png" alt="">
                  <span> 雷区的工作</span>
                </div>
                <span>本测评为您揭秘 您 <i>不大适合的工作</i> </span>
              </div>
              <div v-if="selectedImageIndex === 2" @click="unlockReport" class="toLockBtn">查看专属报告</div>
              <div v-else @click="unlockCompleteReport" class="toLockBtn">查看完整报告</div>
            </div>
            <div v-if="shgz">
              <div class="occupationLongText">
                <ul>
                  <li v-for="(item, index) in occupationList" :key="index">
                    <span>{{ item.description }}</span>
                  </li>
                </ul>
              </div>
              <div class="goodWork workTitle">
                <img src="../assets/images/smile.png" alt="">
                <span> 适合的工作</span>
              </div>
              <div class="goodWorkLongText">
                <ul>
                  <li v-for="(item, index) in shgz.goodForWork" :key="index">
                    <span>{{ item }}</span>
                  </li>
                </ul>
              </div>
              <div class="badWork workTitle">
                <img src="../assets/images/mine.png" alt="">
                <span> 雷区的工作</span>
              </div>
              <div class="badWorkLongText">
                <span class="blueText">不适合的岗位特征</span>
                <ul>
                  <li v-for="(item, index) in shgz.unableJob" :key="index">
                    <span>{{ item }}</span>
                  </li>
                </ul>
              </div>
              <div class="badWorkLongText">
                <span class="blueText">不建议从事的岗位</span>
                <ul>
                  <li v-for="(item, index) in shgz.notRecommended" :key="index">
                    <span>{{ item }}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <!-- 如何适应职场? -->

        <div class="adaptation boxBorder">
          <div class="title">
            <div class="whiteLineLeft">
              <div class="whiteLineOne"></div>
              <div class="whiteLineTwo"></div>
            </div>
            <span>如何适应职场？</span>
            <div class="whiteLineRight">
              <div class="whiteLineOne"></div>
              <div class="whiteLineTwo"></div>
            </div>
          </div>
          <div class="adaptationMain mainBox">
            <!-- 添加白色蒙版 -->
            <div v-if="!isReportUnlocked || selectedImageIndex !== 2" class="unlockedmask">
              <div class="complexMask">
                <span>了解自己的性格，能够为个人带来多方面的积极影响，不仅有助于自我认知的提升，还能在 <i>职场关系</i> 中实现 <i>更好的发展</i> </span>
                <div class="leader titleBox">
                  <img src="../assets/images/smile.png" alt="">
                  <span>身为领导</span>
                </div>
                <div class="fellow titleBox">
                  <img src="../assets/images/smileBlue.png" alt="">
                  <span>身为同事</span>
                </div>
                <div class="minion titleBox">
                  <img src="../assets/images/smileGreen.png" alt="">
                  <span>身为下属</span>
                </div>
              </div>
              <div v-if="selectedImageIndex === 2" @click="unlockReport" class="toLockBtn">查看专属报告</div>
              <div v-else @click="unlockCompleteReport" class="toLockBtn">查看完整报告</div>
            </div>
            <div v-if="shzc">
              <div class="leader titleBox">
                <img src="../assets/images/smile.png" alt="">
                <span>身为领导</span>
              </div>
              <div class="leaderLongText longText">
                <ul>
                  <li v-for="(item, index) in shzc.asALeader" :key="index">
                    <span>{{ item }}</span>
                  </li>
                </ul>
              </div>
              <div class="fellow titleBox">
                <img src="../assets/images/smileBlue.png" alt="">
                <span>身为同事</span>
              </div>
              <div class="fellowLongText longText">
                <ul>
                  <li>
                    <span>{{ shzc.asColleague }}</span>
                  </li>
                </ul>
              </div>
              <div class="minion titleBox">
                <img src="../assets/images/smileGreen.png" alt="">
                <span>身为下属</span>
              </div>
              <div class="minionLongText longText">
                <ul>
                  <li>
                    <span>{{ shzc.asSubordinate }}</span>
                  </li>
                </ul>
              </div>
            </div>

          </div>
        </div>

        <!-- 动物系恋人 -->

        <div class="animalLove boxBorder">
          <div class="title">
            <div class="whiteLineLeft">
              <div class="whiteLineOne"></div>
              <div class="whiteLineTwo"></div>
            </div>
            <span>动物系恋人</span>
            <div class="whiteLineRight">
              <div class="whiteLineOne"></div>
              <div class="whiteLineTwo"></div>
            </div>
          </div>
          <div class="animalLoveMain mainBox">
            <!-- 添加白色蒙版 -->
            <div v-if="!isReportUnlocked || selectedImageIndex !== 2" class="unlockedmask">
              <span>看看你的恋爱性格，像哪种小动物，是 <i>猫系</i> 还是<i>狗系</i> ，是 <i>狐系</i> 还是<i>蛇系</i> </span>
              <div v-if="selectedImageIndex === 2" @click="unlockReport" class="toLockBtn">查看专属报告</div>
              <div v-else @click="unlockCompleteReport" class="toLockBtn">查看完整报告</div>
            </div>
            <div v-if="dwxlr">
              <div class="textBox">
                <span>{{ dwxlr.title }}</span>
                <img src="../assets/images/hearts.svg" alt="">
              </div>
              <div class="animalLoveBox">
                <div class="dogBox">
                  <div class="dogBgc"></div>
                  <img :src="imgUrl + dwxlr.dwxlrImg" alt="">
                </div>
                <div class="animalLoveLongText">
                  {{ dwxlr.spec }}
                </div>
              </div>
            </div>
          </div>
        </div>


        <!-- 纯爱排名 -->

        <div class="pureLove boxBorder">
          <div class="title">
            <div class="whiteLineLeft">
              <div class="whiteLineOne"></div>
              <div class="whiteLineTwo"></div>
            </div>
            <span>纯爱排名</span>
            <div class="whiteLineRight">
              <div class="whiteLineOne"></div>
              <div class="whiteLineTwo"></div>
            </div>
          </div>
          <div class="pureLoveMain mainBox">
            <!-- 添加白色蒙版 -->
            <div v-if="!isReportUnlocked || selectedImageIndex !== 2" class="unlockedmask">
              <span>快看看你的性格类型，<i>纯爱排名</i> 多少吧，ღ( ´･ᴗ･` )比心 </span>
              <div v-if="selectedImageIndex === 2" @click="unlockReport" class="toLockBtn">查看专属报告</div>
              <div v-else @click="unlockCompleteReport" class="toLockBtn">查看完整报告</div>
            </div>
            <img v-if="cadf" :src="imgUrl + cadf" alt="">
          </div>
        </div>

        <!-- 恋爱说明书-->

        <div class="loveInstruction boxBorder">
          <div class="title">
            <div class="whiteLineLeft">
              <div class="whiteLineOne"></div>
              <div class="whiteLineTwo"></div>
            </div>
            <span>恋爱说明书</span>
            <div class="whiteLineRight">
              <div class="whiteLineOne"></div>
              <div class="whiteLineTwo"></div>
            </div>
          </div>
          <div class="loveInstructionMain mainBox">
            <!-- 添加白色蒙版 -->
            <div v-if="!isReportUnlocked || selectedImageIndex !== 2" class="unlockedmask">
              <span>翻阅恋爱手册，看看自己到底是不是那个平平无奇的 <i>恋爱小天才</i> ？</span>
              <div v-if="selectedImageIndex === 2" @click="unlockReport" class="toLockBtn">查看专属报告</div>
              <div v-else @click="unlockCompleteReport" class="toLockBtn">查看完整报告</div>
            </div>
            <div class="textBox">
              <span>爱非一时兴起，而是奉陪到底</span>
              <img src="../assets/images/hearts.svg" alt="">
            </div>
            <div class="loveInstructionList">
              <ul>
                <li class="loveInstructionItem">
                  <div class="listLeft blue">
                    <img src="../assets/images/Love1.png" alt="">
                    <span>人格说明</span>
                  </div>
                  <div class="listRight blue">
                    <div class="loveText" v-for="(item, index) in lasms.rgsm" :key="index"> {{ item }}
                    </div>
                  </div>
                </li>
                <li class="loveInstructionItem">
                  <div class="listLeft yellow">
                    <img src="../assets/images/Love2.png" alt="">
                    <span>粘人指数</span>
                  </div>
                  <div class="listRight yellow">
                    <div class="loveText" v-for="(item, index) in lasms.nrzs" :key="index"> {{ item }}
                    </div>

                  </div>
                </li>
                <li class="loveInstructionItem">
                  <div class="listLeft green">
                    <img src="../assets/images/Love3.png" alt="">
                    <span>恋爱表现</span>
                  </div>
                  <div class="listRight green">
                    <div class="loveText" v-for="(item, index) in lasms.labx" :key="index"> {{ item }}
                    </div>

                  </div>
                </li>
                <li class="loveInstructionItem">
                  <div class="listLeft pink">
                    <img src="../assets/images/Love4.png" alt="">
                    <span>恋爱禁区</span>
                  </div>
                  <div class="listRight pink">
                    <div class="loveText" v-for="(item, index) in lasms.lajq" :key="index"> {{ item }}
                    </div>

                  </div>
                </li>
              </ul>
            </div>
          </div>

        </div>

        <!-- 最佳伴侣组合 -->

        <div class="bestCombination boxBorder">
          <div class="title">
            <div class="whiteLineLeft">
              <div class="whiteLineOne"></div>
              <div class="whiteLineTwo"></div>
            </div>
            <span>最佳伴侣组合</span>
            <div class="whiteLineRight">
              <div class="whiteLineOne"></div>
              <div class="whiteLineTwo"></div>
            </div>
          </div>
          <div class="bestCombinationMain mainBox">
            <!-- 添加白色蒙版 -->
            <div v-if="!isReportUnlocked || selectedImageIndex !== 2" class="unlockedmask">
              <span>看看自己的 <i>性格官配</i> 是谁？现实生活中是否已经在一起？ </span>
              <div v-if="selectedImageIndex === 2" @click="unlockReport" class="toLockBtn">查看专属报告</div>
              <div v-else @click="unlockCompleteReport" class="toLockBtn">查看完整报告</div>
            </div>
            <div v-if="zjblIMG" class="imgList">
              <div v-for="(item, index) in zjblIMG" :key="index" class="imgItem">
                <img :src="imgUrl + item.img" alt="">
                <span>{{ item.type }}</span>
              </div>
            </div>
            <div v-if="zjbl" class="textList">
              <!-- 分割线 -->
              <!-- zjbl -->
              <div v-for="(item, index) in zjbl" :key="index">
                <div class="splitLine"></div>
                <div class="textItem">
                  <div class="ItemLeft">
                    <div class="loveBox">
                      <img src="../assets/images/loveBgc.png" alt="">
                      <span class="score">{{ item.ladf }}分</span>
                    </div>
                    <span>恋爱得分</span>
                  </div>
                  <div class="ItemRight">
                    <div class="loveTitleBox">
                      <div :class="['baseBgc', `loveTitle${index + 1}`]">{{ item.cpName }}</div>
                      <!-- <div :class="['baseBgc', `loveTitle${index + 1}`]"> ENTP × INTJ | 量子纠缠的组 </div> -->
                      <img src="../assets/images/hearts.svg" alt="">
                    </div>
                    <div class="loveDesc">{{ item.lams }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 辛辣锐评 -->
        <div class="spicy boxBorder">
          <div class="title">
            <div class="whiteLineLeft">
              <div class="whiteLineOne"></div>
              <div class="whiteLineTwo"></div>
            </div>
            <span>辛辣锐评</span>
            <div class="whiteLineRight">
              <div class="whiteLineOne"></div>
              <div class="whiteLineTwo"></div>
            </div>
          </div>
          <div class="spicyMain mainBox">
            <!-- 添加白色蒙版 -->
            <div v-if="!isReportUnlocked || selectedImageIndex !== 2" class="unlockedmask">
              <span>用 <i>有梗</i>的语言，<i>调侃</i> 一下你的性格，哈哈，找点生活乐趣？ </span>
              <div v-if="selectedImageIndex === 2" @click="unlockReport" class="toLockBtn">查看专属报告</div>
              <div v-else @click="unlockCompleteReport" class="toLockBtn">查看完整报告</div>
            </div>
            <div v-if="xlrp">
              <div class="nameTitle">—— {{ xlrp.title }} ——</div>
              <div class="spicyText">{{ xlrp.content }}</div>
              <img class="specialtyImg" src="../assets/images/spicyImg.png" alt="">
              <span class="notice">再次声明:以上内容仅供娱乐，MBTI本质是认识自我的工具而非枷锁~大家开心就好，如不满意建议给自己单开一个人格类型</span>
            </div>
          </div>
        </div>


        <!-- 人格梗图 -->

        <div class="personalityMeme boxBorder">
          <div class="title">
            <div class="whiteLineLeft">
              <div class="whiteLineOne"></div>
              <div class="whiteLineTwo"></div>
            </div>
            <span>人格梗图</span>
            <div class="whiteLineRight">
              <div class="whiteLineOne"></div>
              <div class="whiteLineTwo"></div>
            </div>
          </div>
          <div class="personalityMemeMain mainBox">
            <!-- 添加白色蒙版 -->
            <div v-if="!isReportUnlocked || selectedImageIndex !== 2" class="unlockedmask">
              <span>看看你的 <i>性格小梗图</i> ，和你的相似人格是如何相处的？ </span>
              <div v-if="selectedImageIndex === 2" @click="unlockReport" class="toLockBtn">查看专属报告</div>
              <div v-else @click="unlockCompleteReport" class="toLockBtn">查看完整报告</div>
            </div>
            <div class="nameTitle">—— MBTI十六人格的善与恶 ——</div>
            <img class="goodAndBed" src="../assets/images/goodAndBed.png" alt="">
            <div class="nameTitle">—— {{ rggt_group }} ——</div>
            <img class="lastImg" :src="imgUrl + rggt" alt="">
          </div>
        </div>

        <!-- 总结文字 -->
        <div class="lastText" v-if="isReportUnlocked">
          <ul>
            <li>
              恭喜你，成功解锁MEBTI！
            </li>
            <li>每个人的天赋都<i class="blackText">独一无二，</i></li>
            <li> <i class="blueText">你</i>亦是这个世界的 <i class="blueText">不可或缺</i>，</li>
            <li>最后，祝愿来来的你</li>
            <li><i class="blueText">日月引航，繁花似锦！</i></li>
          </ul>
        </div>
        <!-- 分享按钮 已经解锁完整报告  自己的按钮   isSelf 1是自己,0不是-->
        <div class="shareBtn" v-if="isReportUnlocked && isSelf && selectedImageIndex === 2">
          <div class="share" @click="shareBtn">分享报告</div>
          <div class="poster" @click="openPoster">生成海报</div>
        </div>
        <!-- 分享按钮   已经解锁基础报告 selectedImageIndex  自己的按钮-->
        <div class="basicBox" v-if="isReportUnlocked && isSelf && selectedImageIndex !== 2">
          <div class="basicBtn" @click="unlockCompleteReport">解锁完整报告</div>
          <div class="share" @click="shareBtn">分享报告</div>
          <div class="poster" @click="openPoster">生成海报</div>
        </div>
        <!-- 已经解锁,好友的按钮 -->
        <div class="lockReportBox" v-if="isReportUnlocked && !isSelf">
          <div class="lockReportBrn" @click="toTest">
            <i>立刻探索你的专属性格吧！</i>
            <span>进入测试 ▶</span>
          </div>
        </div>
        <!-- 未解锁时的按钮 -->
        <div class="lockReportBox">
          <div class="lockReportBrn" v-if="!isReportUnlocked" @click="unlockReport">
            <i>哇塞！你居然是很特别的稀有人格啊~</i>
            <span>解锁你的专属报告</span>
          </div>
        </div>


      </div>
    </div>
    <!-- 套餐弹窗 -->
    <div class="unlockPopup" v-if="isPopupVisible">
      <div class="popupContent">
        <img class="closeIcon" @click="closePopup" src="../assets/images/closeIcon.png" alt="">
        <h3>已有<span class="redTips">1,291,489</span>人获得<span class="redTips">报告</span></h3>
        <p>临时报告将于 {{ minutes }} 分 {{ seconds }} 秒后失效</p>
        <div class="optionsBox">
          <div @click="selectImage(1)">
            <img class="optionsImg" v-if="selectedImageIndex === 2" src="../assets/images/basicOptions.png" alt="">
            <img class="optionsImg" v-else src="../assets/images/basicOptions_selected.png" alt="">
          </div>
          <div @click="selectImage(2)">
            <img class="optionsImg" v-if="selectedImageIndex === 2" src="../assets/images/fullOptions.png" alt="">
            <img class="optionsImg" v-else src="../assets/images/fullOptions_selected.png" alt="">
          </div>
        </div>
        <div class="lockReport" @click="tolockReport">
          <i>哇塞！你居然是很特别的稀有人格啊~</i>
          <span>解锁你的专属报告</span>
        </div>
      </div>
    </div>
    <!-- 支付弹窗 -->
    <div class="paymentPopup" v-if="isPaymentPopupVisible">
      <div class="popup-mask"></div>
      <div class="content">
        <div class="popup-content">
          <div class="paymentText">
            <p>付费解锁报告</p>
            <span> <i>¥</i> {{ payMoney }}</span>
          </div>
          <div class="payment-options">
            <!--  :class="['baseBgc', `loveTitle${index + 1}`]" -->
            <div class="paymentBtnWe" @click="selectPaymentMethod('wechat')"
              :class="{ 'selected': selectedPaymentMethod === 'wechat' }">
              <img src="../assets/images/wechat-pay.png" alt="微信支付">
            </div>
            <div class="paymentBtn" @click="selectPaymentMethod('alipay')"
              :class="{ 'selected': selectedPaymentMethod === 'alipay' }">
              <img src="../assets/images/alipay.png" alt="支付宝支付">
            </div>
          </div>
          <div class="confirm-payment" @click="confirmPayment">
            <span>确认支付</span>
          </div>
        </div>
        <div class="popupClose" @click="closePaymentPopup">
          <img src="../assets/images/close-icon.png" alt="">
        </div>
      </div>


    </div>
    <!-- 优惠弹窗 -->
    <div class="discountPopup" v-if="isDiscountPopupVisible">
      <div class="content">
        <div class="discountPopup-content" @click="discountPopupBtn">
          <!-- 基础的优惠 //套餐类型 1基础报告2完整报告-->
          <img v-if="selectedImageIndex === 1" src="../assets/images/baseDiscount.png" alt="">
          <!-- 完整的优惠 -->
          <img v-if="selectedImageIndex === 2" src="../assets/images/completeDiscount.png" alt="">
        </div>
        <div class="popupClose" @click="closeDiscounttPopup">
          <img src="../assets/images/close-icon.png" alt="">
        </div>
      </div>


    </div>

    <!-- pc端二维码支付弹窗 -->
    <div class="qrCodePopup paymentPopup" v-if="isQrCodePopupVisible">
      <div class="content">
        <div class="discountPopup-content">
          <div class="qrCodeText"> 请使用<span>{{ deviceName }}</span>扫描二维码支付</div>
          <!-- 请使用微信扫描二维码支付 -->
          <!-- <span>{{ qrCodeUrl }}</span> -->
          <qrcode-vue :value="qrCodeUrl" size:350></qrcode-vue>
          <div class="footBtn" @click="finishPayment">
            已完成支付
          </div>
        </div>
        <div class="popupClose" @click="closeQrCodePopup">
          <img src="../assets/images/close-icon.png" alt="">
        </div>
      </div>
    </div>

    <!-- 海报弹窗 -->
    <div class="PosterPopup" v-if="isPosterPopupVisible">
      <div class="content">
        <div class="PosterPopup-content">
          <!-- <img :src="imgUrl + rwshare_boy" alt=""> -->
          <Swipe :autoplay="3000" lazy-render indicator-color="white" @change="onChange">
            <SwipeItem v-for="(item, index) in rwshare" :key="index">
              <img :src="imgUrl + item" alt="">
            </SwipeItem>
          </Swipe>
        </div>
        <div class="PosterpopupClose" @click="closePosterPopup">
          <div class="closeBtn" @click="closePosterPopup">关闭</div>
          <div class="downLoadBtn" @click="downLoadBtn">立即下载</div>
        </div>
      </div>


    </div>

  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import PercentageBar from '../components/Percentage.vue';
import QrcodeVue from 'qrcode.vue'
import {
  Swipe, SwipeItem, Button, showSuccessToast, showFailToast,
  showLoadingToast, closeToast, showToast, showDialog,
} from 'vant';
import useClipboard from 'vue-clipboard3';
const { toClipboard } = useClipboard();
import { useRoute, useRouter } from 'vue-router'


import {
  getSubmitCountByPageId, getResultCard, getResult, quesGetQrCode,
  getResultStatus, getAlipayLink, getWxPayQrCode
} from '../api/mbtiApi.js'

import purple1 from '../assets/images/purple1.png';
import purple2 from '../assets/images/purple2.png';
import yellow1 from '../assets/images/yellow1.png';
import yellow2 from '../assets/images/yellow2.png';
import green1 from '../assets/images/green1.png';
import green2 from '../assets/images/green2.png';
import blue1 from '../assets/images/blue1.png';
import blue2 from '../assets/images/blue2.png';


const route = useRoute()
const imgUrl = ref('')

const isQrCodePopupVisible = ref(false); //二维码弹窗
const qrCodeUrl = ref('https://qr.alipay.com/bax035126cstqz6lhxjx0066'); //二维码url


const isPosterPopupVisible = ref(false); //海报弹窗

const openPoster = () => {
  isPosterPopupVisible.value = true;
}
const closePosterPopup = () => {
  isPosterPopupVisible.value = false;
}
const PosterIndex = ref(0); //海报下标
const onChange = (index) => {
  PosterIndex.value = index
  console.log(index);
}
const downLoadBtn = async () => {
  try {
    // 这里假设要下载的图片地址为 rwshare_boy 的图片地址
    const imageUrl = imgUrl.value + rwshareCode.value[PosterIndex.value];
    const response = await fetch(imageUrl);
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    // 设置下载的文件名
    a.download = 'downloaded_image.jpg';
    a.click();
    window.URL.revokeObjectURL(url);
    showSuccessToast('下载成功');
  } catch (error) {
    showFailToast('下载失败');
  }
};

const shareFirenly = async () => {
  try {
    //获取环境变量
    const apiBaseUrl = import.meta.env.VITE_MBTI_URL;
    console.log('VITE_MBTI_URL:', apiBaseUrl);
    // VITE_MBTI_URL
    await toClipboard(apiBaseUrl);
    console.log('复制成功');
    showSuccessToast('链接复制成功！');

  } catch (e) {
    console.error(e);
    console.error('复制失败');
    showFailToast('链接复制失败！');
  }
};

const isSelf = ref(1); //是否是自己的报告,要判断是不是分享给别人看了
const shareBtn = async () => {
  try {
    // 获取当前页面的 URL
    let currentUrl = window.location.href;
    // VITE_MBTI_URL
    currentUrl = currentUrl + '&isSelf=' + 0
    console.log('当前页面的 URL:', currentUrl);
    await toClipboard(currentUrl);
    console.log('复制成功');
    showSuccessToast('链接复制成功！');
  } catch (e) {
    console.error(e);
    console.error('复制失败');
    showFailToast('链接复制失败！');
  }
}
const router = useRouter();
const toTest = () => {
  router.push({
    path: '/',
  });
}
const goHome = () => {
  router.push({
    path: '/',
  });
}

const closeQrCodePopup = () => {
  isQrCodePopupVisible.value = false;
}

const isDiscountPopupVisible = ref(false);
const closeDiscounttPopup = () => {
  isDiscountPopupVisible.value = false;
  //缓存优惠弹窗已经出现过
  localStorage.setItem('hasShownDiscountPopup', true);
  sessionStorage.setItem('hasShownDiscountPopup', true);
};

// 新增套餐弹窗相关变量和方法
const selectedImageIndex = ref(2) //套餐类型 1基础报告2完整报告
const isPopupVisible = ref(false);
// 选则套餐函数
const selectImage = (index) => {
  selectedImageIndex.value = index;
};

const tolockReport = () => {
  //关闭套餐弹窗
  isPopupVisible.value = false;
  //打开支付弹出
  isPaymentPopupVisible.value = true;
  //没有优惠前的价格
  if (selectedImageIndex.value === 1) {
    payMoney.value = 19.9;
  } else if (selectedImageIndex.value === 2) {
    payMoney.value = 29.9;
  }
}

const closePopup = () => {
  //关闭套餐弹窗
  isPopupVisible.value = false;
}
// 新增支付弹窗相关变量和方法
const isPaymentPopupVisible = ref(false);
const selectedPaymentMethod = ref('wechat'); // 默认选中微信支付

const payMoney = ref(29.9); //支付的钱
const discountPopupBtn = () => {
  //关闭优惠弹窗
  isDiscountPopupVisible.value = false;
  //打开支付弹窗
  isPaymentPopupVisible.value = true;
  // selectedImageIndex   套餐类型 1基础报告2完整报告
  if (selectedImageIndex.value === 1) {
    payMoney.value = 14.9;
  } else if (selectedImageIndex.value === 2) {
    payMoney.value = 24.9;
  }
}

const closePaymentPopup = () => {
  isPaymentPopupVisible.value = false;
  //打开优惠弹窗
  // 检查 localStorage 中是否有记录
  const hasShownDiscountPopup = localStorage.getItem('hasShownDiscountPopup');
  console.log('hasShownDiscountPopup', hasShownDiscountPopup);
  if (!hasShownDiscountPopup) {
    // 如果没有记录，显示弹窗并记录到 localStorage
    isDiscountPopupVisible.value = true;
    localStorage.setItem('hasShownDiscountPopup', true);
    sessionStorage.setItem('hasShownDiscountPopup', true);
  }
};

const selectPaymentMethod = (method) => {
  selectedPaymentMethod.value = method;
};

// 检测是否为移动端设备
const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

const confirmPayment = () => {
  if (selectedPaymentMethod.value) {
    // 这里可以添加实际的支付逻辑
    console.log(`选择了 ${selectedPaymentMethod.value} 支付`);
    if (selectedPaymentMethod.value === 'wechat') {
      isPaymentPopupVisible.value = false;
      if (isMobile) {
        console.log('移动端微信');
        //微信支付
        // /关闭蒙版,显示报告,请求解锁后的报告
        isReportUnlocked.value = true;
        isPaymentPopupVisible.value = false;
        toGetResult()
      } else {
        console.log('pc端微信二维码支付');
        getWxPayQrCodeApi()
      }
    } else if (selectedPaymentMethod.value === 'alipay') {
      // 支付宝支付
      isPaymentPopupVisible.value = false;
      if (isMobile) {
        console.log('移动端支付宝支付');
        // /关闭蒙版,显示报告,请求解锁后的报告
        // isReportUnlocked.value = true;
        // toGetResult()
        //调用移动端app支付
        aliPayMobileApi()
      } else {
        console.log('pc端支付宝网页版支付');
        aliPayQrCodeApi()
      }
    }

    // closePaymentPopup();
  }
};


//移动端支付宝支付
const aliPayMobileApi = () => {
  // 调用支付宝支付接口 
  const hasShownDiscountPopup = localStorage.getItem('hasShownDiscountPopup');
  const resultId = localStorage.getItem('resultId');
  console.log('resultId', resultId);
  const parmas = {
    "resultId": resultId, //报告id
    "reportType": selectedImageIndex.value, //报告类型 1基础报告2完整报告3报告升级
    "couponType": hasShownDiscountPopup ? 1 : 0 //优惠券类型 
  }
  getAlipayLink(parmas).then(res => {
    if (res.code === 200) {
      //支付宝返回的页面好像看不到这里,是一个新的页面
      // showDialog({
      //   message: '请确认支付是否已经完成',
      //   theme: 'round-button',
      // }).then(() => {
      //   // on close
      //   //点击支付成功确认按钮,调用支付成功判断接口
      //   TogetResultStatus();
      // });
      console.log('支付宝打开链接', JSON.stringify(res.msg))
      // 打开支付宝支付页面
      let resData = res.msg
      const div = document.createElement('div')
      div.id = 'alipay'
      div.innerHTML = resData
      document.body.appendChild(div)
      document.querySelector('#alipay').children[0].submit() // 执行后会唤起支付宝
    }
  }).catch(err => {
    console.log(err)
  })
}
let pollingTimer; // 定义轮询定时器
const deviceName = ref('微信') //设备类型
//pc支付宝网页版支付
const aliPayQrCodeApi = () => {
  // 调用支付宝支付接口
  const hasShownDiscountPopup = localStorage.getItem('hasShownDiscountPopup');
  const resultId = localStorage.getItem('resultId');
  console.log('resultId', resultId);
  const parmas = {
    "resultId": resultId, //报告id
    "reportType": selectedImageIndex.value, //报告类型 1基础报告2完整报告3报告升级
    "couponType": hasShownDiscountPopup ? 1 : 0 //优惠券类型 
  }
  quesGetQrCode(parmas).then(res => {
    if (res.code === 200) {
      //返回链接,打开网页版支付
      console.log('返回链接,打开网页版支付');
      let resData = res.msg
      const div = document.createElement('div')
      div.id = 'alipay'
      div.innerHTML = resData
      document.body.appendChild(div)
      document.querySelector('#alipay').children[0].submit() // 执行后会唤起支付宝
    }
  }).catch(err => {
    closeToast()
    console.log(err)
  })
}
//pc微信扫码接口
const getWxPayQrCodeApi = () => {
  // 调用支付宝支付接口
  showLoadingToast({
    message: '加载中...',
    forbidClick: true,
    duration: 0, // 持续显示
    loadingType: 'spinner',
  });
  const hasShownDiscountPopup = localStorage.getItem('hasShownDiscountPopup');
  const resultId = localStorage.getItem('resultId');
  console.log('resultId', resultId);
  const parmas = {
    "resultId": resultId, //报告id
    "reportType": selectedImageIndex.value, //报告类型 1基础报告2完整报告3报告升级
    "couponType": hasShownDiscountPopup ? 1 : 0 //优惠券类型 
  }
  getWxPayQrCode(parmas).then(res => {
    if (res.code === 200) {
      deviceName.value = '微信'
      closeToast() //清除loading
      console.log(res.data)
      isQrCodePopupVisible.value = true;
      qrCodeUrl.value = res.msg;
      // 启动轮询
      pollingTimer = setInterval(() => {
        TogetResultStatus();
      }, 10000); // 每10秒轮询一次
    }
  }).catch(err => {
    closeToast()
    console.log(err)
  })
}
const TogetResultStatus = () => {
  //查询是否支付成功 
  const resultId = localStorage.getItem('resultId');
  console.log('resultId', resultId);
  const parmas = {
    "resultId": resultId, //报告id
  }
  getResultStatus(parmas).then(res => {
    if (res.code === 200) {
      if (res.data) {
        console.log('支付成功')
        isQrCodePopupVisible.value = false;
        clearInterval(pollingTimer); // 停止轮询
        //关闭蒙版,显示报告,请求解锁后的报告
        isReportUnlocked.value = true;
        toGetResult()
      } else {
        // 未支付订单继续显示蒙版
        isReportUnlocked.value = false
        toGetResultCard() //请求轮播图的数据
      }
    }
  }).catch(err => {
    console.log(err)
    clearInterval(pollingTimer); // 停止轮询
  })
}
//已经完成支付按钮

const finishPayment = () => {
  //查询是否支付成功 
  const resultId = localStorage.getItem('resultId');
  console.log('resultId', resultId);
  const parmas = {
    "resultId": resultId, //报告id
  }
  getResultStatus(parmas).then(res => {
    if (res.code === 200) {
      if (res.data) {
        console.log('支付成功')
        isQrCodePopupVisible.value = false;
        clearInterval(pollingTimer); // 停止轮询
        //关闭蒙版,显示报告,请求解锁后的报告
        isReportUnlocked.value = true;
        toGetResult()
      } else {
        // 还没有支付提示 还未付款成功,请继续付款
        showToast('还未付款成功,请继续付款');
      }
    }
  }).catch(err => {
    console.log(err)
    clearInterval(pollingTimer); // 停止轮询
  })
}



//报告是否未解锁
const isReportUnlocked = ref(false);

//查看专属报告按钮
const unlockReport = () => {
  // 打开套餐
  isPopupVisible.value = true;
}
//查看完整报告
const unlockCompleteReport = () => {
  // 打开支付 支付10元
  isPaymentPopupVisible.value = true;
  payMoney.value = 10;
  //套餐类型是3
  selectedImageIndex.value = 3;
}


//获取报告提交人数
const submitCount = ref();

const getSubmitCount = () => {
  //获取pageId
  const pageId = localStorage.getItem('pageId');
  console.log('pageId', pageId);
  if (!pageId) {
    //如果缓存中没有,路由参数获取pageId
    pageId = route.query.pageId; // 获取路由参数中的 pageId
  }
  const data = { pageId: parseInt(pageId) }
  getSubmitCountByPageId(data).then(res => {
    if (res.code === 200) {
      console.log(res.data)
      submitCount.value = res.data;
    }
  }).catch(err => {
    console.log(err)
  })
}
//获取小卡片数据
const resultCard = ref([{
  "content": "辩论家，创新思考者",
  "mbtiType": "ENTP",
  "remark": "聪明好奇，思维活跃，不放弃任何智力挑战",
  "points": "70,30,24,76,80,20,35,65",
  "cardImg": "rwENTP.png",
  "t": 80,
  "p": 65,
  "e": 70,
  "i": 30,
  "n": 76,
  "f": 20,
  "s": 24,
  "j": 35
}, {
  "content": "辩论家，创新思考者",
  "mbtiType": "ENTP",
  "remark": "聪明好奇，思维活跃，不放弃任何智力挑战",
  "points": "70,30,24,76,80,20,35,65",
  "cardImg": "rwENTP.png",
  "t": 80,
  "p": 65,
  "e": 70,
  "i": 30,
  "n": 76,
  "f": 20,
  "s": 24,
  "j": 35
}, {
  "content": "辩论家，创新思考者",
  "mbtiType": "ENTP",
  "remark": "聪明好奇，思维活跃，不放弃任何智力挑战",
  "points": "70,30,24,76,80,20,35,65",
  "cardImg": "rwENTP.png",
  "t": 80,
  "p": 65,
  "e": 70,
  "i": 30,
  "n": 76,
  "f": 20,
  "s": 24,
  "j": 35
}]);

const carouselRef = ref(null);
const toGetResultCard = () => {
  const resultId = localStorage.getItem('resultId');
  console.log('resultId', resultId);
  const data = { resultId: parseInt(resultId) }
  getResultCard(data).then(res => {
    if (res.code === 200) {
      // console.log(res.data)
      resultCard.value = res.data;
      console.log('resultCard', resultCard.value);
      // 重新初始化轮播组件
    }
  }).catch(err => {
    console.log(err)
  })
}

const rsxtColor = ref([
  {
    color: '#faefff',//紫色
    name:'紫人组',
    icon1:purple1,
    icon2:purple2,
  },
  {
    color: '#FFFAE6',//黄色
    name:'黄人组',
    icon1:yellow1,
    icon2:yellow2,
  },
  {
    color: '#e4ffed',//绿色
    name:'绿人组',
    icon1:green1,
    icon2:green2,
  },
  {
    color: '#e6f3ff',//蓝色
    name:'蓝人组',
    icon1:blue1,
    icon2:blue2,
  },
])

const getRsxtColorInfo = () => {
  return rsxtColor.value.find(item => item.name === rggt_group.value) || {};
};
//解锁后详情定义字段
const card = ref({
  "content": "辩论家，创新思考者",
  "mbtiType": "ENTP",
  "remark": "聪明好奇，思维活跃，不放弃任何智力挑战",
  "points": "70,30,24,76,80,20,35,65",
  "cardImg": "rwINTP.png",
  "t": 80,
  "p": 65,
  "e": 70,
  "i": 30,
  "n": 76,
  "f": 20,
  "s": 24,
  "j": 35
}) //小卡片
const ssq = ref([
  "",
  "",
  ""
]) //上上签
const sgzm = ref([
  {
    "word": "",
    "desc": "",
    "content": ""
  },
  {
    "word": "",
    "desc": "",
    "content": ""
  }
]) //四个字母
const skfs = ref({
  "type": "紫色型——概念主义者",
  "type2": "NT型",
  "swfs": "【思维范式】",
  "content": "以系统化思维构建认知框架。"
}) //思考方式 NT
const skfs_img = ref([
  {
    "mbtiType": "INTJ",
    "value": "ENTJskfs_img.png"
  },
  {
    "mbtiType": "INTP",
    "value": "ENTJskfs_img.png"
  },
  {
    "mbtiType": "ENTJ",
    "value": "ENTJskfs_img.png"
  },
  {
    "mbtiType": "ENTP",
    "value": "ENTJskfs_img.png"
  }
]) //思考方式图片组
const rkzb = ref({
  "rank": 5,
  "man": 4,
  "woman": 2,
  "total": 3.2
})//人口占比
const mrmj = ref([
  "ENTP 辩论家-1.jpg",
  "ENTP 辩论家-2.jpg",
  "ENTP 辩论家-3.jpg",
  "ENTP 辩论家-4.jpg"
])//名人名家
const fsb = ref({
  "prize": "最自恋奖",
  "content": "不用解释，老子就是最完美的人"
})//封神榜
const sgtz = ref({
  "title": "执政官",
  "desc": "非常友好、关心他人和具有亲和力，注重维护人际关系和社会秩序。ESFJ非常善于组织活动和社交场合，并为他人提供支持和帮助。ESFJ也非常重视传统和稳定性，他们通常很善于管理日常生活和处理各种问题。",
  "merit": [
    {
      "skill": "强大的实用技能",
      "description": "擅长管理日常任务与例行维护，确保身边人得到照顾。"
    }
  ],
  "shortcoming": [
    {
      "skill": "担心社交地位",
      "description": "关注社交地位影响决策，限制创造力与开放性。"
    },
    {
      "skill": "不灵活",
      "description": "重视社交规范，对非传统事物谨慎甚至批评，可能过度推销自身信仰。"
    }
  ]
})//性格特征
const rsxt = ref({
  "line": "人之所以言之凿凿，是因为知道得太少，",
  "name": "弗朗索瓦·基佐"
},)//人生信条
const xlnl = ref({
  "title": "少年组21-29岁",
  "spec": "男人至死是少年！不容辩驳！"
})//心理年龄
const shgz = ref({
  "goodForWork": [
    "销冠",
  ],
  "unableJob": [
    "枯燥乏味没有挑战性",
  ],
  "notRecommended": [
    "采购",
  ]
})//适合工作
const shzc = ref({
  "asALeader": [
    "ENTP是团队中的创意大师，他们思维活跃,总能提出新颖的点子。在他们的带领下，团队创新不断，永不止步！只是，记得把想法落地哦！"
  ],
  "asColleague": "热衷头脑风暴、辨论和过度分析，但也要以任务为导向。对想法进行诚实、直接和客观的评估的同时",
  "asSubordinate": "乐于挑战上级的想法，并且对限制性规则和规章有强烈的厌恶"
})//适合职场
const dwxlr = ref({
  "title": "狐系恋人",
  "spec": "灵活聪明狡猾，在感情里采取策略性的方式，灵活多变富有创造力和感染力，喜欢新鲜感和变化，调皮和挑战。",
  "dwxlrImg": "狐狸.png"
})//动物系恋人
const cadf = ref('ENTP-purple.png')//纯爱得分
const lasms = ref({
  "rgsm": ["三寸不烂之舌", "喜欢发表惊世骇俗言论", "风趣韦小宝"],
  "nrzs": ["不喜欢被粘", "但喜欢逗弄另一半"],
  "labx": ["嘴硬 傲娇", "不按常理出牌带来很多惊喜"],
  "lajq": ['讨厌被说“你不懂”', '讨厌拒绝沟通', '讨厌出现问题矛盾时选择回避']
})//恋爱说明书
const zjbl = ref([
  {
    "cpName": "ENTP × INTJ | 辩论组",
    "ladf": "100",
    "lams": "智慧与逻辑的化身，遇到同样思维缜密的TA，简直是棋逢对手，将遇良才！ CP得分：100%！"
  },

])//最佳伴侣
const zjblIMG = ref([
  { type: "ESTJ", img: "rwESTJ.png" },
  { type: "ISTP", img: "rwISTP.png" },
  { type: "ESFJ", img: "rwESFJ.png" },
])//最佳伴侣涉及图片
const xlrp = ref({
  "title": "杠精转世",
  "content": "逻辑鬼才辩论赛，怼人就像开盲盒，你永远不知道他下一句是暴击还是暴毙。"
})//辛辣锐评
const rggt = ref("人格梗图紫人组.jpg")//人格梗图
const rggt_group = ref('紫人组')//人格梗图分组
const mbtiType = ref('ENTP')//本报告人格属性
const rwshare_boy = ref('rwshare_ENTP-boy.png')//海报分享图
const rwshare_girl = ref('rwshare_ENTP-girl.png')//海报分享图
const rwshare_boy_s = ref('rwshare_小图_ENTP-boy.png')//海报分享图
const rwshare_girl_s = ref('rwshare_小图_ENTP-girl.png')//海报分享图
const rwshareCode = ref([rwshare_boy.value, rwshare_girl.value])
const rwshare = ref([rwshare_boy_s.value, rwshare_girl_s.value])

// 封装赋值逻辑的函数
const assignValueIfExists = (refVar, data, field) => {
  if (data.hasOwnProperty(field)) {
    refVar.value = data[field];
    // console.log(`Successfully assigned value to ${field}`);
  }
};

//解锁后获取详情
const toGetResult = () => {
  const resultId = localStorage.getItem('resultId');
  console.log('resultId', resultId);
  const data = { resultId: parseInt(resultId) }
  getResult(data).then(res => {
    if (res.code === 200) {
      // showToast({
      //  message: JSON.stringify(res.data),
      //  position: 'top',
      //  duration: 0,
      //  });
      console.log('999', res.data)
      // console.log('999', res.data);
      // const fields = [
      //   'card', 'ssq', 'sgzm', 'skfs', 'skfs_img',
      //   'rkzb', 'mrmj', 'fsb', 'sgtz', 'rsxt',
      //   'xlnl', 'shgz', 'shzc', 'dwxlr', 'cadf',
      //   'lasms', 'zjbl', 'xlrp', 'rggt', 'zjblIMG',
      //   'mbtiType', 'rwshare_boy', 'rwshare_girl'
      // ];
      // fields.forEach(field => {
      //   const refVar = eval(field); // 通过变量名获取对应的 ref 变量
      //   if (res.data.hasOwnProperty(field)) {
      //     refVar.value = res.data[field];
      //   }
      // });
      // 直接赋值
      assignValueIfExists(card, res.data, 'card');
      assignValueIfExists(ssq, res.data, 'ssq');
      assignValueIfExists(sgzm, res.data, 'sgzm');
      assignValueIfExists(skfs, res.data, 'skfs');
      assignValueIfExists(skfs_img, res.data, 'skfs_img');
      assignValueIfExists(rkzb, res.data, 'rkzb');
      assignValueIfExists(mrmj, res.data, 'mrmj');
      assignValueIfExists(fsb, res.data, 'fsb');
      assignValueIfExists(sgtz, res.data, 'sgtz');
      assignValueIfExists(rsxt, res.data, 'rsxt');
      assignValueIfExists(xlnl, res.data, 'xlnl');
      assignValueIfExists(shgz, res.data, 'shgz');
      assignValueIfExists(shzc, res.data, 'shzc');
      assignValueIfExists(dwxlr, res.data, 'dwxlr');
      assignValueIfExists(cadf, res.data, 'cadf');
      assignValueIfExists(lasms, res.data, 'lasms');
      assignValueIfExists(zjbl, res.data, 'zjbl');
      assignValueIfExists(zjblIMG, res.data, 'zjblIMG');
      assignValueIfExists(xlrp, res.data, 'xlrp');
      assignValueIfExists(rggt, res.data, 'rggt');
      assignValueIfExists(rggt_group, res.data, 'rggt_group');
      assignValueIfExists(mbtiType, res.data, 'mbtiType');
      assignValueIfExists(rwshare_boy, res.data, 'rwshare_boy');
      assignValueIfExists(rwshare_girl, res.data, 'rwshare_girl');
      assignValueIfExists(rwshare_boy_s, res.data, 'rwshare_boy_s');
      assignValueIfExists(rwshare_girl_s, res.data, 'rwshare_girl_s');

      // 对 skfs_img 数组进行排序
      if (skfs_img.value && mbtiType.value) {
        const targetIndex = skfs_img.value.findIndex(item => item.mbtiType === mbtiType.value);
        if (targetIndex > -1) {
          const targetItem = skfs_img.value.splice(targetIndex, 1)[0];
          skfs_img.value.unshift(targetItem);
        }
      }
      // 将 rkzb.total 转化为数字
      if (rkzb.value) {
        for (const key in rkzb.value) {
          if (rkzb.value.hasOwnProperty(key)) {
            rkzb.value[key] = Number(rkzb.value[key]);
          }
        }
      }
      rwshareCode.value = [rwshare_boy.value, rwshare_girl.value]; //二维码的
      rwshare.value = [rwshare_boy_s.value, rwshare_girl_s.value];//预览小图
      console.log('card', card.value);
    }
  }).catch(err => {
    showToast(err);
    console.log(err)
  })
}

onMounted(() => {
  imgUrl.value = `${import.meta.env.VITE_API_BASE_URL}/ques/file/preview/`;
  //这里应该不需要,直接查询订单接口支付状态即可
  //支付宝支付成功之后跳转回来会清除缓存,所以要做一个转存从sessionStorage到localStorage
  const resultId = sessionStorage.getItem('resultId');
  console.log('resultId转存', resultId);
  if (resultId) {
    localStorage.setItem('resultId', resultId);
  }
  //获取pageId
  const pageId = sessionStorage.getItem('pageId');
  console.log('pageId抓存', pageId);
  if (pageId) {
    localStorage.setItem('pageId', pageId);
  }
  //获取
  const hasShownDiscountPopup = sessionStorage.getItem('hasShownDiscountPopup');
  console.log('hasShownDiscountPopup转存', hasShownDiscountPopup);
  if (hasShownDiscountPopup) {
    localStorage.setItem('hasShownDiscountPopup', hasShownDiscountPopup);
  }
  getSubmitCount(); //获取报告提交人数
  startCountdown();   // 组件挂载时启动倒计时

  // const locked = 0
  // if (locked) {
  //   toGetResult()
  // } else {
  //   toGetResultCard()
  // }
  TogetResultStatus();// 进入页面就查询报告是否已经支付

  console.log('route.query.isSelf', route.query.isSelf)
  if (route.query.isSelf == '0') {
    isSelf.value = Number(route.query.isSelf); //是否是自己的报告
  } else {
    isSelf.value = 1
  }
  console.log('isSelf', isSelf.value)
});




const countdownSeconds = ref(180); // 3分钟，即180秒
const minutesPay = computed(() =>
  Math.floor(countdownSeconds.value / 60).toString().padStart(2, "0")
);
const secondsPay = computed(() =>
  (countdownSeconds.value % 60).toString().padStart(2, "0")
);

let countdownTimer;

const startCountdownPay = () => {
  countdownTimer = setInterval(() => {
    if (countdownSeconds.value > 0) {
      countdownSeconds.value--;
    } else {
      // 倒计时结束，重新开始倒计时
      countdownSeconds.value = 180;
    }
  }, 1000);
};


// 定义总秒数，初始为 3 分钟（180 秒）
const totalSeconds = ref(180);
// 用于存储倒计时定时器 ID
let countdownInterval;

// 计算分钟数
const minutes = computed(() => {
  return Math.floor(totalSeconds.value / 60).toString().padStart(2, '0');
});

// 计算秒数
const seconds = computed(() => {
  return (totalSeconds.value % 60).toString().padStart(2, '0');
});

// 启动倒计时函数
const startCountdown = () => {
  countdownInterval = setInterval(() => {
    if (totalSeconds.value > 0) {
      totalSeconds.value--;
    } else {
      // 倒计时结束，重新开始计时
      totalSeconds.value = 180;
    }
  }, 1000);
};

// 停止倒计时函数
const stopCountdown = () => {
  clearInterval(countdownInterval);
};



// 组件卸载前停止倒计时，避免内存泄漏
onBeforeUnmount(() => {
  stopCountdown();
});


const occupationList = ref([
  { description: '每个人都有不同的岗位特质，如果岗位和人格相结合，那么个人的职业满足感和成就感，往往能达到一个相对较高层面。而在接下来的细化分析当中，个人具备哪些岗位特质，如何利用这些岗位特质，都是我们积极思考的方面。' },
  { description: '认真思考个人处在的岗位特质，结合自身实际体验，让岗位特质贯穿自己的工作经历，是一件对个人成长具有积极意义的事。' },
])


</script>

<style scoped lang="less">
.reportBgc {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow-y: auto;

  // 移动端样式
  @media (max-width: 767px) {
    background: url('../assets/images/reportBgc.png') center top / cover no-repeat;
    background-attachment: scroll;
    overflow-y: auto;
  }

  // PC端样式
  @media (min-width: 768px) {
    background: url('../assets/images/reportBgc.png') center center / cover;
    background-attachment: scroll;
    overflow-y: auto;
  }


}

.report {
  max-width: 767px;
  height: 100vh;
  padding: 0px 0px 60px 0px;
  display: flex;
  flex-direction: column;
  // align-items: center;
  // justify-content: center;
  margin: 0;
  font-family: SourceHanSansCN-R;

  // /* 隐藏 WebKit 浏览器滚动条 */
  // &::-webkit-scrollbar {
  //   display: none;
  // }

  // /* 隐藏 Firefox 滚动条 */
  // scrollbar-width: none;

  .homeBox {
    margin: 10px 0 0 20px;

    img {
      width: 25px;
      height: 25px;
    }

  }


  .summary {
    width: 100%;
    padding: 24px;
  }

  .reportTitle {
    display: flex;
    /* 使用 flex 布局让内容居中 */
    flex-direction: column;
    /* 垂直排列子元素 */
    align-items: center;
    justify-content: center;
    padding: 0 24px 30px;

    .titleOne {
      font-size: 24px;
      font-family: SourceHanSansCN-M;
      font-weight: Heavy;
      text-align: center;
      color: #ffffff;
      line-height: 35.5px;
      letter-spacing: 0.02px;
    }

    .titleText {
      font-size: 14px;
      font-family: SourceHanSansCN-R;
      font-weight: Regular;
      text-align: center;
      color: #ffffff;
      // line-height: 20px;
      margin-top: 5px;
    }
  }

  .tipsBox {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    position: relative;
    /* 设置为相对定位，作为.share绝对定位的参考 */

    .countdownBox {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      width: 140px;
      height: 30px;
      background: linear-gradient(200deg, #f6cfff 0%, #fcffe2 100%);
      border-radius: 15px;
      font-size: 12px;
      font-weight: Medium;
      color: #000000;

      .redTips {
        font-size: 13px;
        font-weight: Bold;
        color: #F1301c;
        line-height: 16px;
      }
    }

    .share {
      width: 85px;
      height: 25px;
      background: linear-gradient(165deg, #fff4a1 0%, #ffe568 100%);
      border-radius: 25px 0 0 25px;
      position: absolute;
      right: 0px;
      text-align: center;
      font-size: 13px;
      font-family: SourceHanSansCN-M;
      font-weight: 500;
      color: #000000;
      line-height: 25px;
    }
  }

  .totalNum {
    font-size: 11px;
    text-align: center;
    color: #ffffff;
    padding: 9px 0 14px;

    span {
      color: #FEF6AE;
    }
  }

  .describesBox {
    width: 100%;
    padding: 0 13px;
  }

  .describes {
    display: flex;
    flex-direction: row;
    // align-items: center;
    justify-content: center;
    width: 100%;
    height: 349px;
    background: rgba(11, 111, 255, 0.49);
    border-radius: 10px;
    position: relative;

    .up {
      width: 96%;
      height: 347px;
      position: absolute; // 设置为绝对定位
      top: -5px; // 向上定位 5px
      // margin: 0 auto;
    }

    .inside {
      // position: absolute; // 设置为绝对定位
      // top: -5px; // 向上定位 5px
      width: 100%;
      height: 347px;
      background: #ffffff;
      border-radius: 10px;
      display: flex;
      flex-direction: column;


      .insideTitle {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: right;
        width: 100%;
        height: 52px;
        padding: 0 12px;
        box-sizing: border-box;
        background: #0b6fff;
        background: linear-gradient(152deg, #1ea8ff 0%, #80c8ff 46%, #eeb0ff 100%);
        border-radius: 10px 10px 0px 0px;
        position: relative;

        span {
          opacity: 0.7;
          font-size: 24px;
          font-weight: bold;
          text-align: center;
          color: #ffffff;
          padding-left: 20px;
          position: relative;
        }

        .widthBot {
          width: 50px;
          height: 10px;
          position: absolute;
          left: 15px;
          top: 13px;
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: center;

          .bot {
            width: 10px;
            height: 10px;
            background: #ffffff;
            border-radius: 50%;
            margin-right: 7px;
          }
        }

      }

      .content {
        width: 100%;
        padding: 10px;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        flex: 1;

        .contentTop {
          height: 150px;
          width: 100%;
          display: flex;
          flex-direction: row;
          // align-items: center;
          justify-content: center;
          box-sizing: border-box; // 确保高度包含内边距和边框

          .topLeft {
            flex: 1;
            // padding: 10px 0 10px 10px;
            position: relative;

            .testTypeText {
              span {
                position: absolute;
                top: -13px;
                left: 0px;
                font-size: 14px;
                font-weight: 500;
                color: #000000;
                font-family: SourceHanSansCN-R;
              }

              .yellowBgc {
                position: absolute;
                top: 30px;
                left: 10px;
                width: 124px;
                height: 8px;
                background: #C9F3FF;

              }
            }

            .testName {
              position: absolute;
              top: 50px;
              left: 10px;
              width: 60px;
              height: 25px;
              background: #C9F3FF;
              border-radius: 14px;
              display: flex;
              flex-direction: row;
              align-items: center;
              justify-content: center;

              span {
                font-size: 15px;
                font-family: SourceHanSansCN-B;
                font-weight: Bold;
              }
            }

            .desc {
              position: absolute;
              top: 85px;
              left: 10px;

              .desc1 {
                font-size: 13px;
                color: #000000;
                font-family: SourceHanSansCN-R;
              }

              .desc2 {
                font-size: 11px;
                color: #000000;
                font-family: SourceHanSansCN-R;
              }
            }

          }

          .topRight {
            width: 115px;
            height: 150px;
            position: relative;

            img {
              position: absolute;
              top: 43%;
              left: 50%;
              transform: translate(-50%, -43%);
              // margin: 13px 8px 0 0;
              width: 115px;
              height: 115px;
            }
          }
        }

        .dividingLine {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          font-size: 9px;
          font-family: SourceHanSansCN-R;
          color: #ccc;

          .lineLeft,
          .lineRight {
            flex: 1;
            border-top: 1px dashed #ccc;
            position: relative;
            /* 为伪元素定位做准备 */
          }

          .lineLeft {
            margin-right: 10px;

            &::after {
              content: '';
              position: absolute;
              right: -6px;
              /* 调整圆圈位置 */
              top: 50%;
              transform: translateY(-50%);
              width: 5px;
              height: 5px;
              border: 1px solid #ccc;
              border-radius: 50%;
              background-color: transparent;
            }
          }

          .lineRight {
            margin-left: 10px;

            &::before {
              content: '';
              position: absolute;
              left: -6px;
              /* 调整圆圈位置 */
              top: 50%;
              transform: translateY(-50%);
              width: 5px;
              height: 5px;
              border: 1px solid #ccc;
              border-radius: 50%;
              background-color: transparent;
            }
          }
        }

        .contentFoot {
          display: flex;
          flex-direction: column; // 竖向布局
          justify-content: space-evenly; // 平均分配空间
          height: 100%; // 确保占据父元素的全部高度

          .item {
            display: flex;
            flex-direction: row;
            align-items: center;


            // justify-content: center;
            .Progress {
              flex: 1;

            }

            span {
              display: inline-block;
              width: 46px;
              text-align: left;
              font-size: 10px;
              font-family: SourceHanSansCN-R;
              color: #000000;
            }
          }
        }

      }

    }

    .el-carousel__item {
      border-radius: 10px;
      /* 为 el-carousel-item 设置圆角 */
      overflow: hidden;
      /* 确保内容也显示圆角，溢出部分隐藏 */
    }
  }

  .parseTitle {
    height: 40px;
    width: 100%;
    background: linear-gradient(162deg, #1e75ff 11%, #4cafff 39%, #a882ff 100%);
    font-size: 20px;
    font-family: SourceHanSansCN-M;
    font-weight: Medium;
    text-align: center;
    line-height: 40px;
    color: #ffffff;
  }

  .title {
    height: 46px;
    background: linear-gradient(160deg, #1e75ff 0%, #4cafff 39%, #a882ff 100%);
    border-radius: 10px 10px 0 0;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;


    span {
      font-size: 20px;
      font-family: SourceHanSansCN-M;
      // font-weight: 800;
      color: #ffffff;
    }

    .whiteLineLeft {
      width: 46px;
      height: 100%;
      position: relative;

      .whiteLineOne {
        width: 34px;
        height: 3px;
        position: absolute;
        top: 18px;
        right: 6px;
        opacity: 0.8;
        background: linear-gradient(to left, rgba(255, 255, 255, 0.85), rgba(255, 255, 255, 0));
        border-radius: 1px;
      }

      .whiteLineTwo {
        position: absolute;
        top: 24px;
        right: 18px;
        width: 34px;
        height: 3px;
        opacity: 0.8;
        background: linear-gradient(to left, rgba(255, 255, 255, 0.85), rgba(255, 255, 255, 0));
        border-radius: 1px;
      }
    }

    .whiteLineRight {
      width: 46px;
      height: 100%;
      position: relative;

      .whiteLineOne {
        width: 34px;
        height: 3px;
        position: absolute;
        top: 18px;
        left: 6px;
        opacity: 0.8;
        background: linear-gradient(297deg, rgba(255, 255, 255, 0.00), rgba(255, 255, 255, 0.85) 83%);
        border-radius: 2px;
      }

      .whiteLineTwo {
        position: absolute;
        top: 24px;
        left: 18px;
        width: 34px;
        height: 3px;
        opacity: 0.8;
        background: linear-gradient(297deg, rgba(255, 255, 255, 0.00), rgba(255, 255, 255, 0.85) 83%);
        border-radius: 2px;
      }
    }
  }

  .mainBox {
    background: #fff;
    border-radius: 0 0 10px 10px;
    position: relative;
  }



  .boxList {
    width: 100%;
    box-sizing: border-box;
    padding: 0 13px;

    .boxBorder {
      width: 100%;
      border-radius: 10px;
      box-shadow: 1px;
      margin-top: 25px;
      background: linear-gradient(180deg, rgba(255, 255, 255, 0.55), #ffffff);
    }

    .nameTitle {
      width: 100%;
      height: 33px;
      background: #e1f0ff;
      border-radius: 5px;
      color: #0F5CFF;
      font-size: 18px;
      font-family: SourceHanSansCN-B;
      text-align: center;
      line-height: 33px;
    }

    .signed {
      .signedMain {
        min-height: 220px;

        .typeName {
          padding-top: 19px;
          font-size: 16px;
          font-family: SourceHanSansCN-M;
          font-weight: Medium;
          text-align: center;
          color: #000;

          span {
            color: #0f5cff;
          }
        }

        .mainList {
          padding: 17px 0 23px;
          display: flex;
          /* 使用 flex 布局实现横向排列 */
          justify-content: space-evenly;
          /* 让子元素均等分布 */
          list-style: none;
          /* 去除列表默认样式 */

          li {
            flex: 0 0 94px;
            height: 180px;
            /* 让每个列表项占据相同的宽度 */
            text-align: center;

            /* 文字居中 */
            writing-mode: vertical-rl;
            /* 文字竖向排列 */
            -webkit-writing-mode: vertical-rl;
            /* Safari 浏览器支持 */
            -ms-writing-mode: vertical-rl;
            /* IE 浏览器支持 */
            background-size: cover;
            /* 让背景图覆盖整个元素 */
            background-position: center;
            /* 背景图居中显示 */
            background-repeat: no-repeat;
            /* 背景图不重复 */
            position: relative;

          }

          span {
            position: absolute;
            top: 22px;
            left: 6px;
            font-size: 27px;
            font-family: SourceHanSansCN-B;
            color: #000000;
            letter-spacing: 4px;
          }

          li:nth-child(1) {
            background-image: url('../assets/images/good1.png');
            /* 第一张背景图 */
          }

          li:nth-child(2) {
            background-image: url('../assets/images/good2.png');
            /* 第二张背景图 */
          }

          li:nth-child(3) {
            background-image: url('../assets/images/good3.png');
            /* 第三张背景图 */
          }
        }
      }
    }

    .unlockedmask {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(255, 255, 255, 0.7);
      // background: linear-gradient(180deg, rgba(255, 255, 255, 0.55), #ffffff);
      backdrop-filter: blur(5px);
      z-index: 1; // 确保蒙版在内容之上
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      border-radius: 0 0 10px 10px;
      overflow: hidden;
      padding: 24px;

      .complexMask {
        display: flex;
        flex-direction: column;
        align-items: left;
        justify-content: center;
      }

      span {
        font-size: 15px;
        color: rgba(0, 0, 0, 0.80);
        font-family: SourceHanSansCN-R;
      }

      i {
        color: #dc0000;
      }

      .toLockBtn {
        width: 200px;
        height: 40px;
        background: linear-gradient(142deg, #d269ff 0%, #7d63ff);
        border-radius: 10px;
        font-size: 16px;
        font-family: SourceHanSansCN-R;
        text-align: center;
        line-height: 40px;
        color: #ffffff;
        margin-top: 22px;
      }
    }

    .fourCode {
      .fourMain {
        padding: 13px 20px;
        min-height: 232px;

        .codeList {
          border-radius: 5px;
          padding: 16px 14px;
          margin-bottom: 13px;
          box-sizing: border-box;

          .codeName {
            display: flex;
            flex-direction: row;
            align-items: center;
            // justify-content: center;
            margin-bottom: 5px;

            .code {
              width: 25px;
              height: 25px;
              font-size: 18px;
              margin-right: 4px;
              font-family: SourceHanSansCN-B;
              text-align: center;
              line-height: 25px;
              color: #fff;
            }

            .code1 {
              background-color: #1ea8ff;
            }

            .code2 {
              background-color: #21D632;
            }

            .code3 {
              background-color: #FF4337;
            }

            .code4 {
              background-color: #FCC001;
            }

            .expressed {
              font-size: 15px;
              font-family: SourceHanSansCN-B;
              color: #000;
            }
          }

          .construed {
            font-size: 14px;
            color: rgba(0, 0, 0, 0.80);
            font-family: SourceHanSansCN-R;
            line-height: 24px;
          }

        }

        .codeBgcColor1 {
          background: #e6f3ff;
        }

        .codeBgcColor2 {
          background: #E4FFED;
        }

        .codeBgcColor3 {
          background: #FFEDFB;
        }

        .codeBgcColor4 {
          background: #FFFCE1;
        }
      }
    }

    .thinkingWay {
      .thinkingWayMain {
        padding: 16px 18px;
        min-height: 398px;


        .thinkingText {
          font-size: 14px;
          color: rgba(0, 0, 0, 0.80);
          margin-top: 10px;

          i {
            font-family: SourceHanSansCN-B;
            font-style: normal
          }

          span {
            font-family: SourceHanSansCN-R;
          }
        }

        .thinkingImg {
          margin-top: 30px;

          .NTOne {
            display: flex; // 使用 flex 布局
            flex-direction: column; // 垂直排列子元素
            align-items: center; // 水平居中对齐子元素
            position: relative; // 为 span 定位做准备

            span {
              position: absolute; // 绝对定位
              top: 0; // 顶部对齐
              left: 0; // 左侧对齐
              font-size: 20px;
              font-family: SourceHanSansCN-B;
            }


            .bigNT {
              width: 178px;
              height: 242px;
            }
          }

          .NTTwo {
            display: flex;
            justify-content: space-evenly;

            .littleNT {
              width: 102px;
              height: 121px;
            }
          }
        }
      }
    }

    .population {
      .populationMain {
        padding: 3px 12px 10px;
        // min-height: 240px;

        .rankText {
          font-size: 14px;
          font-family: SourceHanSansCN-R;
          text-align: center;
          line-height: 21px;
          margin-top: 5px;

          i {
            font-size: 16px;
            color: #0F5CFF;
            font-family: SourceHanSansCN-B;
            font-style: normal
          }
        }

        .populationBox {
          display: flex;
          flex-direction: row;
          justify-content: space-evenly;
          align-items: center;
          width: 100%;
          height: 115px;
          margin-top: 10px;
          background: #e6f3ff;
          border-radius: 5px;

          .populationItem {
            display: flex;
            flex-direction: column;
            align-items: center;

            .percentage-value {
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
              font-size: 15px;
              font-family: SourceHanSansCN-B;
              color: #4c4c4c;
            }

            .rankname {
              color: #3f3f3f;
              font-size: 13px;
              font-family: SourceHanSansCN-M;
            }
          }
        }
      }
    }

    .famous {
      .famousMain {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-evenly;
        gap: 10px;
        padding: 12px;
        min-height: 270px;

        /* 可按需调整间距 */
        img {
          width: calc(50% - 10px);
          /* 每行两张图片，减去间距 */
          box-sizing: border-box;
        }
      }
    }

    .legendary {
      .legendaryMain {
        padding: 15px 18px;
        min-height: 165px;

        .legendaryBox {
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: center;
          gap: 6px;
          margin-top: 6px;

          .legendaryImgBox {
            width: 108px;
            height: 98px;
            background: #fff4e6;
            border-radius: 5px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;

            .legendaryImg {
              width: 98px;
              height: 98px;

            }


          }

          .legendaryText {
            flex: 1;
            height: 98px;
            background: #fff4e6;
            border-radius: 5px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 0 15px;
          }



        }
      }
    }

    .feature {
      .featureMain {
        padding: 15px 18px;
        min-height: 360px;

        .featureText {
          font-size: 14px;
          font-family: SourceHanSansCN-R;
          line-height: 21px;
          margin-top: 7px;
          color: rgba(0, 0, 0, 0.80);
        }

        .featureBoxTitle {
          width: 70%;
          height: 23px;
          border-radius: 10px;
          margin-top: 12px;
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: left;
        }

        .advantage {
          background: linear-gradient(80deg, #ffc800 0%, rgba(255, 236, 194, 0.00) 91%);

          img {
            width: 21px;
            height: 21px;
          }

          span {
            color: #ff0000;
            font-size: 16px;
            font-family: SourceHanSansCN-B;
            margin-left: 5px;
          }
        }

        .advantageLongText {
          width: 100%;
          background: #fff4e6;
          border-radius: 5px;
          margin-top: 11px;
          padding: 6px 12px;

          i {
            color: #f1301c;
            font-family: SourceHanSansCN-M;
          }
        }

        .inferior {
          background: linear-gradient(80deg, #84c7ff 0%, rgba(194, 255, 253, 0.00) 91%);

          img {
            width: 21px;
            height: 21px;
          }

          span {
            color: #0F5CFF;
            font-size: 16px;
            font-family: SourceHanSansCN-B;
            margin-left: 5px;
          }
        }

        .inferiorLongText {
          width: 100%;
          background: #e6f3ff;
          border-radius: 5px;
          margin-top: 11px;
          padding: 6px 12px;

          i {
            color: #0f5cff;
            font-family: SourceHanSansCN-M;
          }
        }
      }
    }

    .edication {
      .edicationMain {
        .edicationBox {
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: center;
          padding: 22px 13px;

          .edicationImgBox {
            width: 70px;
            margin-right: 10px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;

            .edicationImg {
              width: 70px;
              height: 71px;
            }

            span {
              font-size: 10px;
              font-family: SourceHanSansCN-R;
              color: rgba(0, 0, 0, 0.80);
            }
          }

          .edicationText {
            flex: 1;
            background: #faefff;
            border-radius: 8px;
            padding: 8px 12px;
            position: relative;

            span {
              font-size: 14px;
              font-family: SourceHanSansCN-R;
              color: rgba(0, 0, 0, 0.80);
            }

            p {
              text-align: right;
            }

            .icon1 {
              position: absolute;
              top: 1px;
              left: 1px;
              width: 12px;
            }

            .icon2 {
              position: absolute;
              bottom: 1px;
              right: 1px;
              width: 12px;
            }
          }


        }
      }
    }

    .age {
      .ageMain {
        padding: 15px 18px;
        min-height: 140px;

        .ageText {
          font-size: 14px;
          font-family: SourceHanSansCN-R;
          text-align: center;
          color: rgba(0, 0, 0, 0.80);
          margin-top: 6px;
        }

        .ageImg {
          width: 100%;
        }
      }
    }

    .occupation {
      .occupationMain {
        padding: 13px 18px;
        min-height: 420px;

        .occupationLongText {
          li {
            margin-bottom: 15px;

            span {
              font-size: 14px;
              font-family: SourceHanSansCN-R;
              color: rgba(0, 0, 0, 0.80);
            }
          }
        }

        .workTitle {
          width: 70%;
          height: 23px;
          border-radius: 10px;
          margin-top: 12px;
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: left;
        }

        .goodWork {
          background: linear-gradient(80deg, #ffc800 0%, rgba(255, 236, 194, 0.00) 91%);

          img {
            width: 25px;
            height: 25px;
          }

          span {
            color: #c23426;
            font-size: 16px;
            font-family: SourceHanSansCN-B;
            margin-left: 5px;
          }
        }

        .badWork {
          background: linear-gradient(80deg, #84c7ff 0%, rgba(194, 255, 253, 0.00) 91%);

          img {
            width: 25px;
            height: 25px;
          }

          span {
            color: #0F5CFF;
            font-size: 16px;
            font-family: SourceHanSansCN-B;
            margin-left: 5px;
          }
        }

        .goodWorkLongText {
          margin-top: 13px;
          width: 100%;
          background: #fff4e6;
          border-radius: 5px;
          padding: 10px;

          li {
            position: relative;
            padding-left: 20px;
            /* 为小黑点留出空间 */
          }

          li::before {
            content: "•";
            /* 定义小黑点 */
            position: absolute;
            left: 0;
            color: #000;
            /* 小黑点颜色为红色 */
            font-size: 16px;
            /* 小黑点大小 */
          }
        }

        .badWorkLongText {
          margin-top: 13px;
          width: 100%;
          background: #E6F3FF;
          border-radius: 5px;
          padding: 10px;

          .blueText {
            color: #0f5cff;
            font-size: 14px;
            font-family: SourceHanSansCN-B;
          }

          li {
            position: relative;
            padding-left: 20px;
            /* 为小黑点留出空间 */
          }

          li::before {
            content: "•";
            /* 定义小黑点 */
            position: absolute;
            left: 0;
            color: #000;
            /* 小黑点颜色为红色 */
            font-size: 16px;
            /* 小黑点大小 */
          }
        }
      }
    }

    .adaptation {
      .adaptationMain {
        padding: 15px 18px;
        min-height: 300px;

        .leader {
          background: linear-gradient(80deg, #ffc800 0%, rgba(255, 236, 194, 0.00) 91%);

          span {
            color: #c23426;
            font-size: 16px;
            font-family: SourceHanSansCN-B;
            margin-left: 5px;
          }
        }

        .fellow {
          background: linear-gradient(80deg, #84c7ff 0%, rgba(194, 255, 253, 0.00) 91%);

          span {
            color: #0f5cff;
            font-size: 16px;
            font-family: SourceHanSansCN-B;
            margin-left: 5px;
          }
        }

        .minion {
          background: linear-gradient(80deg, #94ff99 0%, rgba(255, 255, 255, 0.00) 91%);

          span {
            color: #008f50;
            font-size: 16px;
            font-family: SourceHanSansCN-B;
            margin-left: 5px;
          }
        }

        .titleBox {
          width: 70%;
          height: 23px;
          border-radius: 10px;
          margin-top: 12px;
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: left;

          img {
            width: 25px;
            height: 25px;
          }
        }

        .longText {
          font-size: 14px;
          font-family: SourceHanSansCN-R;
          color: rgba(0, 0, 0, 0.80);
          padding: 10px 15px;
          margin-top: 10px;

          li {
            margin-bottom: 15px;

            span {
              font-size: 14px;
              font-family: SourceHanSansCN-R;
              color: rgba(0, 0, 0, 0.80);
            }
          }
        }

        .leaderLongText {
          background: #fffae6;
        }

        .fellowLongText {
          background: #e6f3ff;
        }

        .minionLongText {
          background: #e4ffed;
        }
      }
    }

    .animalLove {
      .animalLoveMain {
        padding: 15px 18px;
        min-height: 140px;

        .textBox {
          position: relative;

          span {
            font-size: 16px;
            font-family: SourceHanSansCN-B;
            font-weight: 800px;
            color: rgba(0, 0, 0, 0.80);

          }

          img {
            width: 18px;
            position: absolute;
            top: -2px;
            left: 65px;

          }

        }

        .animalLoveBox {
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: center;


          img {
            width: 76px;
            height: 101px;
            z-index: 99;
          }

          .dogBox {
            position: relative;
            display: inline-block;
            margin-right: 10px;
          }

          .dogBox::before {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: #ffedfb;
            /* 这里设置虚的背景颜色，通过调整透明度来实现虚化效果 */
            z-index: -1;
            /* 确保伪元素在图片下方 */
          }

          .animalLoveLongText {
            background: #ffedfb;
            border-radius: 7px;
            font-size: 14px;
            font-family: SourceHanSansCN-R;
            color: rgba(0, 0, 0, 0.80);
            padding: 10px 12px;
          }

        }


      }
    }

    .pureLove {
      .pureLoveMain {
        padding: 11px 13px;
        min-height: 140px;

        img {
          width: 100%;
        }
      }
    }

    .loveInstruction {
      .loveInstructionMain {
        padding: 15px 18px;

        .textBox {
          position: relative;

          span {
            font-size: 16px;
            font-family: SourceHanSansCN-B;
            font-weight: 800px;
            color: rgba(0, 0, 0, 0.80);

          }

          img {
            width: 18px;
            position: absolute;
            top: -2px;
            left: 211px;

          }

        }

        .loveInstructionList {
          .loveInstructionItem {
            display: flex;
            flex-direction: row;
            align-items: center;
            // justify-content: center;
            margin-top: 10px;
          }

          .listLeft {
            width: 137px;
            height: 82px;
            border-radius: 7px;
            margin-right: 10px;
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: center;
            padding: 8px;

            img {
              width: 65px;
              height: 65px;
              margin-right: 15px;
            }

            span {
              font-size: 17px;
              font-family: SourceHanSansCN-B;
            }
          }

          .listRight {
            flex: 1;
            height: 82px;
            border-radius: 7px;
            padding: 8px;

            .loveText {
              font-size: 14px;
              font-family: SourceHanSansCN-R;
              font-weight: Regular;
              color: #080808;
            }
          }

          .blue {
            background: #e6f3ff;
          }

          .yellow {
            background: #fffce1;
          }

          .green {
            background: #e4ffed;
          }

          .pink {
            background: #ffedfb;
          }
        }
      }
    }

    .bestCombination {
      .bestCombinationMain {
        padding-top: 15px;
        box-sizing: border-box;
        min-height: 140px;

        .imgList {
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: space-evenly;

          .imgItem {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;

            img {
              width: 108px;
            }
          }
        }

        .splitLine {
          width: 100%;
          height: 1px;
          opacity: 0.2;
          border: 1px dashed #ff0000;
        }

        .textList {
          width: 100%;
          padding: 16px;
          // margin-top: 20px;

          .textItem {
            display: flex;
            flex-direction: row;
            align-items: center;
            padding: 10px 0;

            .ItemLeft {
              width: 71px;
              display: flex;
              flex-direction: column;
              align-items: center;


              .loveBox {
                width: 71px;
                height: 65px;
                position: relative;
                display: flex; // 使用 flexbox 布局
                justify-content: center; // 水平居中
                align-items: center; // 垂直居中
              }

              img {
                width: 100%;
                height: auto;
              }

              span {
                font-size: 14px;
                font-family: SourceHanSansCN-R;
                color: #656565;
                margin-top: 10px;
              }

              .score {
                position: absolute;
                color: white;
                font-size: 16px;
                margin-top: -5px;
              }

            }

            .ItemRight {
              flex: 1;
              margin-left: 20px;

              .loveTitleBox {
                height: 24px;
                position: relative;

                img {
                  width: 18px;
                  position: absolute;
                  top: -2px;
                  left: 200px;

                }
              }

              .loveTitle1 {
                color: #ff4337;
                background: #ffdddd;
              }

              .loveTitle2 {
                color: #ff7700;
                background: #fff5cf;
              }

              .loveTitle3 {
                color: #0f5cff;
                background: #e6f3ff;
              }

              .baseBgc {
                width: 200px;
                font-size: 14px;
                font-family: SourceHanSansCN-M;
                text-align: center;
                line-height: 24px;
                border-radius: 14px;
                // padding: 5px 13px;
              }

              .loveDesc {
                margin-top: 5px;
                font-size: 14px;
                font-family: SourceHanSansCN-R;
                color: rgba(0, 0, 0, 0.80);
              }
            }
          }
        }
      }
    }

    .spicy {
      .spicyMain {
        padding: 15px 18px;
        min-height: 140px;

        .spicyText {
          font-size: 14px;
          font-family: SourceHanSansCN-R;
          padding: 10px 0;

        }

        .specialtyImg {
          width: 100%;
        }

        .notice {
          font-size: 11px;
          font-family: SourceHanSansCN-R;
          text-align: left;
          color: rgba(121, 121, 121, 0.90);
          line-height: 15px;
          letter-spacing: 0px;
        }
      }
    }

    .personalityMeme {
      .personalityMemeMain {
        padding: 15px 18px;

        .goodAndBed {
          width: 100%;
          margin: 10px 0;
        }

        .lastImg {
          width: 100%;
          margin-top: 5px;
        }


      }
    }

    .lastText {
      font-size: 18px;
      font-family: SourceHanSansCN-R;
      color: #000000;
      padding: 24px;
      text-align: center;

      .blackText {
        font-size: 22px;
      }

      .blueText {
        font-size: 22px;
        color: #0f5cff;
      }
    }

    .shareBtn {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-evenly;
      height: 75px;
      margin-bottom: 20px;

      .share {
        width: 150px;
        height: 36px;
        background: linear-gradient(122deg, #ff7900 29%, #ffcb71 100%);
        border-radius: 10px;
        font-size: 19px;
        font-family: SourceHanSansCN-M;
        font-weight: Medium;
        text-align: center;
        line-height: 36px;
        color: #ffffff;
      }

      .poster {
        width: 150px;
        height: 36px;
        background: linear-gradient(148deg, #286dff 5%, #2a6fff 5%, #7437ff 93%);
        border-radius: 10px;
        font-size: 19px;
        font-family: SourceHanSansCN-M;
        font-weight: Medium;
        text-align: center;
        line-height: 36px;
        color: #ffffff;
      }
    }

    .basicBox {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-evenly;
      height: 75px;
      margin-bottom: 20px;

      .basicBtn {
        padding: 5px 15px;
        background: linear-gradient(148deg, #52b2ff 0%, #286dff 19%, #7437ff 93%);
        border-radius: 10px;
        font-size: 15px;
        font-family: SourceHanSansCN-M;
        font-weight: Medium;
        text-align: center;
        color: #ffffff;
      }

      .share {
        padding: 5px 15px;
        background: linear-gradient(122deg, #ff7900 29%, #ffcb71 100%);
        border-radius: 10px;
        font-size: 15px;
        font-family: SourceHanSansCN-M;
        font-weight: Medium;
        text-align: center;
        color: #ffffff;
      }

      .poster {
        padding: 5px 15px;
        background: linear-gradient(148deg, #286dff 5%, #2a6fff 5%, #7437ff 93%);
        border-radius: 10px;
        font-size: 15px;
        font-family: SourceHanSansCN-M;
        font-weight: Medium;
        text-align: center;
        color: #ffffff;
      }
    }

    .lockReportBox {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      margin-bottom: 20px;

      .lockReportBrn {
        width: 300px;
        height: 65px;
        margin-top: 25px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background: linear-gradient(162deg, #1e75ff 11%, #4cafff 39%, #a882ff 100%);
        border-radius: 10px;
        font-size: 16px;
        font-weight: Bold;
        color: #ffffff;

        i {
          font-size: 11px;
          font-family: SourceHanSansCN-R;
          font-weight: Regular;
          color: #ffffff;
        }

        span {
          font-size: 16px;
          font-family: SourceHanSansCN-B;
          font-weight: Regular;
          color: #ffffff;
        }
      }
    }

  }
}

/* 滚动后填充的颜色 */
.report::after {
  content: "";
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #E6F3FF;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s ease;
}

.report.scrolled::after {
  opacity: 1;
}


/* 新增弹窗样式 */
.unlockPopup {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 999;

  .popupMask {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
  }

  .popupContent {
    position: relative;
    background-color: white;
    width: 100%;
    height: 510px;
    /* 占据页面下一半 */
    border-top-left-radius: 15px;
    /* 上边沿圆角 */
    border-top-right-radius: 15px;
    /* 上边沿圆角 */
    padding: 20px;
    text-align: center;
    z-index: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    // align-items: flex-end;
  }

  .closeIcon {
    width: 14px;
    height: 14px;
    position: absolute;
    top: 10px;
    right: 10px;
    cursor: pointer;
    font-size: 18px;
  }

  .redTips {
    font-size: 16px;
    font-weight: Bold;
    color: #F1301c;
    line-height: 16px;
  }


  h3 {
    margin-bottom: 10px;
    font-size: 16px;
    font-weight: Bold;
    color: #282828;
  }

  p {
    margin-bottom: 20px;
  }

  button {
    margin: 0 10px;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }

  .optionsBox {
    display: flex;
    justify-content: center;
    /* 水平居中 */
    align-items: center;
    /* 垂直居中 */
    gap: 20px;
    /* 设置图片之间的间隔 */
    // margin-top: 20px;

    .optionsImg {
      width: 150px;
      height: 295px;
      // 新增选中状态样式
    }
  }

  .lockReport {
    width: 300px;
    height: 65px;
    margin-top: 25px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: linear-gradient(148deg, #52b2ff 0%, #286dff 19%, #7437ff 93%);
    border-radius: 10px;

    i {
      font-size: 11px;
      font-weight: Regular;
      color: #ffffff;
    }

    span {
      font-size: 16px;
      font-weight: Bold;
      color: #ffffff;
    }
  }
}

//支付弹窗
.paymentPopup {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.60);
  z-index: 100;

  // .popup-mask {
  //   position: absolute;
  //   top: 0;
  //   left: 0;
  //   width: 100%;
  //   height: 100%;

  // }

  .content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    z-index: 101;
  }

  .popup-content {
    position: relative;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 262px;
    padding: 20px;
    border-radius: 10px;


    .paymentText {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      p {
        font-size: 14px;
        font-family: SourceHanSansCN-R;
        font-weight: 300;
        color: #010101;
      }

      span {
        font-size: 26px;
        font-family: SourceHanSansCN-B;
        font-weight: 800;
        color: #010101;
      }

    }
  }

  .popupClose {
    margin-top: 40px;

    img {
      width: 36px;
      height: 36px;
    }
  }

  .close-icon {
    position: absolute;
    top: 10px;
    right: 10px;
    cursor: pointer;
  }

  .payment-options {
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin-top: 20px;

    .paymentBtn {
      width: 179px;
      height: 54px;
      border: 1px solid #979797;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative; // 为伪元素定位做准备
      cursor: pointer;

      img {
        width: 130px;
      }
    }

    .paymentBtn.selected {
      border-color: #0F5CFF; // 选中状态边框颜色
    }

    .paymentBtn.selected::after {
      content: '';
      position: absolute;
      top: 0;
      right: 0;
      border-top: 10px solid #0F5CFF;
      border-left: 10px solid transparent;
    }

    .paymentBtnWe {
      width: 179px;
      height: 54px;
      border: 1px solid #979797;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative; // 为伪元素定位做准备
      cursor: pointer;

      img {
        width: 130px;
      }
    }

    .paymentBtnWe.selected {
      border-color: #00C801; // 选中状态边框颜色
    }

    .paymentBtnWe.selected::after {
      content: '';
      position: absolute;
      top: 0;
      right: 0;
      border-top: 10px solid #00C801;
      border-left: 10px solid transparent;
    }
  }

  .confirm-payment {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 190px;
    height: 40px;
    margin-top: 25px;
    padding: 10px;
    background-color: #0F5CFF;
    color: #fff;
    font-size: 16px;
    font-family: SourceHanSansCN-M;
    font-weight: 800;
    text-align: center;
    border-radius: 20px;
    cursor: pointer;
  }
}

//优惠弹窗
.discountPopup {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.60);
  z-index: 100;

  .content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    z-index: 101;
  }

  .popup-content {
    position: relative;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 262px;
    padding: 20px;
    border-radius: 10px;
  }

  .discountPopup-content {
    flex-direction: column;
    align-items: center;
    justify-content: center;

    img {
      width: 249px;
    }
  }

  .popupClose {
    margin-top: 40px;

    img {
      width: 36px;
      height: 36px;
    }
  }

  .close-icon {
    position: absolute;
    top: 10px;
    right: 10px;
    cursor: pointer;
  }
}

.PosterPopup {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.60);
  z-index: 100;

  .content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    z-index: 101;
    width: 272px;
    height: 480px;
  }

  .PosterPopup-content {
    width: 270px;
    height: 400px;
    background: #fff;
    // flex-direction: column;
    // align-items: center;
    // justify-content: center;

    img {
      width: 270px;
      height: 400px;
    }
  }

  .PosterpopupClose {
    width: 100%;
    margin-top: 25px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    .closeBtn {
      color: #fff;
      font-size: 16px;
      font-family: SourceHanSansCN-M;
      font-weight: 500;
      text-align: center;
      border-radius: 20px;
      border: 2px solid #fff;
      cursor: pointer;
      padding: 5px 20px;
    }

    .downLoadBtn {
      color: #fff;
      font-size: 16px;
      font-family: SourceHanSansCN-M;
      font-weight: 500;
      text-align: center;
      border-radius: 20px;
      background: linear-gradient(148deg, #286dff 5%, #2a6fff 5%, #7437ff 93%);
      cursor: pointer;
      padding: 5px 20px;
    }

  }
}

//二维码弹窗
.qrCodePopup {
  .discountPopup-content {
    position: relative;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 262px;
    padding: 20px;
    border-radius: 10px;
  }

  .qrCodeText {
    margin-bottom: 20px;
  }

  .footBtn {
    // width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    // color: #ff0000;
    margin-top: 20px;
    color: #fff;
    font-size: 14px;
    font-family: SourceHanSansCN-M;
    font-weight: 500;
    text-align: center;
    border-radius: 20px;
    background: linear-gradient(to right, #ff6034, #ee0a24);
    cursor: pointer;
    padding: 3px 20px;
  }
}
</style>