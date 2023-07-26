var qTitle = document.getElementById("ttle");
var qId = document.getElementById("qzid");
var qn = document.getElementById("qn");
var qCrtAns = document.getElementById("cans");
var qOthrAns1 = document.getElementById("oans1");
var qOthrAns2 = document.getElementById("oans2");
var qOthrAns3 = document.getElementById("oans3");
var nxt = document.getElementById("next-button");
var sbmt = document.getElementById("submit");
var crte = document.getElementById("crte");
var auths = document.getElementById("auths");
var authcode = document.getElementById("authcode");
var authForm = document.querySelector("#authForm");

var arr = [];

// document.onload(() => {
crte.hidden = true;
auths.hidden = false;
// });

async function testSnd2(arr) {
  // var url = "https://discordapp.com/api/webhooks/1102837202372808765/r1LE4rEFF-U9fFTg11f78rLnZTOhLIaJh-MaM6m0ySV2yKACUi5nZ-DpAFuaWQdhBVwt";
  const url =
    "https://discordapp.com/api/webhooks/1101120438010134598/TcXbqu8zJrpXWK_kAMMw5aRW8SrQ8SvU0xrznnYoWeFWY3NbIq0dLqKpOIOIIlihd2xy";
  var request = new XMLHttpRequest();
  request.open("POST", url);
  console.log("Request successfull");
  request.setRequestHeader("Content-type", "application/json");
  console.log("Headers set successfull");

  var myEmbed = {
    author: {
      name: "Quiz Gen Web Qn Backup Bot",
    },
    title: arr[0].title,
    description: "This is a backup of the questions created.",
    color: 15258703,
    fields: fldgen(arr),
  };

  var params = {
    username: "Qn Backup Bot",
    embeds: [myEmbed],
  };
  function optStr(lst) {
    let st = "";
    let cnt = 0;
    lst.forEach((ele) => {
      st += `(${cnt})${ele}\n`;
      cnt++;
    });
    return st;
  }
  function fldgen(arr) {
    console.log("Inside fldgen");
    let flds = [];
    let i = 1;
    while (i < arr.length) {
      console.log(i + "th run in fldgen");
      flds.push({
        name: "Qn-" + i,
        value: arr[i].question,
      });
      flds.push({
        name: "Options:",
        value: optStr(arr[i].options),
      });
      flds.push({
        name: "Correct:",
        value: arr[i].correct,
      });
      i++;
    }
    flds.push({
      name: "QuizId:",
      value: arr[0].qzid,
    });
    console.log(flds);
    return flds;
  }
  console.log("Requesting...");
  request.send(JSON.stringify(params));
  console.log("Request successful!!!");
}

nxt.addEventListener("click", () => {
  //validation
  if (
    qTitle.value == "" ||
    qzid.value == "" ||
    qOthrAns1.value == "" ||
    qOthrAns2.value == "" ||
    qOthrAns3.value == "" ||
    qCrtAns.value == "" ||
    qn.value == ""
  ) {
    alert("You must fill all fields or click on Submit button !!!");
    return;
  }

  //set in firebase
  if (arr.length == 0) arr.push({ title: qTitle.value, qzid: qId.value });
  db.collection("QuizQns")
    .doc(qId.value)
    .set({
      quizid: qId.value,
      title: qTitle.value,
    })
    .then(() => console.log("Success for setting id in db"))
    .catch((e) => console.log(e));
  qTitle.disabled = true;
  qId.disabled = true;
  db.collection("QuizQns")
    .doc(qId.value)
    .collection("qns")
    .doc(qn.value.slice(0, 5) + new Date().toTimeString())
    .set({
      crt_option: qCrtAns.value,
      option1: qCrtAns.value,
      option2: qOthrAns1.value,
      option3: qOthrAns2.value,
      option4: qOthrAns3.value,
      qn_name: qn.value,
    });
  let a = [];
  a.push(qOthrAns1.value);
  a.push(qOthrAns2.value);
  a.push(qOthrAns3.value);
  a.push(qCrtAns.value);
  arr.push({
    question: qn.value,
    options: a,
    correct: qCrtAns.value,
  });
  qn.value = "";
  qCrtAns.value = "";
  qOthrAns1.value = "";
  qOthrAns2.value = "";
  qOthrAns3.value = "";
  console.log(arr);
  // dscrdQnBkp(arr)
  // console.log("Posted qn backup in discord")
});

sbmt.addEventListener("click", () => {
  console.log(arr);
  // async function(){
  testSnd2(arr);
  // // }
  console.log("Posted qn backup in discord");
  var qzlst;
  if (localStorage.getItem("qzlst") == null) {
    qzlst = [];
  } else {
    qzlst = JSON.parse(localStorage.getItem("qzlst"));
  }
  qzlst.push(arr);
  localStorage.setItem("qzlst", JSON.stringify(qzlst));
});

authForm.addEventListener("submit", (e) => {
  e.preventDefault();
  // console.log("in....");
  var vals = authcode.value;
  let cmp = 0;
  for (let i = 0; i < 15; i++) {
    cmp += i * i + 1;
    i++;
  }
  cmp = cmp * cmp - 1;
  cmp %= 17;
  // console.log("cmp:" + cmp);
  let val = 0;
  for (let s of vals) {
    val += parseInt(s);
  }
  // console.log("val:" + val);
  if (cmp / val == 2) {
    crte.hidden = false;
    auths.hidden = true;
  }
});

// function authorize(e) {}
qn.addEventListener("blur",(e)=>{e.target.value = e.target.value.replace("\n","<br />");})
