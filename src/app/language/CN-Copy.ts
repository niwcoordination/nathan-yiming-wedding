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
  // { time: "2:30 PM", event: "宾客入场与入住", detail: "园区内住宿开放办理入住。请先放下行李，稍作安顿，准备迎接接下来的精彩活动。" }, NOT NEEDED AS WE ARE PROVIDING TRANSPORTATION FROM MELBOURNE CBD //✅
  { time: "3:00 PM", event: "宾客就座", detail: "请前往观礼区依序就座。" },
  { time: "3:30 PM", event: "婚礼仪式", detail: "婚礼仪式正式开始。" },
  { time: "4:00 PM", event: "集体合影", detail: "仪式结束后，请大家稍作停留，我们一起合影留念。" },
  { time: "4:30 PM", event: "精美茶歇、鸡尾酒与酒庄品酒", detail: "尽情享受一小时的美酒（包含我们的招牌迎宾鸡尾酒）与精致点心。在此期间，酒庄（Cellar Door）也将开放供大家品酒。" },
  { time: "5:30 PM", event: "晚宴入场", detail: "请移步至主宴会厅，让我们一同欢迎新郎新娘入场。" },
  { time: "7:30 PM", event: "来宾致辞", detail: "聆听家人和朋友们为新人送上的真挚祝福。" },
  { time: "8:15 PM", event: "切蛋糕仪式", detail: "新人切婚礼蛋糕。" },
  { time: "10:00 PM", event: "晚宴结束、平安道别", detail: "婚礼圆满落幕。祝大家回家一路上平安，入住园区的小伙伴可以散步回房好好休息啦！" }
],
  FAQS: [
    { question: "When do I need to RSVP by?", answer: "Please RSVP no later than RSVP_CUTOFF_DISPLAY_EN (one month before the wedding). This helps us finalise catering, seating, and bus arrangements. We would love to know you are coming, so please don't leave it too late!" },
    { question: "Can I bring a plus one?", answer: "Please note that only guests named on the invitation may attend. If you would like to bring a plus one, please reach out to either of us and we will do our best to get them added." },
    { question: "What is the dress code?", answer: "Formal attire. This includes a suit and tie, full-length gown or elegant formal wear. It's winter here, so please dress warmly! Please avoid wearing white, ivory or red out of respect for the bride." },
    { question: "What time should I arrive?", answer: "Guests are warmly invited to arrive from 2:30 PM. The ceremony begins promptly at 3:30 PM — we recommend arriving by 3:00 PM to settle in and find your seat." },
    { question: "Is there parking at the venue?", answer: "Immerse has on-site parking available. Please refer to the map for further guidance." },
    { question: "I have dietary requirements — what should I do?", answer: "Please note your dietary requirements when you RSVP. The venue can accommodate most needs with advance notice and we want every guest to feel well cared for!" },
    { question: "Can I take photos during the ceremony?", answer: "During the ceremony, we request that you not to take photos or videos. Our photographers will capture every moment. Photos are absolutely welcome at the reception!" },
    { question: "What if the weather is bad?", answer: "Our ceremony and receptiona re both planned indoors with heaters. The celebration will proceed beautifully regardless of weather." }
  ],  
  NAV: {
    SWITCH_LANGUAGE:"Switch Language",
    SWITCH_LANGUAGE_SHORT:"EN",
    RSVP:"期待回复"
  },
  MAIN: {
    HEADERS: {
      THE_DAY: "婚礼当日",
      GETTING_HERE: "交通指引",
      GIFT_REGISTRY: "礼金与心意",
      QUESTIONS: "常见问题"
    },
    TEXT: {
      ORDER_OF_EVENTS: "当日日程",
      VENUE_DESCRIPTION: "亚拉谷 Immerse 庄园是一座迷人的庄园，拥有连绵起伏的葡萄园全景、郁郁葱葱的花园和世界一流的设施——是我们婚礼庆典的完美背景。",
      VENUE_LOCATION: [
        "场地位于 ", 
        " ，距离墨尔本中央商务区（CBD）约一小时车程。"
      ],
      ACCOMODATION_TRAVEL_HEADING: "住宿与包车服务",
      ACCOMODATION_TRAVEL_DETAILS: [
        "我们很高兴为从墨尔本中央商务区（CBD）出发的宾客提供免费往返包车，以便大家尽情庆祝。请注意，",
        "您的住宿和交通均已安排妥当",
        "。您将入住 ",
        "墨尔本小皇后街希尔顿酒店（Hilton Melbourne Little Queen Street）",
        "。包车将在该酒店进行接送。",
      ],
      ACCOMODATION_TRAVEL_DETAILS_DEPARTURE_HEADING: "出发信息",
      ACCOMODATION_TRAVEL_DETAILS_DEPARTURE_DETAILS: "请于下午 1:45 在大堂集合，包车将于下午 1:50 从墨尔本小皇后街希尔顿酒店准时出发",
      ACCOMODATION_TRAVEL_DETAILS_RETURN_HEADING: "返程信息",
      ACCOMODATION_TRAVEL_DETAILS_RETURN_DETAILS: "晚上 10:00 从亚拉谷 Immerse 庄园出发，返回墨尔本小皇后街希尔顿酒店",
      GIFTS_REGISTRY: "礼金与心意",
      GIFTS_REGISTRY_DECLINED: ["Please treat yourself instead and just bring your company!", 
        "We have a strict no gifts or red packets policy.", //This will be colored and bold the main page 
        "Your presence, laughter, and shared joy is all it will take to make our day perfect."], //'We celebrate only for your company. Please know that we will not accept any gifts, red pockets, etc. Your laughter, company, and shared joy are all we need to make this day perfect.',
      FREQUENTLY_ASKED_QUESTIONS: "常见问题",
      STILL_HAVE_QUESTIONS: "仍有疑问？我们非常期待收到您的消息。",
      GET_IN_TOUCH: "与我们联系",
    }
  },
  RSVP: {
    SEARCH: {
      INTRO: "请输入您的姓名以查找邀请函并确认您及家人的出席情况",
      FIRST_NAME: "姓氏", //Switched due to normal way of writing names. Matches Database
      LAST_NAME: "名字",  //Switched due to normal way of writing names. Matches Database
      BTN: "查找我的邀请函",
      NOT_FOUND: "未找到该姓名的宾客。请检查拼写是否正确 —— 如果仍有问题，请直接与我们联系。",
      MISSING_NAME: "请输入名字和姓氏。",
      CANT_FIND: "找不到您的邀请函？",
      DEADLINE_LABEL: "回复截止日期",
    },
    FORM: {
      YOUR_INVITATION: "您的专属邀请函",
      INTRO: "请在下方确认每位宾客的的出席情况和饮食要求。",
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
      CONFIRMED_HEADING: "非常感谢!",
      MSG_ATTENDING: (n: number) => `We can't wait to celebrate with ${n === 1 ? "you" : `the ${n} of you`} on the ${format(WEDDING_DATE, "do 'of' MMMM yyyy")}!`,
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
  },
  LOCATION:{
    VENUE_NAME: "雅拉谷 Immerse 庄园",
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
    CELEBRATE_MSG: "我们迫不及待地想和你们一起庆祝!", //We can't wait to celebrate with you!
    DAYS: "天",
    HOURS: "小时",
    MINUTES: "分钟",
    SECONDS: "秒"
  }
};
