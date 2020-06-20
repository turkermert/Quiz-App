import React, {Component, Fragment} from "react";
import {Helmet} from "react-helmet";
import M from 'materialize-css';

import icon from "../../assets/img/icon.png";
import hint from '../../assets/img/hint.png';
import clock from '../../assets/img/clock.png';

import questions from '../questions.json';
import isEmpty from '../../utils/is-empty';

import correctNotification from '../../assets/audio/correct-answer.mp3';
import buttonNotification from '../../assets/audio/button-click.mp3';
import wrongNotification from '../../assets/audio/wrong-answer.mp3';

class Play extends Component{
 
    constructor(props){
        super(props);
        this.state = {
            questions, // questions: questions yazıyoruz normalde
            currentQuestion: {},
            nextQuestion: {},
            prevQuestion: {},
            answer: '',
            numberOfQuestions: 0,
            numberOfAnsweredQuestions: 0,
            currentQuestionIndex: 0,
            score: 0,
            correctAnswers: 0,
            wrongAnswers: 0,
            hints: 5,
            previousRandomNumbers : [],
            time: {}
        };

    }

componentDidMount (){
    const {questions, currentQuestion, nextQuestion, prevQuestion} = this.state;
    this.displayQuestions(questions, currentQuestion, nextQuestion, prevQuestion); 
}

displayQuestions = (questions = this.state.questions, currentQuestion, nextQuestion, prevQuestion) => {
    let { currentQuestionIndex  } = this.state;
    if(!isEmpty(this.state.questions)) {
        questions = this.state.questions;
        currentQuestion = questions[currentQuestionIndex];
        nextQuestion = questions[currentQuestionIndex + 1];
        prevQuestion = questions[currentQuestionIndex - 1];
        
        const answer = currentQuestion.answer;

        this.setState({
            currentQuestion,
            nextQuestion,
            prevQuestion,
            answer,
            numberOfQuestions: questions.length,
            previousRandomNumbers: []
        }, () => {
            this.showOptions();
        });
    } 
    else {
        M.toast({
            html: 'Wrong Answer :(',
            classes: 'toast-invalid',
            displayLength: 1500
        });
    }
  
};

handleOptionClick = (e) => {
    if(e.target.innerHTML.toLowerCase() === this.state.answer.toLowerCase()){
        setTimeout(()=> {
            document.getElementById("correct-sound").play();
        }, 500);
        
        this.correctAnswers();
    }
    else {
        setTimeout(()=> {
            document.getElementById("wrong-sound").play();
        }, 500);
        
        this.wrongAnswers();
    }
}

handleNextButtonClick = () => {
    this.playButtonSound();
    if(this.state.nextQuestion !== undefined)
    {
        this.setState(prevState => ({
            currentQuestionIndex : prevState.currentQuestionIndex +1
        }), () => {
            this.displayQuestions(this.state.state, this.state.currentQuestion, this.state.nextQuestion, this.state.previousQuestion);
        });
    }
};

handlePreviousButtonClick = () => {
    this.playButtonSound();
    if(this.state.prevQuestion !== undefined)
    {
        this.setState(prevState => ({
            currentQuestionIndex : prevState.currentQuestionIndex - 1
        }), () => {
            this.displayQuestions(this.state.state, this.state.currentQuestion, this.state.nextQuestion, this.state.previousQuestion);
        });
    }
};

handleQuitButtonClick = () => {
    this.playButtonSound();
    if(window.confirm('Are you sure you want to quit?')){
            this.props.history.push('/');
        }
};



handleButtonClick = (e) => {
    switch(e.target.id){
        case 'next-button': 
            this.handleNextButtonClick();
            break;
        
        case 'previous-button':
            this.handlePreviousButtonClick();
            break;    
        case 'quit-button':
            this.handleQuitButtonClick();
            break;
        
        default: break;
    }
    
};

playButtonSound = () => {
    document.getElementById('button-sound').play();
};




correctAnswers = () => {
    M.toast({
        html: 'Correct Answer :)',
        classes: 'toast-valid',
        displayLength: 1500
    });
    this.setState(prevState => ({
        score: prevState.score + 1,
        correctAnswers: prevState.correctAnswers + 1,
        currentQuestionIndex: prevState.currentQuestionIndex + 1,
        numberOfAnsweredQuestions: prevState.numberOfAnsweredQuestions + 1
    }), ()=> {
        if(this.state.nextQuestion === undefined){
            this.endGame();
        }
        else{
            this.displayQuestions(this.state.questions, this.state.currentQuestion, this.state.nextQuestion, this.state.prevQuestion);
        }
    });
};

wrongAnswers = () => {
    navigator.vibrate(1000);
    M.toast({
        html: 'Wrong Answer :(',
        classes: 'toast-invalid',
        displayLength: 1500
    });
    this.setState(prevState => ({
        wrongAnswers: prevState.wrongAnswers + 1,
        currentQuestionIndex: prevState.currentQuestionIndex + 1,
        numberOfAnsweredQuestions: prevState.numberOfAnsweredQuestions+1
    }),()=>{
        if(this.state.nextQuestion === undefined){
            this.endGame();
        }
        else{
            this.displayQuestions(this.state.questions, this.state.currentQuestion, this.state.nextQuestion, this.state.prevQuestion);
        }
    });
}

showOptions = () => {
    const options = Array.from(document.querySelectorAll('.option'));
    options.forEach(option => {
        option.style.visibility = 'visible';
    });
}

handleHints = () =>{
    if(this.state.hints > 0){
        const options = Array.from(document.querySelectorAll('.option'));
        let indexOfAnswer;
        options.forEach((option, index) => {
            if(option.innerHTML.toLowerCase() === this.state.answer.toLowerCase()){
                indexOfAnswer = index;
            }
        });
        while(true){
            const randomNumber = Math.round(Math.random() * 3);
            if(randomNumber !== indexOfAnswer && !this.state.previousRandomNumbers.includes(randomNumber)){
                options.forEach((option, index) => {
                        if(index === randomNumber){
                            option.style.visibility = 'hidden';
                            this.setState((prevState) => ({
                            hints: prevState.hints-1,
                            previousRandomNumbers: prevState.previousRandomNumbers.concat(randomNumber)
                        }));
                    }
                });
                break;
            }
            if(this.state.previousRandomNumbers.length >= 3)
                break;
            
        }
    }

};    

    endGame = () => {
        alert('Quiz has ended');
        const {state} = this;
        const playerStats = {
            score: state.score,
            numberOfQuestions: state.numberOfQuestions,
            numberOfAnsweredQuestions: state.numberOfAnsweredQuestions,
            correctAnswers: state.correctAnswers,
            wrongAnswers: state.wrongAnswers
        };
        console.log(playerStats);
        setTimeout(() =>{
            this.props.history.push('/play/quizSummary', playerStats); // we sended player data to summary
        }, 1000);
    }

    render(){
        
        const { currentQuestion, currentQuestionIndex, numberOfQuestions, hints } = this.state;

        return(
            <Fragment>
                <Helmet><title>Quiz Page</title></Helmet>
                <Fragment>
                    <audio id="correct-sound" src={correctNotification}></audio>
                    <audio id="wrong-sound"  src={wrongNotification}></audio>
                    <audio id="button-sound" src={buttonNotification}></audio>
                </Fragment>
                <div className="questions">
                    <h2>Quiz Mode</h2>
                    <div className="lifeline-container">

                        <p>
                            
                            <span onClick={this.handleHints} className="hintImage">
        <img src = {hint} alt="hint_pic" /><span  className="lifeline">{hints}</span>
                            </span>
                        </p>
                       
                    </div>

                    <div>
                        <p>
        <span className="left"> {currentQuestionIndex + 1} of {numberOfQuestions}</span>
                        </p>
                    </div>

                    <h4>{currentQuestion.question}</h4>

                    <div className="options-container">
                        <p onClick = {this.handleOptionClick} className="option">{currentQuestion.optionA}</p>
                        <p onClick = {this.handleOptionClick} className="option">{currentQuestion.optionB}</p>  
                    </div>
                    <div className="options-container">
                        <p onClick = {this.handleOptionClick} className="option">{currentQuestion.optionC}</p>
                        <p onClick = {this.handleOptionClick} className="option">{currentQuestion.optionD}</p>  
                    </div>

                    <div className="bottom-container">
                        <button id="previous-button" onClick={this.handlePreviousButtonClick }>Previous</button>
                        <button id="next-button" onClick={this.handleNextButtonClick}>Next</button>
                        <button id="quit-button" onClick={this.handleButtonClick}>Quit</button>

                        </div>
                </div>
            </Fragment>
            
        );
    }
}

export default Play;