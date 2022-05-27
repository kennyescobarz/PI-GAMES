import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { createGame, getGenres, getPlatforms } from "../actions";
import styles from './Create.css';
import swal from 'sweetalert2';

export default function Create(){
    const dispatch = useDispatch();
    const genres = useSelector(state => state.genres)
    const platforms = useSelector(state => state.platforms)

    const [input, setInput] = useState({
        name:"",
        description:"",
        realesed:"",
        image:"",
        rating:"",
        platforms:[],
        genres:[],

    
       
    });
    const [botonActivo, setBotonActivo] = useState(false);
    const [errors, setErrors]= useState({});

    useEffect(()=>{
        dispatch(getGenres())
        dispatch(getPlatforms())
    }, [dispatch])


    const handleInputChange = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        });
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
        }));

        if(input.genres&&
            input.platforms.length &&
            input.description &&
            input.released &&
            input.image&&
            input.rating
            ) {
                setBotonActivo(true)
            } else{
                setBotonActivo(false)
            }
    }

    const handleSelectGenre =(e) => {
        setInput({
            ...input,
            genres:[...new Set ([...input.platforms, e.target.value])]
        });

    }
    const handleSelectPlatform = (e) => {
        setInput({
            ...input,
            platforms: [...new Set([...input.platforms, e.target.value])]
        });
    }



    const handleSubmit = (e)=> {
        e.preventDefault();
        if(Object.entries(errors).length===0){
            dispatch(createGame(input))
            swal("success","The videogame was created","succes");
            setInput({
                ...input,
                name: '',
                image: '',
                description: '',
                released: '',
                rating: '',
                platforms: [],
                genres: [],
            });

            setBotonActivo(false)
            document.getElementById("genres").getElementsByTagName('option')[0].selected = 'selected'
            document.getElementById("platforms").getElementsByTagName('option')[0].selected = 'selected'


        } else{
            swal("Ops","something went wrong!","error");

        }
    }

    function handleDeletePlatform(e,deletePlatform){
        e.preventDefault();
        setInput({
            ...input,
            platforms:input.platforms.filter(pl=> pl !== deletePlatform)

        })
    }

    function handleDeleteGenre(e, deleteGenre){
        e.preventDefault();
        setInput({
            ...input,
            platforms: input.genres.filter(genre => genre !== deleteGenre)
        })
    }

    return(
        <div className="divc">
            <div>
                <Link to={'/home'}>
                    <button className="devolverc">
                        Go Back
                    </button>
                </Link>
                <div className="containerprincipal">
                    <h5 className="welcome">
                        New Game!
                    </h5>
                    <img className="imgg" src={input.image}/>
                </div>
            </div>
            <div className="divc2">
                <form onSubmit={handleSubmit}>
                    <div className="formname">
                        <label>
                            Name
                        </label>
                        <input type="text" value={input.name} name="name" placeholder="Videogame name...." onChange={handleInputChange} className='nose'/>
                        {botonActivo && errors.name && (<h6 className="error">{errors.name}</h6>)}

                    </div>
                    <div className="divc2">
                        <label>Description:</label>
                        <textarea cols="100" rows="3" type="text" value={input.description} name="description" placeholder="Video game is about?" onchange={handleInputChange}
                        /> {input.description.split("").length == 0}/120
                        {botonActivo && errors.description && (<h6 className="error">{errors.description}</h6>)}
                    </div>
                    <div className="divc2">
                        <label>Image</label>
                        <input type="text" value={input.image} name="image" placeholder="https://url-of-image.png" onchange={handleInputChange}/>
                        {botonActivo && errors.image && (<h6 className="error">{errors.image}</h6>)}

                    </div>

                    <div className="divc2">
                        <label>Released</label>
                        <input type="text" value={input.released} name="released" placeholder="YEAR-MONTH-DAY" onchange={handleInputChange}/>
                        {botonActivo && errors.released && (<h6 className="error">{errors.released}</h6>)}
                    </div>
                    <div>
                        <label>
                            Genres:
                        </label>
                        <select name="genres" id="genres" onChange={(e) => handleSelectGenre(e)}>
                            <option defaultValue={true}>Choose</option>
                            {genres.map(g=>(
                                <option value={g.name}>{g.name}</option>

                            ))}
                        </select>
                        {input.genres?.map(selec =>
                            <span>
                                {selec} <button className="bx" onClick={(e) => handleDeleteGenre(e.selec)}>X</button>
                            </span>)}
                            {botonActivo && errors.genre && (<h6 className="error">{errors.genres}</h6>)}
                    </div>
                    <div>
                        <label>Platforms:</label>
                        <select name="platforms" id="platforms" onchange={(e)=> handleSelectPlatform(e)}>
                            <option defaultValue={true}>Choose..</option>
                            {platforms.map(p=>(
                                <option value={p}>{p}</option>

                            ))}
                        </select>
                        {input.platforms?.map(selec=>
                            <span>
                        {selec}<button className="bx" onClick={(e)=> handleDeletePlatform(e,selec)}>X</button>
                        
                            </span>
                            )}

                            {botonActivo && errors.platforms && (<h6 className="error">{errors.platforms}</h6>)}

                    </div>

                    <div className="rating">
                    <label>Rating:</label>
                    <input type="range" min={1.00} max={5.00} className="range" value={input.rating.value} step="0.1" name="rating" onchange={handleInputChange}/>
                    {input.rating}
                    {botonActivo && errors.rating && (<h6 className="error">{errors.rating}</h6>)}
                    </div>
                    <div className="btncreategame">
                        <button type="submit" disabled={!botonActivo} className='Botonc'id='btn'> Create Game</button>

                    </div>

                </form>
            </div>
        </div>
    );
    

};


export function validate(input){
    let errors = {};
    if(!input.name){
        errors.name = "name is required!";
    
    } else if(/[$%&]|<>#/.test(input.name)){
        errors.name = 'No special character allowed';
        if (!input.image) {
            errors.image = 'Url is required!';
        } else if (!/^(ftp|http|https):\/\/[^ "]+$/.test(input.image)) {
            errors.image = 'Invalid url';
        }
    
        if (!input.description) {
            errors.description = 'Description is required!'
        } else if (input.description.split(' ').length < 20 || input.description.split(' ').length > 120) {
            errors.description = 'Number of words allowed: 20-120!';
        }
    
        if (!input.released) {
            errors.released = 'Released is required!';
        } else if (!/^\d{4}([\-/.])(0?[1-9]|1[1-2])\1(3[01]|[12][0-9]|0?[1-9])$/.test(input.released)) {
            errors.released = 'Valid date format: YYYY-MM-DD';
        }
    
        if (!input.rating) {
            errors.rating = 'Rating is required!';
        }
        if (!input.genres.length) {
            errors.genres = 'Genres is required!';
        }
        if (!input.platforms.length) {
            errors.platforms = 'Platforms is required!';
        }
        return errors;
    }
};