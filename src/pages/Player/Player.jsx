import React, { useEffect, useState } from 'react'
import './Player.css'
import back_arrow_icon from '../../assets/back_arrow_icon.png'
import { useNavigate, useParams } from 'react-router-dom'

const Player = () => {

  const {id} = useParams();
  const navigate = useNavigate();

  const [apiData, setApiData] = useState({
    name:"",
    key:"",
    published_at:"",
    typeof:""
  })

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzM2MxN2I5NWQ1ZDhhOTM2NzM4OTUwNzJmNTRlY2FiZCIsIm5iZiI6MTczMjIwODExMC4xOTMyMjEsInN1YiI6IjY3M2Y2NGU5NjI1YmMzMzhkYzM4Yjg4YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.E6XaZ5YxZCz4GNkJGqJzdZ8JVXzqaNGNLFItFAou2hQ'
    }
  };

  useEffect(()=>{
    fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
    .then(res => res.json())
    .then(res => setApiData(res.results[0]))
    .catch(err => console.error(err));
  },[])
  
  

  return (
    <div className='player'>
      <img src={back_arrow_icon} alt="" onClick={()=>{navigate(-2)}}/>
      <iframe width='90%' height='90%' src={`https://www.youtube.com/embed/${apiData.key}`} title='trailer' frameborder='0' allowFullScreen ></iframe>
      <div className="player_info">
        <p>{apiData.published_at.slice(0,10)}</p>
        <p>{apiData.name}</p>
        <p>{apiData.type}</p>
      </div>
    </div>
  )
}

export default Player
