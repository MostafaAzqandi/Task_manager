export function validateTaskDates(expireDate) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const taskExpireDate = new Date(expireDate);

  return taskExpireDate > today;
}