import React, { Component, Fragment } from "react";
import { Helmet } from "react-helmet";
import {Link} from "react-router-dom";

import completed from '../../assets/img/completed.png';


class QuizSummary extends Component {
    constructor(props){
        super(props);
        this.state = {
            score: 0,
            numberOfQuestions: 0,
            numberOfAnsweredQuestions: 0,
            correctAnswers: 0,
            wrongAnswers: 0
        }
       
    }

componentDidMount(){
    const {state} = this.props.location;
    // put the values
    this.setState({
        score: (state.score / state.numberOfQuestions) * 100,
        numberOfQuestions: state.numberOfQuestions,
        correctAnswers: state.correctAnswers,
        wrongAnswers: state.wrongAnswers
    });
}

    render(){
        const {state} = this.props.location;
        let stats,remark;
        const userScore = this.state.score;

        if(userScore <= 30){
            remark = 'You need more practice';
        }
        else if(userScore > 30 && userScore <= 50){
            remark = 'Better luck next time';
        }
        else if(userScore > 50 && userScore <=80){
            remark = 'You can do better';
        }
        else{
            remark = 'Perfect!';
        }


        if(state !== undefined){
            stats = (
                <Fragment>
            <div>
                <span className="mdi mdi-check-circle-outline success-icon"></span>
            </div>
            <h1>Quiz has ended</h1>
            <div className = "tick-img">
            <img src = {completed} alt="completed" />
            </div>
            
            <div className="container">
            <h4>{remark}</h4>

            <h2>Your Score: {this.state.score.toFixed(0)}&#37;</h2>
            <span className = "stat left">Total number of Questions: </span>
            <span className = "right">{this.state.numberOfQuestions}</span><br />

           
            <span className = "stat left">Total number of Correct Answers: </span>
            <span className = "right">{this.state.correctAnswers}</span><br />
            
            
            <span className = "stat left">Total number of Wrong answers: </span>
            <span className = "right">{this.state.wrongAnswers}</span> <br /> <br /> <br /> 
            </div>
            
            <div className="end-buttons">
                    <br /> <br />
                       <Link className="back-home" to = "/">Back Home</Link>
     
                       <Link className="play-again" to = "/play/quiz">Play again</Link>
  
            </div>

                </Fragment>
                );
        }
        else{
            stats = (
                <section>
                <h3 className="no-stats">No Statistics</h3>
                <ul>
                    <li>
                        <Link to = "/">Back to Home</Link>
                    </li>
                    <li>
                        <Link to = "/play/quiz">Take a Quiz </Link>
                    </li>
                </ul>
                </section>
                );
        }
        return(
<Fragment>
    <Helmet><title>Quiz Summary</title></Helmet>
    {stats}
</Fragment>
        );
    }
}

export default QuizSummary; 