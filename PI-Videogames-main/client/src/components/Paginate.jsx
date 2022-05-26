import React from "react";
import styles from '../components/paginate.css'

export default function Paginate({gamesPerPage, allgames, paginate,currentPage}){
    const pageNum = [];
    for (let i = 1; i <= Math.ceil(allgames / gamesPerPage); i++ ){
        pageNum.push(i)
    }

    return (
        <div className="divprincipal">
            <ul className="ul">

                {
                    pageNum && pageNum.map(num =>(
                        <li className="li" key={num}>

                            <button className="bt1" key={num} onClick={()=> paginate(num)}>
                                {num}
                            </button>


                        </li>

                    ))
                }


        
            </ul>
        </div>
    )
}