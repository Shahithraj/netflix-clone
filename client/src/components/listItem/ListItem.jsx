import React, { useState,useEffect } from 'react';
import './listItem.scss';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import AddIcon from '@mui/icons-material/Add';
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import ThumbDownAltOutlinedIcon from '@mui/icons-material/ThumbDownAltOutlined';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ListItem = ({ index, item }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [movie,setMovie] = useState()
  const navigate = useNavigate()
  useEffect(() => {
    getMovies();
  }, [item]);

  const getMovies = async () => {
    try {
      const res = await axios.get(`/movies/find/` + item, {
        headers: {
          token:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyZjI5NTc5NDg3OGNiNzMxNGVjNTc2NyIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY2MDA2NTE2OSwiZXhwIjoxNjYwNDk3MTY5fQ.NE0o90xObBqIIIgZBXk25PjregjhoeFUrt8bo6NowLg',
        },
      });
      setMovie(res.data)
      
    } catch (err) {
      console.log(err);
    }
  };

  const goToWatch = () => {
    navigate("/watch",{state:movie})
  }


  return (
    <div
      className="listItem"
      style={{ left: isHovered && index * 225 - 50 + index * 2.5 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick = {goToWatch}
    >
      <img src={movie?.img} alt="" />
      {isHovered && (
        <>
          <video src={movie?.trailer} autoPlay={true} loop />

          <div className="itemInfo">
            <div className="icons">
              <PlayArrowIcon className="icon" />
              <AddIcon className="icon" />
              <ThumbUpAltOutlinedIcon className="icon" />
              <ThumbDownAltOutlinedIcon className="icon" />
            </div>
            <div className="itemInfoTop">
              <span>{movie?.duration}</span>
              <span className="age_limit">{movie?.limit ?? +18}</span>
              <span>{movie.year}</span>
            </div>
            <div className="desc">
             {movie.desc}
            </div>
            <div className="genre">{movie.genre}</div>
          </div>
        </>
      )}
    </div>
  );
};

export default ListItem;
