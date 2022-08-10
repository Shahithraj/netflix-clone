import './App.scss';
import Home from './pages/home/Home';
import Register from './pages/register/Register';
import Watch from './pages/watch/Watch';
import Login from './pages/login/Login';
import {useNavigate, Route,Routes} from "react-router-dom"
import { useContext, useEffect } from 'react';
import { AuthContext } from './context/authContext/AuthContext';

function App() {

  const navigate = useNavigate()
const {state:{user}} = useContext(AuthContext)
  useEffect(() => {
    // if(!user){
    //   navigate("/register")
    // }
  },[])

  return (
    <div className="App">
    <Routes>
      <Route exact path="/" element={<Home />}>
      </Route>
      <Route path="/movies" element={<Home type="movies" />}/>
      <Route path="/series" element={<Home type="series" />}/>
      <Route path="/watch" element={<Watch />}/>
      <Route path="/login" element={<Login />}/>
      <Route path="/register" element={<Register />}/>
    </Routes>
   
    </div>
  );
}

export default App;
