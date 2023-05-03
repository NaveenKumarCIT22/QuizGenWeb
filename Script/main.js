// import "https://smtpjs.com/v3/smtp.js";

//References
var timeLeft = document.querySelector(".time-left");
var quizContainer = document.getElementById("container");
var nextBtn = document.getElementById("next-button");
var countOfQuestion = document.querySelector(".number-of-question");
var displayContainer = document.getElementById("display-container");
var scoreContainer = document.querySelector(".score-container");
var restart = document.getElementById("restart");
var userScore = document.getElementById("user-score");
var xpScore = document.getElementById("xp-score");
var startScreen = document.querySelector(".start-screen");
var startButton = document.getElementById("start-button");
var strtQz = document.getElementById("submit");
var lgn = document.getElementsByTagName("login")[0];
var qz = document.getElementsByTagName("quiz")[0];
var usrNme = document.getElementById("usrname");
var mailId = document.getElementById("mailid");
var qzid = document.getElementById("qzid");
var erinfo = document.getElementById("erinfo");
var questionCount;
var scoreCount = 0;
var xp = 0;
var count = 11;
var countdown;

//Questions and Options array

var qttle = "Demo Quiz";
var hstr = [];

var quizArray = [
  {
    id: "0",
    question: "Which is the most widely spoken language in the world?",
    options: ["Spanish", "Mandarin", "English", "German"],
    correct: "Mandarin",
  },
  {
    id: "1",
    question: "Which is the only continent in the world without a desert?",
    options: ["North America", "Asia", "Africa", "Europe"],
    correct: "Europe",
  },
  {
    id: "2",
    question: "Who invented Computer?",
    options: ["Charles Babbage", "Henry Luce", "Henry Babbage", "Charles Luce"],
    correct: "Charles Babbage",
  },
  {
    id: "3",
    question:
      "What do you call a computer on a network that requests files from another computer?",
    options: ["A client", "A host", "A router", "A web server"],
    correct: "A client",
  },
  {
    id: "4",
    question:
      "Hardware devices that are not part of the main computer system and are often added later to the system.",
    options: ["Peripheral", "Clip art", "Highlight", "Execute"],
    correct: "Peripheral",
  },
  {
    id: "5",
    question:
      "The main computer that stores the files that can be sent to computers that are networked together is:",
    options: ["Clip art", "Mother board", "Peripheral", "File server"],
    correct: "File server",
  },
  {
    id: "6",
    question: "How can you catch a computer virus?",
    options: [
      "Sending e-mail messages",
      "Using a laptop during the winter",
      "Opening e-mail attachments",
      "Shopping on-line",
    ],
    correct: "Opening e-mail attachments",
  },
  {
    id: "7",
    question: "Google (www.google.com) is a:",
    options: [
      "Search Engine",
      "Number in Math",
      "Directory of images",
      "Chat service on the web",
    ],
    correct: "Search Engine",
  },
  {
    id: "8",
    question: "Which is not an Internet protocol?",
    options: ["HTTP", "FTP", "STP", "IP"],
    correct: "STP",
  },
  {
    id: "9",
    question: "Which of the following is not a valid domain name?",
    options: [
      "www.yahoo.com",
      "www.yahoo.co.uk",
      "www.com.yahoo",
      "www.yahoo.co.in",
    ],
    correct: "www.com.yahoo",
  },
];

// if(localStorage.getItem("qzlst")!=null){
//     console.log("inside local storage")
//     var qzlst = JSON.parse(localStorage.getItem("qzlst"))
//     qzlst.forEach(function(elem,ind){
//         console.log("inside qzlist")
//         console.log(elem)
//         if(elem[0].qzid==qzid.value){
//             console.log("got qzid")
//             quizArray = []
//             elem.slice(1).forEach(function(ele,id){
//                 quizArray.push({
//                     id:id,
//                     question:ele.question,
//                     options:ele.options,
//                     correct:ele.correct
//                 })
//             })
//         }
//     })
// }

async function ResultWebHook() {
  // var url = "https://discordapp.com/api/webhooks/1102837202372808765/r1LE4rEFF-U9fFTg11f78rLnZTOhLIaJh-MaM6m0ySV2yKACUi5nZ-DpAFuaWQdhBVwt";
  const url =
    "https://discordapp.com/api/webhooks/1102896358626689044/E1jiQSYzzUSpDLd-d11eRq5D3zjlC3I5OJICDnvWYfZxaMpFFL-GZtVEm0D7jNY-DzQn";
  var request = new XMLHttpRequest();
  request.open("POST", url);
  console.log("Request successfull");
  request.setRequestHeader("Content-type", "application/json");
  console.log("Headers set successfull");

  var myEmbed = {
    author: {
      name: "Quiz Gen Web Result Bot",
    },
    title: qttle,
    description: "This is the result of attempt of " + usrNme.value + ".",
    color: 15898703,
    fields: fldgen(),
  };

  var params = {
    username: "Attempt Result Bot",
    embeds: [myEmbed],
  };

  function fldgen() {
    // console.log("Inside fldgen")
    let flds = [];
    let i = 1;
    // while (i < arr.length) {
    // console.log(i+"th run in fldgen")
    flds.push({
      name: "Attended by:",
      value: usrNme.value,
    });
    flds.push({
      name: "Quiz:",
      value: qttle,
    });
    flds.push({
      name: "Scores:",
      value: scoreCount + " out of " + questionCount,
    });
    flds.push({
      name: "XP:",
      value: xp + " points!",
    });
    //   i++;
    // }
    flds.push({
      name: "QuizId:",
      value: qzid.value,
    });
    // console.log(flds)
    return flds;
  }
  // console.log("Requesting...")
  request.send(JSON.stringify(params));
  // console.log("Request successful!!!")
}

async function ReportWebHook(arr) {
  // var url = "https://discordapp.com/api/webhooks/1102837202372808765/r1LE4rEFF-U9fFTg11f78rLnZTOhLIaJh-MaM6m0ySV2yKACUi5nZ-DpAFuaWQdhBVwt";
  const url =
    "https://discordapp.com/api/webhooks/1102887364168273930/kpYbatxraHzP6StaNIpnN_nTLMNQTDx1wmQ2i8Lb_IHzsrnjzoeKZTaKh8xlQDI-vg2j";
  var request = new XMLHttpRequest();
  request.open("POST", url);
  console.log("Request successfull");
  request.setRequestHeader("Content-type", "application/json");
  console.log("Headers set successfull");

  var myEmbed = {
    author: {
      name: "Quiz Gen Web Report Bot",
    },
    title: qttle,
    description: "This is a report of attempt of " + usrNme.value + ".",
    color: 15898703,
    fields: fldgen(arr),
  };

  var params = {
    username: "Attempt Report Bot",
    embeds: [myEmbed],
  };

  function fldgen(arr) {
    // console.log("Inside fldgen")
    let flds = [];
    let i = 1;
    // while (i < arr.length) {
    // console.log(i+"th run in fldgen")
    flds.push({
      name: "Attended by:",
      value: usrNme.value,
    });
    flds.push({
      name: "Quiz:",
      value: qttle,
    });
    flds.push({
      name: "Scores:",
      value: scoreCount + " out of " + questionCount,
      inline: true,
    });
    flds.push({
      name: "XP:",
      value: xp + " points!",
      inline: true,
    });
    //   i++;
    // }
    if (arr.length > 0) {
      flds.push({
        name: "Incorrect Responses",
        value: "Here is a list of incorrect qns",
      });
      arr.forEach((ele) => {
        flds.push({
          name: "Qn:",
          value: ele.qn,
        });
        flds.push({
          name: "Response:",
          value: ele.ans,
          inline: true,
        });
        flds.push({
          name: "Answer:",
          value: ele.cans,
          inline: true,
        });
      });
    }
    flds.push({
      name: "QuizId:",
      value: qzid.value,
    });
    // console.log(flds)
    return flds;
  }
  // console.log("Requesting...")
  request.send(JSON.stringify(params));
  // console.log("Request successful!!!")
}

//Restart Quiz
restart.addEventListener("click", () => {
  initial();
  displayContainer.classList.remove("hide");
  scoreContainer.classList.add("hide");
  xp = 0;
  scoreCount = 0;
});

strtQz.addEventListener("click", (e) => {
  e.preventDefault();
  console.log(usrNme.value);
  if (usrNme.value && mailId.value) {
    if (mailId.value.includes("@") && mailId.value.includes(".com")) {
      lgn.classList.add("hide");
      qz.classList.remove("hide");
    } else {
      erinfo.innerHTML = "Please enter valid email";
    }
  } else {
    erinfo.innerHTML = "Please enter all fields";
  }
  if (localStorage.getItem("qzlst") != null) {
    console.log("inside local storage");
    var qzlst = JSON.parse(localStorage.getItem("qzlst"));
    qzlst.forEach(function (elem, ind) {
      console.log("inside qzlist");
      console.log(elem);
      if (elem.length > 0) {
        if (elem[0].qzid == qzid.value) {
          console.log("got qzid");
          qttle = elem[0].qzid;
          quizArray = [];
          elem.slice(1).forEach(function (ele, id) {
            quizArray.push({
              id: id,
              question: ele.question,
              options: ele.options,
              correct: ele.correct,
            });
          });
        }
      }
    });
  }
});

//Next Button
nextBtn.addEventListener(
  "click",
  (displayNext = () => {
    //increment questionCount
    questionCount += 1;
    //if last question
    if (questionCount == quizArray.length) {
      //hide question container and display score
      displayContainer.classList.add("hide");
      scoreContainer.classList.remove("hide");
      //user score
      userScore.innerHTML =
        "Your score is " +
        scoreCount +
        " out of " +
        questionCount +
        "<br><br>  Your XP is " +
        xp +
        " points!";
      //   var data_js = {
      //     access_token: "evp1cbyz53umrfbkeny6qc15",
      //   };
      //   function js_send() {
      //     var request = new XMLHttpRequest();

      //     var subject = usrNme.value + "'s Score for " + qzid.value;
      //     var message =
      //       usrNme.value +
      //       "'s score is " +
      //       scoreCount +
      //       " out of " +
      //       questionCount +
      //       " and  Your XP is " +
      //       xp +
      //       " points!";
      //     data_js["subject"] = subject;
      //     data_js["text"] = message;
      //     var params = toParams(data_js);

      //     request.open("POST", "https://postmail.invotes.com/send", true);
      //     request.setRequestHeader(
      //       "Content-type",
      //       "application/x-www-form-urlencoded"
      //     );

      //     request.send(params);

      //     return false;
      //   }

      //   js_send();
      function sendEmail() {
        // Email.send({
        //   Host: "smtp.gmail.com",
        //   Username: "mnkincit22@gmail.com",
        //   Password: "wwdmrlqxqgdccibm",
        //   To: "naveenkumarmstvl@gmail.com",
        //   From: "quizgenweb@gmail.com",
        //   Subject: usrNme.value + "'s Score for " + qzid.value,
        //   Body: "Your score card is below.",
        //   html: `<div style='background:goldenrod; text-align:center; color:white; text-shadow: 2px 2px 2px red'><h1>${usrNme.value}'s Score in ${qttle} Quiz</h1><h3>Score: ${scoreCount+" out of "+questionCount}</h3><h3>XP   : ${xp+" points!"}</h3></div>`
        // })
        //   .then(function (message) {
        //     console.log("Mail has been sent successfully")
        //   });
        (function () {
        //   emailjs.init("bcY6oWjHvUNx2Ab_M2Q5p"); //please encrypted user id for malicious attacks
        emailjs.init("kMOxF-sDaID9-Mbo2");
        })();
        //set the parameter as per you template parameter[https://dashboard.emailjs.com/templates]
        emailjs
          .send("service_etgtj9h", "template_ii1pe7q", {
            usr_name: usrNme.value,
            quiz_id: qzid.value,
            mail_id:mailId.value,
            to_name: "QuizSummaries",
            qz_title: qttle,
            score: `${scoreCount+" out of "+questionCount}`,
            xp: `${xp+" points!"}`,
          })
          .then(
            function (response) {
              console.log("SUCCESS!", response.status, response.text);
            },
            function (error) {
              console.log("FAILED...", error);
            }
          );
        // var templateParams = {
        //   to_name: "xyz",
        //   from_name: "abc",
        //   message_html: "Please Find out the attached file",
        // };

        // emailjs
        //   .send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", templateParams)
        //   .then(
        //     function (response) {
        //       console.log("SUCCESS!", response.status, response.text);
        //     },
        //     function (error) {
        //       console.log("FAILED...", error);
        //     }
        //   );
      }
      console.log("Mail sent");
      ReportWebHook(hstr);
      ResultWebHook();
      sendEmail();

      //   function toParams(data_js) {
      //     var form_data = [];
      //     for (var key in data_js) {
      //       form_data.push(
      //         encodeURIComponent(key) + "=" + encodeURIComponent(data_js[key])
      //       );
      //     }

      //     return form_data.join("&");
      //   }
    } else {
      //display questionCount
      countOfQuestion.innerHTML =
        questionCount + 1 + " of " + quizArray.length + " Question";
      xpScore.innerHTML = xp;
      //display quiz
      quizDisplay(questionCount);
      count = 11;
      clearInterval(countdown);
      timerDisplay();
    }
  })
);

//Timer
const timerDisplay = () => {
  countdown = setInterval(() => {
    count--;
    timeLeft.innerHTML = `${count}s`;
    if (count == 0) {
      clearInterval(countdown);
      displayNext();
    }
  }, 1000);
};

//Display quiz
const quizDisplay = (questionCount) => {
  let quizCards = document.querySelectorAll(".container-mid");
  //Hide other cards
  quizCards.forEach((card) => {
    card.classList.add("hide");
  });
  //display current question card
  quizCards[questionCount].classList.remove("hide");
};

//Quiz Creation
function quizCreator() {
  //randomly sort questions
  quizArray.sort(() => Math.random() - 0.5);
  //generate quiz
  for (let i of quizArray) {
    //randomly sort options
    i.options.sort(() => Math.random() - 0.5);
    //quiz card creation
    let div = document.createElement("div");
    div.classList.add("container-mid", "hide");
    //question number
    countOfQuestion.innerHTML = 1 + " of " + quizArray.length + " Question";
    //question
    let question_DIV = document.createElement("p");
    question_DIV.classList.add("question");
    question_DIV.innerHTML = i.question;
    div.appendChild(question_DIV);
    //options
    div.innerHTML += `
    <button class="option-div" onclick="checker(this)">${i.options[0]}</button>
     <button class="option-div" onclick="checker(this)">${i.options[1]}</button>
      <button class="option-div" onclick="checker(this)">${i.options[2]}</button>
       <button class="option-div" onclick="checker(this)">${i.options[3]}</button>
    `;
    quizContainer.appendChild(div);
  }
}

//Checker Function to check if option is correct or not
function checker(userOption) {
  let userSolution = userOption.innerText;
  let question =
    document.getElementsByClassName("container-mid")[questionCount];
  let options = question.querySelectorAll(".option-div");

  //if user clicked answer == correct option stored in object
  if (userSolution === quizArray[questionCount].correct) {
    userOption.classList.add("correct");
    scoreCount++;
    xp += count;
  } else {
    userOption.classList.add("incorrect");
    hstr.push({
      qn: quizArray[questionCount].question,
      ans: userSolution,
      cans: quizArray[questionCount].correct,
    });
    //For marking the correct option
    options.forEach((element) => {
      if (element.innerText == quizArray[questionCount].correct) {
        element.classList.add("correct");
      }
    });
  }

  //clear interval(stop timer)
  clearInterval(countdown);
  //disable all options
  options.forEach((element) => {
    element.disabled = true;
  });
}

//initial setup
function initial() {
  quizContainer.innerHTML = "";
  questionCount = 0;
  scoreCount = 0;
  count = 11;
  clearInterval(countdown);
  timerDisplay();
  quizCreator();
  quizDisplay(questionCount);
}

//when user click on start button
startButton.addEventListener("click", () => {
  startScreen.classList.add("hide");
  displayContainer.classList.remove("hide");
  initial();
});

//hide quiz and display start screen
window.onload = () => {
  startScreen.classList.remove("hide");
  displayContainer.classList.add("hide");
  qz.classList.add("hide");
};
