import React from 'react';



export default function Paginate ({page, allGames, perPage}) {
    const numPages = []

    for (let i = 1; i <=Math.ceil(allGames/perPage); i++) {
        numPages.push(i)
        }
    return (
        <nav>
                { numPages &&
                numPages.map(num => 
                    (
                    <button className={P.btnPg} onClick={() => page(num)} >{num}</button>
                    )
                )}
        </nav>
    )
}