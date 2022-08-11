import React, { useState, useEffect } from 'react';
import './features.scss';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import axios from 'axios';

const Features = ({ type,setGenre }) => {
  const [content, setContent] = useState({});

  useEffect(() => {
    getRandomMovie();
  }, [type]);

  const getRandomMovie = async () => {
    try {
      const res = await axios.get(`/movies/random`, {
        headers: {
          token:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyZjI5NTc5NDg3OGNiNzMxNGVjNTc2NyIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY2MDA2NTE2OSwiZXhwIjoxNjYwNDk3MTY5fQ.NE0o90xObBqIIIgZBXk25PjregjhoeFUrt8bo6NowLg',
        },
      });
      setContent(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="feature">
      {type && (
        <div className="category">
          <span>{type == 'movies' ? 'Movies' : 'Series'}</span>
          <select name="genre" id="genre" onChange={(e) =>setGenre(e.target.value)}>
            <option value="">Genre</option>
            <option value="adventure">Adventure</option>
            <option value="comedy">Comedy</option>
            <option value="crime">Crime</option>
            <option value="fantasy">Fantasy</option>
            <option value="historical">Historical</option>
            <option value="horror">Horror</option>
            <option value="romance">Romance</option>
            <option value="sci-fi">Sci-fi</option>
            <option value="thriller">Thriller</option>
            <option value="western">Western</option>
            <option value="animation">Animation</option>
            <option value="drama">Drama</option>
            <option value="documentary">Documentary</option>
          </select>
        </div>
      )}
      <img width="100%" src={content?.img} alt="" />
      <div className="info">
        <img src={content?.imgSm} alt="" />
        <span className="desc">{content?.desc}</span>
        <div className="buttons">
          <button className="play">
            <PlayArrowIcon />

            <span>Play</span>
          </button>
          <button className="more">
            <InfoOutlinedIcon />
            <span>Info</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Features;
