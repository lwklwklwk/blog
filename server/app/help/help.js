module.exports={
  getNowDate(){
    let data = new Date()
    return `${data.getFullYear()}-${data.getMonth()+1}-${data.getDate()} ${data.getHours()}:${data.getMinutes()}:${data.getSeconds()}`
  }
}