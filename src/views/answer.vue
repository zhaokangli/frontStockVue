<!--
 * @Description: 首页
 * @Author: laoyuan
-->
<template>
  <!-- 题目列表 -->
  <div class="answerBgc">
    <div class="answerBox" v-loading="loading">
      <img class="homeBox" @click="goHome" src="../assets/images/home.png" alt="">
      <div class="answerTitle">
        <span class="titleOne">MBTI 测试（16人格） </span>
        <span class="titleText">全球认可 • 权威测试 • 每年近300万人参与</span>
        <!-- <img class="girlImg" src="../assets/images/girl.png" alt=""> -->
      </div>
      <div class="answerContent">
        <div class="item">
          <div class="title" v-if="currentQuestion">{{ currentIndex + 1 }}.&nbsp;{{ currentQuestion.titleName }}</div>
          <ul class="options" v-if="currentQuestion">
            <li :class="['anser', selectIndex === index ? 'active' : '']" v-for="(v, index) in currentQuestion.options"
              :key="v.optionId" @click="onSelect(index, v.optionId)">
              {{ v.optionName }}
              <img v-if="selectIndex === index" class="check-icon" src="../assets/images/hook.png" alt="选中">
            </li>
          </ul>
        </div>
        <!-- <div class="submit-btn" @click="rest">休息</div> -->
        <!-- <div class="submit-btn" @click="submitAnswerApi">提交</div> -->
        <!-- v-if="currentIndex !== 0" -->
        <div class="operBox" v-if="currentIndex !== 0">
          <!-- 上一题按钮 -->
          <div class="prev-btn" @click="prevQuestion">
            <i class="arrow-left"></i> 上一题
          </div>
        </div>
        <span class="tips">发现真我，开启探索之旅~</span>
      </div>
      <div class="footer">
        <span class="footerTitle">本测试报告，涵盖以下解析：</span>
        <div class="listBox">
          <!-- 使用 v-for 循环渲染解析列表 -->
          <span class="list" v-for="(item, index) in analysisList" :key="index">
            <!-- 图片五角星图标 -->
            <img class="icon" src="../assets/images/start.png" alt="*">
            {{ item }}
          </span>
        </div>
        <span class="footerText">
          通过测量人们不同维度的心理偏好，MBTI将人的性格划分为不同类型，它指引人们如何感知世界、处理信息并做出决策，帮助更好地理解自己和他人；
          在不同的人生阶段和环境，结果会略有差异，建议进行多次测试哦~
        </span>
      </div>
      <!-- 休息弹窗 -->
      <div class="unlockPopup" v-if="isPopupVisible">
        <div class="popupContent">
          <div>
            <!-- 40,75 88(93)    100,150,200(200) -->
            <div class="popupText" v-if="showPopupTextIndex === 0">
              <p>你真的超棒~</p>
              <span>性格画像构建就只差一点点了！</span>
            </div>
            <div class="popupText" v-if="showPopupTextIndex === 1">
              <p>你答得超快哦~</p>
              <span>性格画像已构建一多半儿了呢！</span>
            </div>
            <div class="popupText" v-if="showPopupTextIndex === 2">
              <p>哇哦哇哦~</p>
              <span>最后几道题，马上完成专属画像！</span>
            </div>
          </div>
          <img src="../assets/images/rest.png" alt="">
        </div>
        <div class="closeIcon" @click="closePopup">
          <img src="../assets/images/close-icon.png" alt="">
        </div>
      </div>
    </div>
  </div>
</template>


<script setup>
import { ref, computed, onMounted } from "vue";
import { useRoute } from "vue-router";
// import questionList from "../data/question28";
import { getTitles, submitAnswer } from '../api/mbtiApi.js'


const route = useRoute(); // 获取当前路由信息
const questionList = ref([]);
// 当前题目索引
const currentIndex = ref(0);
// 定义一个 ref 来存储当前题目
const currentQuestionRef = ref(null);

const loading = ref(false)
// 休息弹窗
const isPopupVisible = ref(false);


const goHome = () => {
  router.push({ path: '/' });
}

//获取题目列表
const getQuestionList = () => {
  loading.value = true
  const data = { pageId: parseInt(route.query.questionCount) }
  getTitles(data).then(res => {
    if (res.code === 200) {
      console.log(res.data)
      questionList.value = res.data
      console.log('当前题目：', currentQuestion.value);
      loading.value = false
    }
  }).catch(err => {
    console.log(err)
  }).finally(() => {
    loading.value = false
  })
};

// 在组件挂载时调用 getQuestionList 函数
onMounted(() => {
  console.log('111');
  // 尝试从 localStorage 中恢复数据
  const savedCurrentIndex = localStorage.getItem('currentIndex');
  const savedSelectAnswerList = localStorage.getItem('selectAnswerList');
  if (savedCurrentIndex !== null) {
    currentIndex.value = parseInt(savedCurrentIndex);
  }
  if (savedSelectAnswerList !== null) {
    selectAnswerList.value = JSON.parse(savedSelectAnswerList);
  }
  getQuestionList();
});


// 当前题目
const currentQuestion = computed(() => {
  console.log("当前题目xxxx：", questionList.value);
  return questionList.value[currentIndex.value];
});

// 定义解析列表
const analysisList = [
  "人格类型",
  "核心优势",
  "性格劣势",
  "气质分类",
  "职场表现",
  "扬长避短",
  "职业建议",
  "恋爱匹配",
  "恋爱指南"
];
import { useRouter } from "vue-router";

const router = useRouter();


// // 跳转介绍页面
// const onLink = () => {
//   router.push({ path: '/' });
// };



// 当前选中的答案索引
const selectIndex = ref(-1);

// 选中的答案列表
const selectAnswerList = ref([]);
// 选择函数
let timer = null;
let timeCount = 0;
// 最后一个题目选择的答案
let lastSelectValue;
// 需要显示弹窗的题目索引
const popupQuestionIndices = [40, 75, 88, 100, 150, 200];  //40,75 88(93)    100,150,200(200) 
// 记录当前显示的 popupText 索引
const showPopupTextIndex = ref(0);


const onSelect = (index, optionId) => {
  console.log("currentIndex当前是第几题", currentIndex.value)
  console.log("index, optionId", index, optionId)
  selectIndex.value = index;
  clearInterval(timer);
  timer = setInterval(() => {
    timeCount++;
  }, 1000);
  console.log('题目数量', questionList.value.length);

  if (currentIndex.value === questionList.value.length - 1) {
    // 保存最后一题的答案
    console.log("最后一题的答案");
    selectAnswerList.value[currentIndex.value] = {
      optionId: optionId,
      titleId: currentQuestion.value.titleId
    };
    // 保存当前题目索引和所选答案列表到 localStorage
    localStorage.setItem('currentIndex', currentIndex.value);
    localStorage.setItem('selectAnswerList', JSON.stringify(selectAnswerList.value));
    submitAnswerApi();

  } else {
    setTimeout(() => {
      // 如果该位置已有答案，直接更新
      if (selectAnswerList.value[currentIndex.value] !== undefined) {
        selectAnswerList.value[currentIndex.value] = {
          optionId: optionId,
          titleId: currentQuestion.value.titleId
        };
      } else {
        // 否则插入新答案
        selectAnswerList.value.splice(currentIndex.value, 0, {
          optionId: optionId,
          titleId: currentQuestion.value.titleId
        });
      }
      selectIndex.value = -1;
      currentIndex.value++;
      // 进入下一题时，如果selectAnswerList中对应的有答案就要回显原本选中的状态 
      // 在进入下一题时（currentIndex.value++ 之后），判断 selectAnswerList 中是否有当前题目的答案。
      if (selectAnswerList.value[currentIndex.value] !== undefined) {
        const optionIndex = currentQuestion.value.options.findIndex(
          option => option.optionId === selectAnswerList.value[currentIndex.value].optionId
        );
        selectIndex.value = optionIndex;
      }
      // 判断是否需要显示弹窗  //40,75 88(93)    100,150,200(200) 
      if ((questionList.value.length === 93 && popupQuestionIndices.includes(currentIndex.value))
        || (questionList.value.length === 200 && popupQuestionIndices.includes(currentIndex.value))
      ) {
        isPopupVisible.value = true;
        // 显示对应的 popupText
        showPopupTextIndex.value = popupQuestionIndices.indexOf(currentIndex.value);
        setTimeout(() => {
          isPopupVisible.value = false;
        }, 3000);
      }
      console.log("selectAnswerList", selectAnswerList.value);
      // 保存当前题目索引和所选答案列表到 localStorage
      localStorage.setItem('currentIndex', currentIndex.value);
      localStorage.setItem('selectAnswerList', JSON.stringify(selectAnswerList.value));

    }, 500);
  }
};

// 上一题函数
// 上一题函数
const prevQuestion = () => {
  if (currentIndex.value > 0) {
    currentIndex.value--;
    // 恢复上一题的选中状态
    if (selectAnswerList.value[currentIndex.value] !== undefined) {
      const optionIndex = currentQuestion.value.options.findIndex(
        // 这里将 option.value 改为 option.optionId
        option => option.optionId === selectAnswerList.value[currentIndex.value].optionId
      );
      selectIndex.value = optionIndex;
    } else {
      selectIndex.value = -1;
    }
    // 保存当前题目索引和所选答案列表到 localStorage
    localStorage.setItem('currentIndex', currentIndex.value);
    localStorage.setItem('selectAnswerList', JSON.stringify(selectAnswerList.value));

  }
};
const submitAnswerApi = () => {
  const parmas = {

    // "answers": [
    //   {
    //     "titleId": 1,
    //     "optionId": 1
    //   },
    //   {
    //     "titleId": 2,
    //     "optionId": 3
    //   },
    //   {
    //     "titleId": 3,
    //     "optionId": 6
    //   },
    //   {
    //     "titleId": 4,
    //     "optionId": 7
    //   },
    //   {
    //     "titleId": 5,
    //     "optionId": 9
    //   },
    //   {
    //     "titleId": 6,
    //     "optionId": 11
    //   },
    //   {
    //     "titleId": 7,
    //     "optionId": 13
    //   },
    //   {
    //     "titleId": 8,
    //     "optionId": 16
    //   },
    //   {
    //     "titleId": 9,
    //     "optionId": 18
    //   },
    //   {
    //     "titleId": 10,
    //     "optionId": 19
    //   },
    //   {
    //     "titleId": 11,
    //     "optionId": 21
    //   },
    //   {
    //     "titleId": 12,
    //     "optionId": 23
    //   },
    //   {
    //     "titleId": 13,
    //     "optionId": 25
    //   }
    // ],
    answers: selectAnswerList.value,
    pageId: parseInt(route.query.questionCount)
  }
  submitAnswer(parmas).then(res => {
    if (res.code === 200) {
      console.log(res.data)
      localStorage.setItem('resultId', JSON.stringify(res.data.resultId));
      sessionStorage.setItem('resultId', JSON.stringify(res.data.resultId));
      // localStorage.setItem('resultId', JSON.stringify(92));
      // sessionStorage.setItem('resultId', JSON.stringify(92));
      // 清空 localStorage 中的缓存数据
      localStorage.removeItem('currentIndex');
      localStorage.removeItem('selectAnswerList');
      router.push({
        path: '/report',
        query: {
          // mbtiType: res.data.mbtiType,
          resultId: res.data.resultId,
        }
      });
    }
  }).catch(err => {
    console.log(err)
  })
}

const closePopup = () => {
  isPopupVisible.value = false;
};


</script>
<style scoped lang="less">
.answerBgc {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow-y: auto;

  // 移动端样式
  @media (max-width: 767px) {
    background: url('../assets/images/answerbgc.png') 0 0 / cover;
    background-attachment: scroll;
  }

  // PC端样式
  @media (min-width: 768px) {
    background: url('../assets/images/answerbgc.png') center center / cover;
    background-attachment: fixed;
  }
}

.answerBox {
  max-width: 767px;
  height: 100vh;
  // background: linear-gradient(4deg, #ffffff 24%, #036aff 97%);
  padding: 24px 30px 60px 30px;
  display: flex;
  flex-direction: column;
  // align-items: center;
  // justify-content: center;
  margin: 0;

  .homeBox {
    width: 25px;
    height: 25px;
  }




  .answerTitle {
    display: flex;
    /* 使用 flex 布局让内容居中 */
    flex-direction: column;
    /* 垂直排列子元素 */
    align-items: center;
    justify-content: center;

    .titleOne {
      font-size: 24px;
      font-family: Source Han Sans SC, Source Han Sans SC-Heavy;
      font-weight: Heavy;
      text-align: center;
      color: #ffffff;
      line-height: 35.5px;
      letter-spacing: 0.02px;
    }

    .titleText {
      font-size: 14px;
      font-family: Source Han Sans CN, Source Han Sans CN-Regular;
      font-weight: Regular;
      text-align: center;
      color: #ffffff;
      margin-top: 5px;
    }
  }

  .answerContent {
    width: 100%;
    background: #ffffff;
    border-radius: 10px;
    margin-top: 52px;
    padding: 24px;
    display: flex;
    /* 使用 flex 布局让内容居中 */
    flex-direction: column;
    /* 垂直排列子元素 */
    align-items: center;
    justify-content: center;

    .item {
      width: 100%;

      .title {
        font-size: 15px;
        font-family: Source Han Sans CN, Source Han Sans CN-Medium;
        font-weight: bold;
        text-align: left;
        color: rgba(0, 0, 0, 0.90);
        line-height: 25px;
        letter-spacing: 0.01px;
      }

    }

    .options {
      margin-top: 25px;

      .anser {
        width: 100%;
        padding: 15px 30px 15px 15px;
        background: #ececec;
        border-radius: 10px;
        font-size: 15px;
        text-align: left;
        color: rgba(0, 0, 0, 0.90);
        margin-bottom: 15px;
        position: relative; // 添加相对定位，以便对钩图片可以绝对定位

        .check-icon {
          width: 26px;
          height: 22px;
          position: absolute; // 绝对定位
          right: 10px; // 距离右侧的距离
          top: 50%; // 垂直居中
          transform: translateY(-50%); // 微调垂直位置
        }
      }

      .active {
        width: 100%;
        padding: 15px 30px 15px 15px;
        background: linear-gradient(142deg, #d269ff 0%, #7d63ff);
        border-radius: 10px;
        font-size: 15px;
        text-align: left;
        color: #ffffff;
        margin-bottom: 15px;
      }
    }

    .operBox {
      display: flex;
      justify-content: space-between;
      width: 100%;

      .prev-btn,
      .next-btn {
        background: none;
        border: none;
        color: #0f5cff;
        font-size: 13px;
        cursor: pointer;
      }

      .arrow-left::before {
        content: '<';
        margin-right: 5px;
      }

      .arrow-right::after {
        content: '>';
        margin-left: 5px;
      }
    }


    .tips {
      font-size: 12px;
      text-align: left;
      color: rgba(121, 121, 121, 0.90);
      line-height: 12px;
      text-align: center;
      margin-top: 18px;
    }
  }

  .footer {
    width: 100%;
    margin-top: 110px;
    display: flex;
    /* 使用 flex 布局让内容居中 */
    flex-direction: column;
    /* 垂直排列子元素 */
    align-items: left;
    justify-content: center;

    .footerTitle {
      font-size: 14px;
      text-align: left;
      color: rgba(0, 0, 0, 0.60);
      line-height: 14px;
    }

    .listBox {
      display: flex;
      flex-wrap: wrap;
      margin-top: 15px;

      .list {
        width: calc(100% / 3);
        margin-bottom: 5px;
        text-align: left;
        font-size: 13px;
        color: rgba(70, 72, 80, 0.80);
        display: flex; // 添加 flex 布局
        align-items: center; // 垂直居中
        gap: 5px; // 设置图片和文字之间的间距


        .icon {
          width: 13px;
          height: 13px;
        }
      }
    }

    .footerText {
      font-size: 11px;
      text-align: left;
      color: rgba(121, 121, 121, 0.90);
      line-height: 20px;
      margin-top: 50px;
    }
  }

  /* 新增弹窗样式 */
  .unlockPopup {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    z-index: 9;
    background-color: rgba(0, 0, 0, 0.5);

    .popupContent {
      position: relative;
      z-index: 10;

      img {
        width: 262px;
        height: 300px;
      }

      .popupText {
        position: absolute;
        top: 10px;
        left: 0px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 100%;
        margin-top: 15px;

        p {
          font-size: 20px;
          font-family: SourceHanSansCN-M;
          color: #010101;
        }

        span {
          font-size: 16px;
          font-family: SourceHanSansCN-R;
          color: #010101;
        }
      }


    }

    .closeIcon {
      img {
        width: 36px;
        height: 36px;
        margin-top: 30px;
      }
    }
  }
}
</style>