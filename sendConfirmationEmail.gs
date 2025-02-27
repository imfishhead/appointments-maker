function sendConfirmationEmail(name, email, startTime, endTime) {
  const subject = `預約確認 - ${startTime}`;
  const body = 
`親愛的 ${name}，

感謝您的預約！以下是您的預約資訊：

📅 日期：${formatDate(startTime)}
🕒 時間：${formatTime(startTime)} - ${formatTime(endTime)}
📍 線上會議連結：${env.meetUrl}

如需更改或取消預約，請提前聯絡我們。

祝好，
${env.hostName}`
;

  MailApp.sendEmail({
    to: email,
    cc: env.hostEmail,
    subject: subject,
    body: body
  });

  Logger.log(`確認信已發送至：${email}`);
}
