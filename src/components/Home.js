import React, { Fragment } from "react";

import {Helmet} from 'react-helmet';
import { Link } from "react-router-dom";
import CubeOutlineIcon from 'mdi-react/CubeOutlineIcon';


const Home = () => (
    <Fragment>
        <Helmet><title>Quiz App - Home</title></Helmet>
            <div id = "home">
                <section>
                <br /> 
                    <div className = "cube">
                        <CubeOutlineIcon  color="#FFD700" size={80}/>

                    </div>

                    <h1>Quiz App</h1> <br /> 
          
                    <div className="play-button-container">
                        <ul>
                            <li><Link className="play-button" to="/play/instructions">Play</Link></li>
                        </ul>
                    </div>

                </section>


        

            </div>    
    </Fragment>
);


export default Home;