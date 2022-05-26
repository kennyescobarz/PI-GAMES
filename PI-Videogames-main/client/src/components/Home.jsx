
    import React from "react";
    import { Link } from "react-router-dom";
    import NavBar from "./NavBar";
    import styles from './Home.css'
    import { useDispatch } from "react-redux";
    import { useSelector } from "react-redux";
    import { useState } from "react";
    import { useEffect } from "react";
    import { filterCreated, filterGenre, getAllGames, getGameName, getGenres, orderAlfa, orderRating } from "../actions";
    import Card from './Card'
    
    
    export default function Home(){
    
        const dispatch = useDispatch()
        const allGames = useSelector(state => state.games)
        const genres = useSelector(state => state.genres)
    
    
        const [currentPage, setCurrentPage] = useState(1);
        const [perPage,setPerPage] = useState(10)
        const indexLast = currentPage * perPage
        const indexFirst = indexLast - perPage
        const currentVg = allGames.slice(indexFirst,indexLast)
    
    
        const page = (numPage)=>{
            setCurrentPage(numPage)
        }
    
        const [order, setOrder] = useState('')
        const [ name, setName] = useState('')
    
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
                                generos={game.genrs}/>
                            )
                        })
                    } 
                </div>
            </div>
        </div>
    )

                }