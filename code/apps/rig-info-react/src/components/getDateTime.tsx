export function getDateTime(): string {
  const currentdate: Date = new Date();

  const dateTime: string =
    currentdate.getMonth() +
    1 +
    '-' +
    currentdate.getDate() +
    '-' +
    currentdate.getFullYear() +
    ' ' +
    currentdate.getHours() +
    ':' +
    currentdate.getMinutes() +
    ':' +
    currentdate.getSeconds();

  return dateTime;
}
