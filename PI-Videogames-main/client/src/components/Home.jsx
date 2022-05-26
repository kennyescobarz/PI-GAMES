import React from "react";
import { Link } from "react-router-dom";
import NavBar from "./NavBar";
import styles from './Home.css'
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";
import { getAllGames, getGenres } from "../actions";



export default function Home(){

    const dispatch = useDispatch()
    const allGames = useSelector(state => state.games)
    const genres = useSelector(state => state.genres)


    const [currentPage, setCurrentPage] = useState(1);
    const [perPage,setPerPage] = useState(10)
    const indexLast = currentpage * perPage
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
    })



    

    return(
        <div className="divhomeprincipal">
            <NavBar/>
        </div>
    )

}