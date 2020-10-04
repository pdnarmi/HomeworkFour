// Function to output player name and highscore
(function(){
    var scoreTable = document.getElementById('scoreTable');
    var scoreString = localStorage.getItem("scores");

    const output = [];
// Parses localstorage of scores object into readable text
    if (scoreString != null){
        var scores = JSON.parse(scoreString);

        scores.forEach(score => {
            console.log(score);

            output.push(
                `<tr>
                    <td>${score.player}</td>
                    <td>${score.highScore}</td>
                </tr>`
            );
        
        });

        scoreTable.innerHTML = scoreTable.innerHTML + output.join('');
    }
})();