import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const initialState = {
    id: '',
    title: '',
    director: '',
    metascore: '',
    stars: [] 
}

const UpdateMovie = props =>{
const [characteristic, setcharacteristic] =useState(initialState)
const { id } = useParams();

useEffect(() => {
    console.log(props.movieList)
    const movieToUpdate = props.movieList.find(characteristics => `${characteristics.id}` === id)
    console.log(movieToUpdate)
    if (movieToUpdate) {
        setcharacteristic(movieToUpdate)
    }
}, [props.movieList, id])

const handleChange = event => {
    let value = event.target.value;
    if (event.target.name === 'metascore') {
        value = parseInt(value)
    } else if (event.target.name ==='stars') {
        value = value.split (',')
        console.log(value)
    }
    setcharacteristic({
        ...characteristic,
        [event.target.name]: value
    })
}

//PUT REQUEST
const handleSubmit =e => {
    e.preventDefault();
    axios.put(`http://localhost:5000/api/movies/${id}`, characteristic)
    .then(res => {
        console.log(res.data)
        props.setMovieList([res.data]);
        props.history.push(`/movies/${id}`)
    })
   .catch(err => console.log('error!!', err))
}

return (
    <div>
        <h2>Editer</h2>
        <form onSubmit={handleSubmit}>
            <input
                type='text'
                name='title'
                placeholder='Title'
                onChange={handleChange}
                value={characteristic.title}
            />
            <input
                type='text'
                name='director'
                placeholder='Director'
                onChange={handleChange}
                value={characteristic.director}
            />

            <input
                type='number'
                name='metascore'
                placeholder='Metascore Rating'
                onChange={handleChange}
                value={characteristic.metascore}
            />

            <input
                type='text'
                name='stars'
                placeholder='Stars'
                onChange={handleChange}
                value={characteristic.stars}
            />
            <button>Update</button>
        </form>
    </div>
)}

export default UpdateMovie;