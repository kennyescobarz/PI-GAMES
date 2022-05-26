import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { Link } from "react-router-dom";
import NavBar from "./NavBar";
import styles from './Home.css'
import Paginate from "./Paginate";
import Card from "./Card"
import { getAllGames } from "../actions";

export default function Home(){
    const dispatch = useDispatch();
    const games = useSelector(state => state.games);
    let gamesForFilter = Array.from(games);

    const [keny, setKeny] = useState(true)

    const [currentPage, setCurrentPage] = useState(1);    
    const [gamesPerPage, setGamesPerPage] = useState(10); 
    const lastGame = gamesPerPage * currentPage; 
    const firstGame = lastGame - gamesPerPage; 
    const currentGames = gamesForFilter.length > 0 ? gamesForFilter.slice(firstGame, lastGame) : [];

    useEffect(() => {
        dispatch(getAllGames());
    }, [dispatch]);

    const paginate = (pageNum) => {
        setCurrentPage(pageNum)
    };
    
        useEffect(()=>{
            dispatch(getAllGames())
            dispatch(getGenres())
        },[dispatch])

        const [searching, setSearching] = useState(false)

        function handleSubmit(e){
            e.preventDefault();
            dispatch(getGameName(name))
            setSearching(true)
            setName("")        
        }

        const handleInputChange =(e) => {
            e.preventDefault();
            setName(e.target.value)
        };

        function handleClick(e) {
            e.preventDefault();
            window.location.reload()
            document.getElementById('nameSelect').getElementsByTagName('option')[0].selected='selected'
            document.getElementById('ratingSelect').getElementsByTagName('option')[0].selected='selected'
            document.getElementById('originSelect').getElementsByTagName('option')[0].selected='selected'
            document.getElementById('genre').getElementsByTagName('option')[0].selected='selected'
        }

        function orderAlfaHdl(e){
            e.preventDefault();
            dispatch(orderAlfa(e.target.value));
            setOrder(e.target.value)
        }

        function orderRatingHdl(e){
            e.preventDefault();
            dispatch(orderRating(e.target.value));
            setOrder(e.target.value)
        }

        function filterGenreHdl(e){
            dispatch(filterGenre(e.target.value));
        }

        function filterCreatedHdl(e){
            dispatch(filterCreated(e.target.value));
        }
    return(
        <div className="divhomeprincipal">
            <NavBar/>
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
                                imagen={game.imagen} 
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