import React from "react";
import { Link } from "react-router-dom";
import styles from '../components/Card.css'
export default function Card({ image, name, id, generos }) {
    return (
        <div className={"divpri"}>
            
               
                    <h2 className={""}>{name}</h2>
                    <h3 className={""}>Generos</h3>
                    {generos.map(gen => {
                            return (
                                <h4 className={""}>{gen.name}</h4>
                            )
                        })}
                   
                        {id}
                        <Link to={'/game'+ id} className={""}>
                        See Game details</Link>
                    
               
                <img src={image} alt="not found" width="300px" height="300px" className={"imagenc"} />
           
            
        </div>
    )
}