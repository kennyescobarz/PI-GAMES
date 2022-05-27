import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from './NavBar.css'
import { useDispatch, useSelector } from 'react-redux'
import { getGameName } from "../actions";


export default function NavBar(){
    const dispatch = useDispatch();
    const [keny, setKeny] = useState(true)
    

    function handleSearchName(e){
        if (e.target.value.length > 3){
            dispatch(getGameName(e.target.value))
        }
        else{
            dispatch(getGameName(""))
        }
        keny ? setKeny(false) : setKeny(true)
    }

    return (

        <div className="divnavbarprincipal">
            <h1 className="h1navbar1">
                V I D E O G A M E S 
            </h1>
            <div>
                <input
                
                placeholder='Name'
                className="inputnavbar"
                onChange={(e)=>handleSearchName(e)}
                ></input>
            </div>
            <Link to={"/home/Create"}>
                <button className="crearv">
                    Crear Videojuego 
                </button>

            </Link>
            <Link to={"/"}>
                <button className="devolver">
                    Back to entrance
                </button>
            </Link>

            
        </div>
    )
}