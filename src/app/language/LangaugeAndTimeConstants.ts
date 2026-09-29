export const WELCOME = "Welcome"
export const WELCOME_CN = "欢迎"
export const LANGUAGE_TEXT = "Please select your language"
export const LANGUAGE_TEXT_CN = "请选择语言"
export const AU = "🇦🇺"
export const CN = "🇨🇳"

export const ENGLISH = "English"
export const CHINESE = "中文"
export const CONTINUE_EN = "Continue in English"
export const CONTINUE_CN = "以中文继续"

export const NAMES = "Yiming & Nathan"
export const INITIALS = "Y & N"

//Dates
export const WEDDING_DATE = new Date("2027-07-10T15:00:00+10:00");
// Calculate x month prior, keeping the time at 23:59:59
export const RSVP_CUTOFF_DATE = (() => {
const date_rsvp_deadline_months_prior = 1

  const date = new Date(WEDDING_DATE.getTime());
  date.setMonth(date.getMonth() - date_rsvp_deadline_months_prior);
  date.setHours(23, 59, 59, 999); // Ensures it stays at the end of the day
  return date;
})();

export const VENUE_ADDRESS= "1548 Melba Hwy, Dixons Creek VIC 3775, Australia";