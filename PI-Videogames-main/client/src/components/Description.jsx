
import { Link } from "react-router-dom";
import styles from '../components/Description.css'
import { getGame } from "../actions";
import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'


export default function Description (){
    const dispatch = useDispatch();
    const game = useSelector(state => state.game);
    let { id } = useParams();

    useEffect(() => {
        dispatch(getGame(id));
    }, [dispatch]);



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
            <h2>Genres:{game.genres}</h2>
            <h2> Description:{game.description}</h2>
            <h2>Realeased:{game.released}</h2>
            <h2>Rating:{game.rating}</h2>

            <img src={game.image_background} alt="not found" />

            </div>





        </div>
    )

       



    
}