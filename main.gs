function setCalendar() {
  // 取得試算表資料，它會是一個陣列（一種資料格式）
  const sheetData = getSheetData();

  // 取得 Google 日曆
  const calendar = CalendarApp.getCalendarById(env.calendarId);

  // 使用迴圈逐一處理每一筆資料
  sheetData.forEach((data) => {
    const timeRange = parseTimeRange(data.timeRange);
    // 檢查該事件是否已經存在
    const isExist = isEventExist(calendar, data.name, timeRange['startDateTime'], timeRange['endDateTime']);

    // 如果該事件不存在，則建立 Google 行事曆的事件，將 Google 試算表的資料寫入到 Google 行事曆中
    if (!isExist) {
      // 將開始時間與結束時間轉換成 Google 行事曆可以使用的時間格式
      
      // 建立 Google 行事曆的事件，將 Google 試算表的資料寫入到 Google 行事曆中
      event = calendar.createEvent(data.name, timeRange['startDateTime'], timeRange['endDateTime'], {
        description: `與 ${data.name} 的預約，聯絡信箱：${data.email}（線上會議連結：${env.meetUrl}）`, // 將預約者的 Email 寫入到 Google 行事曆的描述中
        guests: data.email
      });

      Logger.log(event);

      sendConfirmationEmail(data.name, data.email, timeRange['startDateTime'], timeRange['endDateTime']);
      updateFormOptions();
    }
  });
}
