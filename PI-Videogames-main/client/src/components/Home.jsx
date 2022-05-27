import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { Link } from "react-router-dom";
import NavBar from "./NavBar";
import styles from './Home.css'
import Paginate from "./Paginate";
import Card from "./Card"
import { getAllGames, getGenres, orderName, orderRating, filterGenre } from "../actions";

export default function Home(){
    const dispatch = useDispatch();
    let games = useSelector(state => state.games);
    let gamescopy = useSelector(state => state.gamescopy);

    let genres = useSelector(state => state.genres);

    gamescopy = gamescopy.slice(0, 250)
    let gamesForFilter = Array.from(gamescopy);

    const [keny, setKeny] = useState(true)

    const [filterGenreC, setfilterGenreC] = useState("all");
    const [orderAlph, setOrderAlph] = useState("default");
    const [orderRat, setOrderRat] = useState("default");
    const [currentPage, setCurrentPage] = useState(1);    
    const [gamesPerPage, setGamesPerPage] = useState(15); 
    const lastGame = gamesPerPage * currentPage; 
    const firstGame = lastGame - gamesPerPage; 
    const currentGames = gamesForFilter.length > 0 ? gamesForFilter.slice(firstGame, lastGame) : [];

    useEffect(() => {
        dispatch(getAllGames());
    }, [dispatch]);

    useEffect(() => {
        dispatch(getGenres());
    }, [dispatch]);

    const paginate = (pageNum) => {
        setCurrentPage(pageNum)
    };
    

    function handleFilterByGenres(e) {
        setfilterGenreC(e.target.value);
        setOrderRat("default")
        setOrderAlph("default")

        dispatch(filterGenre(e.target.value))
        keny ? setKeny(false) : setKeny(true)
    };


    function handleOrderByName(e){
        setOrderAlph(e.target.value);
        setOrderRat("default")
        dispatch(orderName(e.target.value))
        keny ? setKeny(false) : setKeny(true)
    }

    function handleOrderByRating(e){
        setOrderAlph("default");
        setOrderRat(e.target.value)
        dispatch(orderRating(e.target.value))
        keny ? setKeny(false) : setKeny(true)
    }
    
    return(
        <div className="divhomeprincipal">
            <NavBar/>
            <select onChange={e => handleOrderByName(e)} value={orderAlph} className="filtroN">
                    <option value="default" >Alphabetical order</option>
                    <option value="asc">A-Z</option>
                    <option value="desc">Z-A</option>
                </select>
                <select onChange={e => handleOrderByRating(e)} value={orderRat} className="filtroN">
                    <option value="default" >Order by Ratings</option>
                    <option value="desc">Higher</option>
                    <option value="asc">Lower</option>
                </select>
                <select onChange={e => handleFilterByGenres(e)} value={filterGenreC} className="filtroN">
                    <option value="all" >Filter by Genres</option>
                    {genres && genres.map(gen => {
                            return (
                                <option value={gen.id}>{gen.name}</option>
                            )
                        })}
                </select>

            <div className="">

            </div>
            <div>
                <Paginate
                    gamesPerPage={gamesPerPage}
                    allgames={gamesForFilter.length}
                    paginate={paginate}
                    currentPage={currentPage}
                />
                <div className="Cp">
                    {
                        currentGames && currentGames.map(game => {
                            return (
                                <Card 
                                image={game.image} 
                                name={game.name} 
                                id={game.id} 
                                generos={game.genres}/>
                            )
                        })
                    } 
                </div>
            </div>
        </div>
    )

}