import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import MovieCard from './MovieCard';
import Reload from '../utils/Reload';

const Movie = props => {
  const [movie, setMovie] = useState(null);
  const params= useParams();
  console.log(props)

  const fetchMovie = id => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then(res => setMovie(res.data))
      .catch(err => console.log(err.response));
  };

  const handleDelete = e => {
    e.preventDefault();
    console.log(movie.id)
    axios.delete (`http://localhost:5000/api/movies/${movie.id}`)
    .then(res => {
      console.log(res)
      props.history.push('/')
      Reload();
    })
    .catch(err => console.log('error', err))
  }

  const saveMovie = () => {
    props.addToSavedList(movie);
  };

  useEffect(() => {
    fetchMovie(params.id);
  }, [params.id]);

  if (!movie) {
    return <div>Loading movie information...</div>;
  }

  return (
    <div className='save-wrapper'>
      <MovieCard movie={movie} />
      <button onClick={handleDelete}>Delete Movie</button>
      <div className='save-button' onClick={saveMovie}>
        Save
      </div>
      <Link to={`/update-movie/${movie.id}`}>
        <div>Edit Movie</div>
      </Link>
    </div>
  );
}

export default Movie;