function parseTimeRange(timeRange) {
  const match = timeRange.match(/^(\d{4}-\d{2}-\d{2}) (\d{2}:\d{2}) - (\d{2}:\d{2})$/);
  if (!match) {
    throw new Error(`Invalid time format: ${timeRange}`);
  }

  const date = match[1]; // 2025-02-28
  const startTime = match[2]; // 10:00
  const endTime = match[3]; // 11:00

  return {
    startDateTime: parseTime(date, startTime),
    endDateTime: parseTime(date, endTime)
  };
}

function parseTime(date, time) {
  const timeRegex = /^(\d{2}):(\d{2})$/;
  const match = time.match(timeRegex);

  if (!match) {
    throw new Error(`Invalid time format: ${time}`);
  }

  const hours = parseInt(match[1], 10);
  const minutes = parseInt(match[2], 10);

  const parsedTime = new Date(date);
  parsedTime.setHours(hours, minutes, 0, 0); // 設定時、分、秒、毫秒

  return parsedTime;
}

// 格式化日期 (YYYY-MM-DD)
function formatDate(date) {
  return Utilities.formatDate(date, Session.getScriptTimeZone(), "yyyy-MM-dd");
}

// 格式化時間 (HH:mm)
function formatTime(date) {
  return Utilities.formatDate(date, Session.getScriptTimeZone(), "HH:mm");
}
