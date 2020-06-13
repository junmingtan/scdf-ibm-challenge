export function getTime(dateObject) {
  return dateObject.getHours() + ":" + dateObject.getMinutes() + ":" + dateObject.getSeconds();
}

export function getDate(dateObject){
  return dateObject.getDate() + "/" + dateObject.getMonth() + "/" + dateObject.getFullYear();
}
