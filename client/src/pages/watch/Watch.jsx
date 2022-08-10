import React from 'react';
import './Watch.scss';
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import { Link, useLocation } from 'react-router-dom';

const Watch = () => {
  const location = useLocation();
  const {state} = location;
  
  return (
    <div className="watch">
      <Link to="/">
        <div className="back">
          <ArrowBackOutlinedIcon />
          Home
        </div>
      </Link>
      <video
        className="video"
        autoPlay
        progress
        controls
        type="video/mp4"
        src={state?.video}
      />
    </div>
  );
};

export default Watch;
