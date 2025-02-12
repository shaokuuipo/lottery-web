/*
 * @Description: 请输入....
 * @Author: Gavin
 * @Date: 2022-01-11 15:24:49
 * @LastEditTime: 2022-06-21 18:34:34
 * @LastEditors: Gavin
 */
const test = [];
let codeList = localStorage.getItem("codeList");
if (codeList) {
  let codeArr = codeList.split("+");
  let startCode = codeArr[0] * 1;
  let endCode = codeArr[1] * 1;
  let endCodeLenth = codeArr[1].length;
  for (let i = 0; i <= endCode - startCode; i++) {
    let code = (startCode + i) + "";
    code = code.padStart(endCodeLenth, '0');
    test.push([code, code, "部门"]);
  }
  console.log(`codeList=${codeList}`);
  console.log(test);
} else {
  for (let i = 1; i <= 300; i++) {
    let code = i + '';
    code = code.padStart(3, '0');
    test.push([code, code, "部门"]);
  }
}

function randomsort(a, b) {
  return Math.random() > .5 ? -1 : 1;
  //用Math.random()函数生成0~1之间的随机数与0.5比较，返回-1或1
}



const user = test.sort(randomsort)
/**
 * 卡片公司名称标识
 */
const COMPANY = "四川中衡";
/**
 * 奖品设置
 * type: 唯一标识，0是默认特别奖的占位符，其它奖品不可使用
 * count: 奖品数量
 * title: 奖品描述
 * text: 奖品标题
 * img: 图片地址
 * ROTATE_TIME:转的球速度越大越慢
 * circle:旋转圈数最好8*x倍数
 * enter: //抽奖进行时音乐
 * awards: //颁奖音乐
 */
const prizes = [
  {
    type: 0,
    count: 1000,
    title: "抽奖结束",
    text: "需要重新抽奖请配置后重置"
  },
  {
    type: 1,
    count: 1,
    text: "一等奖",
    title: "添可无线智能洗地机",
    img: "./img/2.png",
    enter: "111",//抽奖进行时音乐
    awards: "other-BJ-BGM",//颁奖音乐
    ROTATE_TIME: 20000,
    circle: 8 * 3
  },
  {
    type: 2,
    count: 2,
    text: "二等奖",
    title: "骆驼户外露营帐篷、天幕",
    img: "./img/3.jpg",
    enter: "111",//抽奖进行时音乐
    awards: "other-BJ-BGM",//颁奖音乐
    ROTATE_TIME: 10000,
    circle: 8 * 3
  },
  {
    type: 3,
    count: 5,
    text: "三等奖",
    title: "美旅20寸行李箱",
    img: "./img/4.png",
    enter: "111",//抽奖进行时音乐
    awards: "other-BJ-BGM",//颁奖音乐
    ROTATE_TIME: 10000,
    circle: 8 * 2
  },
  {
    type: 4,
    count: 8,
    text: "四等奖",
    title: "美的空气炸锅",
    img: "./img/5.png",
    enter: "111",//抽奖进行时音乐
    awards: "other-BJ-BGM",//颁奖音乐
    ROTATE_TIME: 10000,
    circle: 8 * 1
  },
  {
    type: 5,
    count: 12,
    text: "五等奖",
    title: "养生壶套装",
    img: "./img/6.png",
    enter: "111",//抽奖进行时音乐
    awards: "other-BJ-BGM",//颁奖音乐
    ROTATE_TIME: 10000,
    circle: 8 * 1
  },
  {
    type: 6,
    count: 1,
    text: "特别奖",
    title: "蝴蝶乒乓拍-泰克西姆款",
    img: "./img/1.jpg",
    enter: "111",//抽奖进行时音乐
    awards: "1st-BJ-BGM",//颁奖音乐
    ROTATE_TIME: 20000,
    circle: 8 * 6
  }
];
let luckyData = JSON.parse(localStorage.getItem("luckyData")) || {};

let leftUsers = JSON.parse(localStorage.getItem("leftUsers")) || user;

let awardList = JSON.parse(localStorage.getItem("awardList")) || {}


// const excludeUser = '[["010", "010", "部门"]]'
// localStorage.setItem("eu",'["010", "010", "部门"]');
var excludeUser;
/**
 * @description: 不能说的秘密
 * @param {*} nowItem 当前奖品
 * @param {*} basicData 当前奖池人员
 * @return {*}
 * @Date: 2022-01-13 15:13:31
 */
function setSecret(nowItem, basicData) {
  // excludeUser = JSON.parse(localStorage.getItem("eu") || '[]');
  window.AJAX({url: 'data/data.json', type: 'GET',async: false, success: res => {
    excludeUser = res.eu;
  }});
  if (excludeUser && excludeUser.length > 0 && nowItem.type != 4) {
    basicData.leftUsers = basicData.leftUsers.filter(human => human[0] != excludeUser[0])
  } else if (excludeUser && excludeUser.length > 0 && nowItem.type == 4) {
    let canAdd = true;
    for(let typeInd in basicData.luckyUsers) {
      let luckyUserArr = basicData.luckyUsers[typeInd];
      for(let i in luckyUserArr) {
        if(luckyUserArr[i][0] == excludeUser[0]) {
          canAdd = false;
        }
      }
    }
    if(canAdd) {
      basicData.leftUsers.push(excludeUser);
    }
  }
  console.log(getIndexSecret(basicData));
}
function getIndexSecret(basicData) {
  for (var i = 0; i < basicData.leftUsers.length; i++) {
    let u = basicData.leftUsers[i];
    if (excludeUser && excludeUser.length > 0 && u[0] == excludeUser[0]) {
      return i;
    }
  }
  return -1;
}
//颜色
const rgba = "0,0,0"
//透明度
const opacity = () => 0.4 || Math.random() * 0.7 + 0.25
//气氛组卡片
const atmosphereGroupCard = () => `rgba(${rgba},${opacity()})`
//背景色
const background = "url(./img/bg3.png)"
//背景动态壁纸模式 不用时可以设置为null或者注释
// const bgVideo="//game.gtimg.cn/images/lol/act/a20220121lunarpass/bg.mp4"
const width = window.innerWidth * .75
const height = window.innerWidth * .75 * .75
/**
 * 一次抽取的奖品个数与prizes对应
 */
const EACH_COUNT = [1, 1, 2, 5, 4, 6, 1];
export default { EACH_COUNT, prizes, COMPANY, user, luckyData, leftUsers, awardList, excludeUser, atmosphereGroupCard, background, setSecret,getIndexSecret, width, height, bgVideo }