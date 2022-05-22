import React from "react";
import { Link } from "react-router-dom";
import styles from './NavBar.css'



export default function NavBar(){
    return (

        <div className="divnavbarprincipal">
            <h1 className="h1navbar1">
                V I D E O G A M E S 
            </h1>
            <div>
                <input
                
                placeholder='Name'
                className="inputnavbar"
                ></input>
                <button
                className="buttoninput"
                >
                    Buscar

                </button>
            </div>
            <Link to={"/home/activity"}>
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