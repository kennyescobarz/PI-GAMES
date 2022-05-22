import React from "react";
import { Link } from "react-router-dom";
import styles from './Landing.css'
import linkedIn from '../assets/linkedIn.png';
import gitHub from '../assets/gitHub.png'


export default function LandingPage(){
    return(
        <div className="l1">
            <h1 className="tl">
                WELCOME TO THE VIDEOGAMES WORLD!
            </h1>

            <Link to ='/home'>
                <div className="but">
                    <button className="btn-two">
                        Press to access
                    </button>
                    </div> 
            </Link>

            <div className="imgl">
                <a
                href="https://www.linkedin.com/in/kenny-escobar-3073b0210/"
          target="_blank"
          rel="noreferrer"
        >
          <img src={linkedIn} alt="Not Found" className={"lkdn"} />
        </a>
        <a
          href="https://github.com/kennyescobarz"
          target="_blank"
          rel="noreferrer"
        >
          <img src={gitHub} alt="Not Found" className={"gthb"} />
                </a>
            </div>
        </div>
    )
}