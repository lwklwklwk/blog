module.exports={
  getNowDate(){
    let data = new Date()
    return `${data.getFullYear()}-${data.getMonth()}-${data.getDate()}`
  }
}