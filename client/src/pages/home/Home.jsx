import { AcUnit } from '@mui/icons-material';
import React, { useEffect, useState } from 'react';
import Features from '../../components/features/Features';
import List from '../../components/list/List';
import Navbar from '../../components/navbar/Navbar';
import './Home.scss';
import axios from 'axios';

const Home = ({ type }) => {
  const [lists, setLists] = useState([]);
  const [genre, setGenre] = useState('');

  useEffect(() => {
    getRandomList();
  }, [type, genre]);

  const getRandomList = async () => {
    try {

      const res = await axios.get(
        `lists${type ? '?typeQuery=' + type : ''}${
          genre ? '&genreQuery=' + genre : ''
        }`,
        {
          headers: {
            token:
              'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyZjI5NTc5NDg3OGNiNzMxNGVjNTc2NyIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY2MDA2NTE2OSwiZXhwIjoxNjYwNDk3MTY5fQ.NE0o90xObBqIIIgZBXk25PjregjhoeFUrt8bo6NowLg',
          },
        }
      );
      console.log(res.data)
      setLists(res.data);
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <div className="home">
      <Navbar />

      <Features type={type} setGenre= {setGenre}></Features>
      {
        lists.map((list,i) => (
          <List key = {i} list = {list} />

        ))
      }
      
    </div>
  );
};

export default Home;
