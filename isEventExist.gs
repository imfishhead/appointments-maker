function isEventExist(calendar, name, startTime, endTime) {
  const events = calendar.getEvents(startTime, endTime, {
    search: name,
  });

  return events.length > 0;
}
