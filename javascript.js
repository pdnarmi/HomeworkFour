<script src="questions.js"></script>

var quizDiv = document.getElementById("quizDiv");






function quizBuild() {
    var output = [];
    
    questions.forEach((currentQuestion, questionNumber)=>{
        var possibleAnswers = [];
        
        for (letter in currentQuestion.choices){
            possibleAnswers.push(
                `<label> title </label>
                <input name = "question${questionNumber}" value = "${letter}" type= "radio"></input>`
            )
    }
    })
}