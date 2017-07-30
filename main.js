var inquirer = require('inquirer');
var basicCard = require('./basic');
var clozeCard = require('./cloze');

//Counters
var count = 0;
var correctCount = 0;

//=========Basic===============
// Create in instance of function basic(){} from card.js and assign it to basic quest
var firstPresident = new basicCard('Who was the first president of the U.S', 'George Washington');
var secondPresident = new basicCard('Who was the second president of the U.S', 'John Adams');
//Holds questions
var basicQuestion = [firstPresident.front , secondPresident.front];
//Holds answers
var basicAnswer = [firstPresident.back , secondPresident.back];

//=========Cloze==============
var thirdPresident = new clozeCard("Thomas Jefferson was the third president of the U.S" , 'Thomas Jefferson');
var fourthPresident = new clozeCard("James Madison was the forth president of the U.S" , 'James Madison');
//Holds questions
var clozeQuestion = [thirdPresident.partial , fourthPresident.partial];
//Holds answers
var clozeAnswer = [thirdPresident.cloze , fourthPresident.cloze];

// Ask user if they want to play game with BASIC or CLOZE flashcards
inquirer.prompt([
		{
			type: 'list',
			name: 'choice',
			message: 'Do you want to play with basic or cloze flashcards ?',
			choices:['Basic', 'Cloze']
		}
	])
	.then(function(answer){
		//If the users choice is basic....
		if(answer.choice === 'Basic'){
			basic();
		}
		// If users answer is cloze.......
		else if(answer.choice === 'Cloze'){
			cloze();
		}
	})
// Ask questions for basic flashCards. Using recursion to repeat
function basic() {
	// Iterates through questions
	if(count < basicAnswer.length){
		
		inquirer.prompt([
			{
				type:'input',
				name: 'input',
				message: basicQuestion[count]
			},
		])
		.then(function(answer){
			//Checks if users answer was correct
			if(answer.input.toLowerCase() === basicAnswer[count].toLowerCase()){
				correctCount++;
			}
			count++;
			//Calls function to continue to the next question 
			basic();
		})
	}
	//Dispalys end of game results
	else{
		console.log('You got' ,correctCount, 'Right');
		for(var i = 0; i < clozeAnswer.length; i++){
			console.log('The answers are' , basicAnswer[i]);
		}
	}
}

function cloze() {

	if(count < clozeQuestion.length) {
		inquirer.prompt([
				{
					type:'input',
					name: 'input',
					message: clozeQuestion[count]
				}
		])
		.then(function(answer){
			if(answer.input.toLowerCase() === clozeAnswer[count].toLowerCase()) {
				correctCount++;
			}
				count++
				cloze();
		});

	}
	//Displays end game result
	else {
		console.log('You got' ,correctCount, 'Right');
		for(var i = 0; i < clozeAnswer.length; i++){
			console.log('The answers are' , clozeAnswer[i]);
		}
	}
}