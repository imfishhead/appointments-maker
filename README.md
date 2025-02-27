# appointments-maker

這個專案是一個預約與通知系統，主要功能包括：

- ✅ 自動檢查 Google Calendar 空檔，並更新 Google Form 提供可預約時段。
- ✅ 收到表單提交後，自動在 Google Calendar 建立事件並附上 Google Meet 連結。
- ✅ 發送 Email 確認信，內含會議資訊與 Google Meet 連結，並 CC 給自己以便留存。
- ✅ 送出後自動更新預約選項，確保表單上的時段與行事曆同步，避免重複預約。

🚀 目標：讓預約流程全自動化，減少手動排程的時間，提高效率！ 🎯

# 建立步驟
這是一個 Google App Script 的專案，請透過以下步驟建立：

1. 請先建立一個 google form，並先建立四個題目，依序為：
   1. 可以的時間（選擇題）（請先自行建立可以的時間，格式為 yyyy-mm-dd HH:mm - HH:mm，如 2025-02-28 17:00 - 18:00）
   2. 你的 email（簡答題）
   3. 你的名字（簡答題）
   4. 會議目的（詳述題）

2. 點選「回覆」分頁並建立連結試算表
3. 進入試算表後，點入「擴充功能」並點選 Google App Script
4. 將此專案的 gs 依序建立至開啟的 Google App Script
5. 建立 env.gs，並建立以下環境變數
```
const env = {
  calendarId: 'xxx', // 這是主要寫入預約事件的行事曆 ID
  checkEventCalendars: [
    '',
  ], // 這是確認空檔的行事曆來源，支援多個行事曆；建議包含預約事件的行事曆避免新增的預約沒有被計算出來
  formID: '', // 你的表單 ID
  meetUrl: '', // 預先建立的線上會議連結
  hostName: '', // 你的名字，email 署名用
  hostEmail: '' // 你的 email，cc 用
}
```
6. 手動執行 main.gs 並賦予權限
7. 成功！接下來你的表單就可以開放預約並自動更新表單內容囉

# 參考資料
程式碼參考 https://israynotarray.com/other/20230527/3505650923/
