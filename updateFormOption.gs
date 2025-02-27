// === 設定區 ===
const WORKING_HOURS = { start: 10, end: 18 }; // 可預約時段 (10:00-18:00)
const SLOT_DURATION = 60; // 每次預約時間 (分鐘)
const DAYS_IN_ADVANCE = 7; // 提供未來幾天的預約時間

// === 1. 檢查空檔並更新 Google Form ===
// 1. 檢查空檔並更新 Google Form
function updateFormOptions() {
  const form = FormApp.openById(env.formID);
  const items = form.getItems(FormApp.ItemType.MULTIPLE_CHOICE);
  const timeSlotItem = items[0].asMultipleChoiceItem();

  const availableSlots = getAvailableTimeSlots();

  if (availableSlots.length === 0) {
    timeSlotItem.setChoices([timeSlotItem.createChoice("目前無可預約時段")]);
  } else {
    const choices = availableSlots.map(slot => timeSlotItem.createChoice(slot));
    timeSlotItem.setChoices(choices);
  }

  Logger.log("預約表單已更新。");
}

// 取得未來指定天數的所有空檔時間
function getAvailableTimeSlots() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);  // 設置為當天 00:00:00
  const endDate = new Date();
  endDate.setDate(today.getDate() + DAYS_IN_ADVANCE);

  let availableSlots = [];

  while (today.getTime() <= endDate.getTime()) {
    const date = new Date(today);  // 複製當天日期
    for (let hour = WORKING_HOURS.start; hour < WORKING_HOURS.end; hour++) {
      const startTime = new Date(date.setHours(hour, 0, 0, 0));  // 每小時開始
      const endTime = new Date(startTime.getTime() + SLOT_DURATION * 60000);  // 計算結束時間

      if (isSlotAvailable(startTime, endTime)) {
        availableSlots.push(`${formatDate(startTime)} ${formatTime(startTime)} - ${formatTime(endTime)}`);
      }
    }
    today.setDate(today.getDate() + 1);  // 前進到下一天
  }

  return availableSlots;
}

// 檢查所有行事曆是否有空檔
function isSlotAvailable(startTime, endTime) {
  for (const calendarId of env.checkEventCalendars) {
    const calendar = CalendarApp.getCalendarById(calendarId);
    if (calendar.getEvents(startTime, endTime).length > 0) {
      return false;
    }
  }
  return true;
}
