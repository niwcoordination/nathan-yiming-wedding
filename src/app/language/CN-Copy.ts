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
    { time: "3:00 PM", event: "宾客入席", detail: "欢迎抵达婚礼现场，请在仪式开始前依序入座。" },
    { time: "3:30 PM", event: "婚礼仪式", detail: "执子之手，与子偕老。请与我们共同见证这神圣而幸福的誓言时刻。" },
    { time: "4:00 PM", event: "鸡尾酒时光", detail: "请前往露台享用招牌鸡尾酒与精致小食，我们在拍照期间也请尽情畅谈。" },
    { time: "5:00 PM", event: "晚宴入席", detail: "请在主宴会厅依序就座，让我们一同欢迎新郎新娘入场并享用美味晚宴。" },
    { time: "6:15 PM", event: "致辞与祝酒", detail: "举杯同庆！听听我们最亲密的朋友与家人分享他们的温馨祝福与趣事。" },
    { time: "7:00 PM", event: "切蛋糕与第一支舞", detail: "见证我们甜蜜的切蛋糕仪式，并用我们的第一支舞正式拉开派对的序幕。" },
    { time: "7:30 PM", event: "舞池开放", detail: "派对时间到！尽情放松，拿起酒杯，和我们一起在舞池中尽情摇摆吧！" },
    { time: "10:00 PM", event: "圆满送别", detail: "感谢大家的陪伴，请加入我们最后的告别仪式，为这完美的一夜画上句点。" }
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
    SWITCH_LANGUAGE: "切换语言",
    SWITCH_LANGUAGE_SHORT: "中",
    RSVP: "期待回复"
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
      GIFTS_REGISTRY_DECLINED: '\"您的出席就是我们最好的礼物。请不要准备任何礼物或红包等。您的欢声笑语、陪伴以及与我们一同分享的喜悦，就是让这一天变得完美所需要的一切。\"',
      FREQUENTLY_ASKED_QUESTIONS: "常见问题",
      FREQUENTLY_ASKED_QUESTIONS_DETAILS: "关于婚礼当日您需要了解的一切。",
      STILL_HAVE_QUESTIONS: "仍有疑问？我们非常期待收到您的消息。",
      GET_IN_TOUCH: "与我们联系",
    }
  },
  RSVP: {
    SEARCH: {
      HERO_MESSAGE: "诚挚邀请您",
      INTRO: "请输入您的姓名以查找邀请函，并确认您及家人的出席情况。",
      FIRST_NAME: "姓氏", //Switched due to normal way of writing names. Matches Database
      LAST_NAME: "名字",  //Switched due to normal way of writing names. Matches Database
      BTN: "查找我的邀请函",
      NOT_FOUND: "未找到该姓名的宾客。请检查拼写是否正确 —— 如果仍有问题，请直接与我们联系。",
      MISSING_NAME: "请输入名字和姓氏。",
      CANT_FIND: "找不到您的邀请函？",
      CONTACT_LINK: "与我们联系",
      DEADLINE_LABEL: "回复截止日期",
    },
    FORM: {
      YOUR_INVITATION: "您的专属邀请函",
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
