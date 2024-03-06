import React from 'react'
import "./App.css";
import { Route, Routes } from 'react-router-dom'
import Home from './Home';
import Movie from './Movie';
import Error from './Error';

const App = () => {
  return (
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='movie/:id' element={<Movie />}/>
        <Route path='*' element={<Error />}/>
      </Routes>
  )
}

export default App