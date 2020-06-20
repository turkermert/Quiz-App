import React, { Fragment } from 'react';
import {Link } from 'react-router-dom';
import {Helmet} from 'react-helmet';

import quiz_picture from '../../assets/img/quiz_picture.jpeg';



const QuizInstructions = () => (
    <Fragment>
        <Helmet><title>Quiz Instructions - Quiz App</title></Helmet>
        <div className="instructions container">
            <h1>How to play?</h1>
            <p>Ensure you read this guide.</p>
            <ul className="browser-default" id="main-list">
                <li>The game has a duration of 15 minutes and ends as soon as your time elapses.</li>
                <li>Each game consist of 15 questions.</li>
                <li>Every question contains 4 options.</li>
            </ul>
            <div className="image-class">
            <img src = {quiz_picture} alt="Quiz App" />
            </div>
            
            <div>
                <span className="left"><Link to = "/">No take me back</Link></span>
                <span className="right"><Link to = "/play/quiz">Let's Start!</Link></span>
            </div>
        </div>
    </Fragment>
);

export default QuizInstructions;
