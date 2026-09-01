// cn.ts
import type { Translation } from './Language-Types';
import {WEDDING_DATE, RSVP_CUTOFF_DATE} from './LangaugeAndTimeConstants'
import { format } from 'date-fns';
import { zhCN } from 'date-fns/locale';

export const zh: Translation = {
  NAV_LINKS: [
    { label: "细节", id: "details"},
    { label: "日程", id: "schedule" },
    { label: "交通", id: "travel" },
    { label: "礼金", id: "registry" },
    { label: "常见问题", id: "faq" },
  ],
  SCHEDULE: [
    { time: "下午 2:00", event: "宾客入场 · 欢迎饮品", detail: "请与我们一同在露台享用香槟与小食，共度欢聚时刻。" },
    { time: "下午 3:00", event: "婚礼仪式", detail: "仪式将准时开始——请于下午 2:50 就座。" },
    { time: "下午 3:30", event: "鸡尾酒时光", detail: "在我们拍摄留影之际，请享用鸡尾酒、小食与草坪游戏。" },
    { time: "下午 5:30", event: "晚宴大厅开放", detail: "晚宴厅正式开放，迎接夜晚的庆典。" },
    { time: "下午 6:00", event: "晚宴 · 致辞", detail: "三道式晚宴，亲友致辞，满溢真情。" },
    { time: "下午 7:30", event: "首支舞 · 切蛋糕", detail: "新人共舞，甜蜜切蛋糕，见证美好瞬间。" },
    { time: "下午 8:00", event: "舞池开放 · 庆典继续", detail: "舞池正式开放，与我们共舞欢庆！" },
    { time: "晚上 11:00", event: "送宾 · 大巴出发", detail: "包车将从庄园出发返回墨尔本市区，带着满满祝福，一路平安。" },
  ],
  FAQS: [
    { question: "婚礼的着装要求是什么？", answer: "正式礼服。欢迎宾客融入浪漫主题——淡蓝色、粉色、薰衣草色或经典正装均受欢迎。请避免穿着白色或象牙色，以示对新娘的尊重。" },
    { question: "可以携带小孩出席吗？", answer: "我们非常喜欢小朋友！但由于场地容量限制，仅能接待邀请函上注明的儿童。希望您能享受一个难得的大人之夜！" },
    { question: "我应该几点到达？", answer: "宾客可于下午 2:00 起入场。婚礼仪式将于下午 3:00 准时开始——建议于 2:45 前就座。" },
    { question: "场地是否有停车位？", answer: "VENUE_NAME_CN设有现场停车场。但我们强烈建议乘坐包车，以便尽情享受当晚的庆典。" },
    { question: "我有饮食要求，应该怎么做？", answer: "请在回复确认时注明您的饮食需求。场地可在提前通知的情况下满足大多数需求，我们希望每位宾客都能宾至如归。" },
    { question: "仪式期间可以拍照吗？", answer: "我们的婚礼仪式为「无手机仪式」——敬请收起手机和相机，全心投入这一时刻。专业摄影师将记录每一个珍贵瞬间。晚宴期间欢迎自由拍照！" },
    { question: "如果天气不好怎么办？", answer: "VENUE_NAME_CN设有精美的室内及有顶户外空间，无论晴雨，庆典都将如期举行，请放心出席。" },
    { question: "回复确认的截止日期是什么时候？", answer: "请于 RSVP_CUTOFF_DISPLAY_EN（婚礼前两个月）前回复确认。这将帮助我们完成餐饮、座位及大巴安排。期待您的回复，请勿拖延！" },
    { question: "婚礼临近时还会收到更多信息吗？", answer: "会的！回复确认后，我们将为您提供更多详情，包括大巴停靠站点、座位安排及婚礼当天的最新信息。" },
  ],
  NAV: {
    GO_BACK: "后退",
    SWITCH_LANGUAGE: "Switch Language",
    SWITCH_LANGUAGE_SHORT: "EN",
    RSVP: "期待回复"
  },
  RSVP: {
    SEARCH: {
      HERO_MESSAGE: "诚挚邀请您",
      INTRO: "请输入您的姓名以查找邀请函，并确认您及家人的出席情况。",
      FIRST_NAME: "名字",
      LAST_NAME: "姓氏",
      BTN: "查找我的邀请函",
      NOT_FOUND: "未找到该姓名的宾客。请检查拼写是否正确 —— 如果仍有问题，请直接与我们联系。",
      MISSING_NAME: "请输入名字和姓氏。",
      CANT_FIND: "找不到您的邀请函？",
      CONTACT_LINK: "与我们联系",
      DEADLINE_LABEL: "回复截止日期",
    },
    FORM: {
      INTRO: "请在下方确认每位宾客的的出席情况和饮食要求。",
      BTN_ACCEPT_ALL: "全部接受",
      BTN_DECLINE_ALL: "全部谢绝",
      BTN_ATTENDING: "出席",
      BTN_DECLINE: "谢绝",
      DIETARY_LABEL: "饮食要求",
      DIETARY_HINT: "过敏、忌口或特定偏好（若无则保持空白）…",
      DIETARY_NONE: "无特殊要求",
      BTN_CONFIRM: "确认回复",
      BTN_SAVE: "保存修改",
      NOT_ME: "不是您的家庭信息？重新搜索",
      PAST_CUTOFF_FORM: (date: string) => `回复截止日期已过（${date}）。如需修改，请`,
      PAST_CUTOFF_LINK: "直接与我们联系",
      VALIDATE_REMAINING: (n: number) => `请为剩余的 ${n} 位宾客选择出席或谢绝。`,
    },
    CONFIRMATION: {
      HERO_MESSAGE: "已确认",
      CONFIRMED_HEADING: "非常感谢！",
      MSG_ATTENDING: (n: number) => `我们迫不及待地想在 7 月 17 日与您${n === 1 ? "" : "各位"}一同庆祝！`,
      MSG_DECLINED: "很抱歉您无法出席。非常感谢您告知我们。",
      BTN_EDIT: "修改我的回复",
      NOT_MY_RSVP: "不是您的回复信息？重新搜索",
      CHANGES_UNTIL: "允许修改截止至",
    },
    STATUS: {
      ATTENDING: "出席",
      DECLINED: "谢绝",
      PENDING: "待定",
    },
    SYSTEM: {
      LOADING: "加载中…",
      ERROR_GENERIC: "发生错误，请稍后再试",
      ERROR_SAVE: "保存您的回复时出错，请重试",
    },
  },
  DATES: {
    WEDDING_DATE: format(WEDDING_DATE, 'PPP', { locale: zhCN }),
    CUTOFF_RSVP_DATE: format(RSVP_CUTOFF_DATE, 'PPP', { locale: zhCN }),
    CEREMONY_START_TIME: "15:30"
  },
  LOCATION:{
    VENUE_NAME: "雅拉谷 Immerse 庄园",
    VENUE_NAME_SHORT: "雅拉谷 Immerse 庄园",
  },
  INVITATION: {
    INVITATION_HEADER: ["诚挚的邀请您", "参加我们的婚礼"],
    REPLY_BY: ["请在","之前回复"],
    SCAN_TO_RSVP: "请扫描二维码，在我们的婚礼网站上回复出席情况",
    CEREMONY_COMMENCEMENT: ["仪式将于","开始"],
    RECEPTION_TO_FOLLOW: "随后举行招待会",
    DETAILS_HEADER: "细节",
    DETAILS_BODY: "如需了解更多关于招待会、交通指引、着装要求及住宿的信息，请访问我们的网站:"

  },
  MAIN_PAGE: {
    CELEBRATE_MSG: "我们迫不及待地想和你们一起庆祝!"
  }
};
