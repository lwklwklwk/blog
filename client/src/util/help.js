export default{
  UTCTimeChange(time){
    let date=time.split('T')[0]
    let smallTime=time.split('T')[1].split('.')[0]
    let timeArr = smallTime.split(':')
    timeArr[0]=(+timeArr[0]+8)%24+ ''
    smallTime=timeArr.join(':')
    return date+' '+smallTime
  }
}