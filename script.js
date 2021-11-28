var timerEl = document.querySelector("#timer-content");
var contentEl = document.querySelector("#content");

var questions = [
    {
        Question: "Question: HTML stands for:",
        Options: ["Hertons Titular Machine Language", "HyperText Markup Language", "Hacking Team's Munchy Lounge", "Hack Test Make Launch"],
        Answer: 1
    },
    {
        Question: "Question: Which is the correct CSS for styling a div tag with flex display:",
        Options: ["div {display: flex;}", "var div = [display: flex;]", "(div) -> {display = flex};", "div.display = flex"],
        Answer: 0
    },
];

var timerControl;
var time;
var availableQuestions;


const TIME_PENALTY_FOR_ANSWERING_WRONG = 3;

function onQuizStart() {

    timerEl.parentElement.setAttribute("style","display: block");

    time = 60;

    timerControl = setInterval(function () {
        
        
        time--;
        if (time < 1){
            clearInterval(timerControl);
            onQuizEnd();
            return;
        }
        timerEl.textContent = time + "";

    },1000);

    availableQuestions = [];

    for (var i = 0; i < questions.length; i++)
    {
        availableQuestions.push(i);
    }

    renderNewQuestion();
}

function renderNewQuestion()
{
    if (availableQuestions.length < 1)
    {
        onQuizEnd();
        return;
    }

    var index = Math.floor( Math.random() * availableQuestions.length);

    // clears out old questions and buttons
    contentEl.innerHTML = "";


    // render the question
    var questionEl = document.createElement("h2");
    questionEl.setAttribute("class","question");
    contentEl.appendChild(questionEl);
    questionEl.textContent = questions[availableQuestions[index]].Question;

    var formEl = document.createElement("form");
    formEl.setAttribute("class","multiple-choice");
    contentEl.appendChild(formEl);
    
    for (var i = 0; i < questions[availableQuestions[index]].Options.length; i++)
    {
        var buttonEl = document.createElement("button");
        buttonEl.setAttribute("class","button-style");
        contentEl.appendChild(buttonEl);
        buttonEl.textContent = questions[availableQuestions[index]].Options[i];

        if (i === questions[availableQuestions[index]].Answer)
        {            
            buttonEl.addEventListener("click",function () {
                renderNewQuestion();
            });
        }
        else
        {            
            buttonEl.addEventListener("click",function () {
                time -= TIME_PENALTY_FOR_ANSWERING_WRONG;
                timerEl.textContent = time + "";
                if (time < 1)
                {
                    onQuizEnd();
                }
                renderNewQuestion();
            });
        }
    }

    availableQuestions.splice(index,1);
}

function onQuizEnd()
{
    //console.log("onQuizEnd");


    // resets quiz
    contentEl.innerHTML = "";
    clearInterval(timerControl);
    timerEl.parentElement.setAttribute("style","display: none");

    // creates form to get initials for high score
    var scoreEl = document.createElement("h2");
    scoreEl.setAttribute("class","question");
    contentEl.appendChild(scoreEl);
    scoreEl.textContent = "Score: " + time;

    var instructionsEl = document.createElement("p");
    
    contentEl.appendChild(instructionsEl);
    instructionsEl.textContent = "Enter your initials to save your highscore";

    var formEl = document.createElement("form");
    //scoreEl.setAttribute("class","question");
    contentEl.appendChild(formEl);
    //formEl.textContent = "Score: " + time;

    var inputEl = document.createElement("input");
    inputEl.setAttribute("type","text");
    formEl.appendChild(inputEl);
    //inputEl.textContent = "Score: " + time;

    var submitEl = document.createElement("input");
    submitEl.setAttribute("type","submit");
    submitEl.setAttribute("class","button-style");
    formEl.appendChild(submitEl);
    submitEl.textContent = "Submit";
    submitEl.addEventListener("click",function (e) {
        e.preventDefault();

        var scores = JSON.parse( localStorage.getItem("scores"));

        if (scores === null)
        {
            scores = [];
        }

        scores.push([inputEl.value,time]);
        

        //TODO if I want brownie points later then sorting scores by the hightest score would be neat

        localStorage.setItem("scores",JSON.stringify(scores));

        renderHighScores();
    })

}

function renderHighScores() {
    contentEl.innerHTML = "";
    timerEl.parentElement.setAttribute("style","display: none");

    var titleEl = document.createElement("h2");
    titleEl.setAttribute("class","question");
    contentEl.appendChild(titleEl);
    titleEl.textContent = "High Scores";

    var scores = JSON.parse( localStorage.getItem("scores"));

    var tableEl = document.createElement("table");
    contentEl.appendChild(tableEl);

    tableEl.appendChild(makeTableRow("Player","Score"));

    for (var i = 0; i < scores.length; i++)
    {
        tableEl.appendChild(makeTableRow(scores[i][0],scores[i][1]))
    }

    var newGameEl = document.createElement("button");
    newGameEl.setAttribute("class","button-style");
    contentEl.appendChild(newGameEl);
    newGameEl.textContent = "Play Again";
    newGameEl.addEventListener("click",function () {
        onQuizStart();
    })

}

function makeTableRow(value1,value2)
{
    var output = document.createElement("tr");
    
    var contentOneEl = document.createElement("td");
    output.appendChild(contentOneEl);
    contentOneEl.textContent = value1;

    var contentTwoEl = document.createElement("td");
    output.appendChild(contentTwoEl);
    contentTwoEl.textContent = value2;

    return output;
}
//console.log(localStorage.getItem("scores"));
onQuizStart();
