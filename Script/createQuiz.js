var qTitle = document.getElementById("ttle")
var qId = document.getElementById("qzid")
var qn = document.getElementById("qn")
var qCrtAns = document.getElementById("cans")
var qOthrAns1 = document.getElementById("oans1")
var qOthrAns2 = document.getElementById("oans2")
var qOthrAns3 = document.getElementById("oans3")
var nxt = document.getElementById("next-button")
var sbmt = document.getElementById("submit")

var arr = []

var request = new XMLHttpRequest();
request.open("POST", "https://discordapp.com/api/webhooks/1101120438010134598/TcXbqu8zJrpXWK_kAMMw5aRW8SrQ8SvU0xrznnYoWeFWY3NbIq0dLqKpOIOIIlihd2xy");
// again, replace the url in the open method with yours
request.setRequestHeader('Content-type', 'application/json');

function dscrdQnBkp(arr){
    var myEmbed = {
        author: {
          name: "QuizGen Web"
        },
        title: arr[0].title,
        description: "This is a backup of the questions created.",
        color: hexToDecimal("#00ff00"),
        fields: fldgen(arr),
      }
      
      var params = {
        username: "Qn Backup Bot",
        embeds: [ myEmbed ]
      }
      
      request.send(JSON.stringify(params));
      
      // function that converts a color HEX to a valid Discord color
      function hexToDecimal(hex) {
        return parseInt(hex.replace("#",""), 16)
      }
      
      function fldgen(arr){
        let flds = []
        let i = 1
        while(i<arr.length){
            flds.push({
                name: "Qn-"+i,
                value: arr[i].question
            })
            flds.push({
                name: "Options:",
                value: arr[i].options
            })
            flds.push({
                name: "Correct:",
                value: arr[i].correctoption
            })
        }
        flds.push({
            name: "QuizId:",
            value: arr[0].qzid
        })
        return flds
      }
}


nxt.addEventListener("click", ()=>{
    if(arr.length==0)
        arr.push({title: qTitle.value, qzid: qId.value})
    qTitle.disabled = true
    qId.disabled = true
    let a = []
    a.push(qOthrAns1.value)
    a.push(qOthrAns2.value)
    a.push(qOthrAns3.value)
    a.push(qCrtAns.value)
    arr.push({
        question: qn.value,
        options: a,
        correctoption: qCrtAns.value
    })
    qn.value=""
    qCrtAns.value=""
    qOthrAns1.value=""
    qOthrAns2.value=""
    qOthrAns3.value=""
    console.log(arr)
    // dscrdQnBkp(arr)
    // console.log("Posted qn backup in discord")
})

sbmt.addEventListener("click", ()=>{
    console.log(arr)
    // async function(){
    dscrdQnBkp(arr)
    // }
    console.log("Posted qn backup in discord")
})