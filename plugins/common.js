Date.prototype.format=function(pattern){
    var month=this.getMonth()+1
    ,date=this.getDate()
    ,hours=this.getHours()
    ,min=this.getMinutes()
    ,sec=this.getSeconds();
    return pattern.replace(/yyyy/g,this.getFullYear())
                .replace(/yy/g,String(this.getFullYear()).substr(2,2))
                .replace(/MM/g,month>=10?month:"0"+month)
                .replace(/M\*/g,month)
                .replace(/dd/g,date>=10?date:"0"+date)
                .replace(/d\*/g,date)
                .replace(/hh/gi,hours>=10?hours:"0"+hours)
                .replace(/h\*/gi,hours)
                .replace(/m\*/g,min)
                .replace(/mm/g,min>=10?min:"0"+min)
                .replace(/ss/g,sec>=10?sec:"0"+sec)
                .replace(/s\*/g,sec);
};
