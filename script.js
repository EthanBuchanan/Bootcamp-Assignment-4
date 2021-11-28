var timerEl = document.querySelector("#timer-content");
var contentEl = document.querySelector("#content");

var questions = [
    {
        Question: "Question: HTML stands for",
        Options: ["Hertons Titular Machine Language", "HyperText Markup Language", "Hacking Team's Munchy Lounge", "Hack Test Make Launch"],
        Answer: 1
    },
    {
        Question: "Question: Which is the correct CSS for styling a div tag with flex display",
        Options: ["div {display: flex;}", "var div = [display: flex;]", "(div) -> {display = flex};", "div.display = flex"],
        Answer: 0
    },
];

var timerControl;
var time;

var availableQuestions;

function onQuizStart() {

    time = 60;

    timerControl = setInterval(function () {
        
        
        time--;
        if (time < 1){
            clearInterval(timerControl);
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
        // move on to saving initials and highscores
        return;
    }

    var index = Math.floor( Math.random() * availableQuestions.length);

    var QuestionEl = document.createElement("h2");
    QuestionEl.setAttribute("class","question");
    contentEl.appendChild(QuestionEl);
    QuestionEl.textContent = questions[availableQuestions[index]].Question;

}

onQuizStart();
