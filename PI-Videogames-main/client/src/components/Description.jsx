
import { Link } from "react-router-dom";
import styles from '../components/Description.css'
import { getGame } from "../actions";
import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import ReactHtmlParser from 'react-html-parser'; 


export default function Description (){
    const dispatch = useDispatch();
    const game = useSelector(state => state.game);
    let { id } = useParams();
    console.log("id")
    console.log(id)

    useEffect(() => {
        dispatch(getGame(id));
    }, [dispatch]);

    function htmlDecode(input){
        var e = document.createElement('div');
        e.innerHTML = input;
        return e.childNodes.length === 0 ? "" : e.childNodes[0].nodeValue;
      }

    return(

        <div className="div1">


            <div className="divt">

            <Link to={"/home"}>
                <button className="butreturn">
                    Return to the games
                </button>
            </Link>

            <h2>Game:{game.id}</h2>
            <h2>Name:{game.name}</h2>
            <h2>Description:</h2><div> { ReactHtmlParser (game.description) } </div>
            <h2>Realeased:{game.released}</h2>
            <h2>Rating:{game.rating}</h2>
            <p></p>
            <h2 className={""}>Plataformas:</h2>
                    {game.platforms.map(plat => {
                            return (
                                <h4 className={""}>{plat.name}</h4>
                            )
                        })}

            <img src={game.image} alt="not found" />

            </div>
        </div>
    )

       



    
}